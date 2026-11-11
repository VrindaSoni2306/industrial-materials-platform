import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import Pagination from '../components/ui/Pagination';
import './ProductsCatalogue.css';

const SORT_OPTIONS = [
  { value: 'name-asc',      label: 'Name (A → Z)' },
  { value: 'name-desc',     label: 'Name (Z → A)' },
  { value: 'category',      label: 'Category' },
  { value: 'purity-desc',   label: 'Purity (High first)' },
  { value: 'featured',      label: 'Featured First' },
];

const PER_PAGE = 12;

export default function ProductsCatalogue() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search,           setSearch]           = useState(searchParams.get('search') || '');
  const [localSearch,      setLocalSearch]      = useState(searchParams.get('search') || '');
  const [selectedCats,     setSelectedCats]     = useState(
    searchParams.getAll('category')
  );
  const [selectedGrades,   setSelectedGrades]   = useState([]);
  const [sort,             setSort]             = useState('featured');
  const [page,             setPage]             = useState(1);
  const [sidebarOpen,      setSidebarOpen]      = useState(false);

  /* Sync URL params → local state */
  useEffect(() => {
    const s = searchParams.get('search') || '';
    setSearch(s); setLocalSearch(s);
    setSelectedCats(searchParams.getAll('category'));
    setPage(1);
  }, [searchParams]);

  /* Toggle category filter */
  const toggleCat = (id) => {
    setSelectedCats(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
    setPage(1);
  };

  const toggleGrade = (grade) => {
    setSelectedGrades(prev =>
      prev.includes(grade) ? prev.filter(value => value !== grade) : [...prev, grade]
    );
    setPage(1);
  };

  /* Search submit */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(localSearch);
    setPage(1);
    const params = new URLSearchParams();
    if (localSearch.trim()) params.set('search', localSearch.trim());
    selectedCats.forEach(category => params.append('category', category));
    setSearchParams(params);
  };

  /* Filtered + sorted products */
  const filtered = useMemo(() => {
    let list = [...products];

    // Search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.formula.toLowerCase().includes(q) ||
        p.casNumber.includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCats.length > 0) {
      list = list.filter(p => selectedCats.includes(p.category));
    }

    if (selectedGrades.length > 0) {
      list = list.filter(p => selectedGrades.some(grade =>
        p.grade.toLowerCase().includes(grade.toLowerCase())
      ));
    }

    // Sort
    switch (sort) {
      case 'name-asc':    list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc':   list.sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'category':    list.sort((a, b) => a.category.localeCompare(b.category)); break;
      case 'purity-desc': list.sort((a, b) => (parseFloat(b.purity) || 0) - (parseFloat(a.purity) || 0)); break;
      case 'featured':    list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
      default: break;
    }

    return list;
  }, [search, selectedCats, selectedGrades, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const clearFilters = () => {
    setSearch(''); setLocalSearch(''); setSelectedCats([]); setSelectedGrades([]); setPage(1); setSearchParams({});
  };

  const hasFilters = search || selectedCats.length > 0 || selectedGrades.length > 0;

  return (
    <div>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Products</span>
          </nav>
          <h1>Products Catalogue</h1>
          <p>Browse our complete range of {products.length}+ precision chemical and materials products</p>
        </div>
      </div>

      <div className="container catalogue__layout">
        {/* Mobile filter toggle */}
        <div className="catalogue__mobile-controls">
          <button
            className="btn btn--outline btn--sm"
            onClick={() => setSidebarOpen(o => !o)}
          >
            {sidebarOpen ? '✕ Close Filters' : '⚙ Filters'}
          </button>
          <span className="catalogue__result-count-mobile">
            {filtered.length} products
          </span>
        </div>

        {/* Sidebar */}
        <aside className={`catalogue__sidebar${sidebarOpen ? ' catalogue__sidebar--open' : ''}`}>
          <div className="sidebar__section">
            <h3 className="sidebar__heading">Categories</h3>
            {categories.map(cat => (
              <label key={cat.id} className="sidebar__checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedCats.includes(cat.id)}
                  onChange={() => toggleCat(cat.id)}
                  className="sidebar__checkbox"
                />
                <span className="sidebar__checkbox-text">
                  <span>{cat.icon} {cat.name}</span>
                  <span className="sidebar__count">{cat.count}</span>
                </span>
              </label>
            ))}
          </div>

          <div className="sidebar__section">
            <h3 className="sidebar__heading">Grade / Form</h3>
            {['Aerospace Grade', 'Battery Grade', 'Electronic Grade', 'ACS Reagent Grade', 'Technical Grade'].map(g => (
              <label key={g} className="sidebar__checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedGrades.includes(g)}
                  onChange={() => toggleGrade(g)}
                  className="sidebar__checkbox"
                />
                <span className="sidebar__checkbox-text">{g}</span>
              </label>
            ))}
          </div>

          {hasFilters && (
            <button className="btn btn--ghost btn--sm" onClick={clearFilters} style={{ marginTop: 8 }}>
              ✕ Clear all filters
            </button>
          )}
        </aside>

        {/* Main content */}
        <main className="catalogue__main">
          {/* Top bar */}
          <div className="catalogue__topbar">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="catalogue__search">
              <input
                type="text"
                placeholder="Search products, formula, CAS…"
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                className="catalogue__search-input"
              />
              <button type="submit" className="btn btn--primary btn--sm">Search</button>
            </form>

            <div className="catalogue__topbar-right">
              <span className="catalogue__result-count">
                {filtered.length} product{filtered.length !== 1 ? 's' : ''}
              </span>
              <select
                value={sort}
                onChange={e => { setSort(e.target.value); setPage(1); }}
                className="catalogue__sort"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filter chips */}
          {hasFilters && (
            <div className="catalogue__active-filters">
              {search && (
                <span className="filter-chip">
                  Search: "{search}"
                  <button onClick={() => { setSearch(''); setLocalSearch(''); }}>✕</button>
                </span>
              )}
              {selectedCats.map(c => {
                const cat = categories.find(x => x.id === c);
                return (
                  <span key={c} className="filter-chip">
                    {cat ? cat.name : c}
                    <button onClick={() => toggleCat(c)}>✕</button>
                  </span>
                );
              })}
              {selectedGrades.map(grade => (
                <span key={grade} className="filter-chip">
                  {grade}
                  <button onClick={() => toggleGrade(grade)} aria-label={`Remove ${grade} filter`}>✕</button>
                </span>
              ))}
              <button className="filter-chip filter-chip--clear" onClick={clearFilters}>
                Clear All
              </button>
            </div>
          )}

          {/* Grid */}
          {paginated.length > 0
            ? (
              <div className="catalogue__grid">
                {paginated.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )
            : (
              <div className="catalogue__empty">
                <span className="catalogue__empty-icon">🔍</span>
                <h3>No products found</h3>
                <p>Try adjusting your search or clearing the filters.</p>
                <button className="btn btn--outline" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            )
          }

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={p => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        </main>
      </div>
    </div>
  );
}
