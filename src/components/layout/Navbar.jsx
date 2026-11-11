import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',     to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About',    to: '/about' },
  { label: 'Contact',  to: '/contact' },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [searchQuery,  setSearchQuery]  = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close menu on route change */
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">⬡</span>
          <span className="navbar__logo-text">
            <span className="navbar__logo-brand">NexaChem</span>
            <span className="navbar__logo-tagline">Solutions</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__links">
          {NAV_LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          {/* Inline search */}
          {searchOpen
            ? (
              <form onSubmit={handleSearch} className="navbar__search-form">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products, CAS, formula…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="navbar__search-input"
                />
                <button type="submit" className="navbar__icon-btn" aria-label="Submit search">🔍</button>
                <button
                  type="button"
                  className="navbar__icon-btn"
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                >✕</button>
              </form>
            )
            : (
              <button
                className="navbar__icon-btn"
                aria-label="Open search"
                onClick={() => setSearchOpen(true)}
              >🔍</button>
            )
          }
          <Link to="/quote" className="btn btn--primary btn--sm">
            Request a Quote
          </Link>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}>
        <nav className="navbar__mobile-links">
          {NAV_LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/quote"
            className="btn btn--primary"
            onClick={() => setMenuOpen(false)}
            style={{ marginTop: 8 }}
          >
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
