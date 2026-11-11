import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/products';
import './CategoryGrid.css';

const CATEGORY_COLORS = {
  'metals-alloys':        { bg: '#EFF6FF', border: '#BFDBFE', icon: '#1D4ED8', text: '#1E40AF' },
  'rare-earth':           { bg: '#F5F3FF', border: '#DDD6FE', icon: '#7C3AED', text: '#6D28D9' },
  'industrial-chemicals': { bg: '#ECFDF5', border: '#A7F3D0', icon: '#059669', text: '#047857' },
  'advanced-ceramics':    { bg: '#FFFBEB', border: '#FDE68A', icon: '#D97706', text: '#B45309' },
  'polymers':             { bg: '#FFF1F2', border: '#FECDD3', icon: '#DC2626', text: '#B91C1C' },
  'semiconductor':        { bg: '#ECFEFF', border: '#A5F3FC', icon: '#0891B2', text: '#0E7490' },
  'lab-reagents':         { bg: '#FFF0F7', border: '#FBCFE8', icon: '#BE185D', text: '#9D174D' },
};

export default function CategoryGrid() {
  return (
    <section className="categories">
      <div className="container">
        <div className="text-center categories__header">
          <h2 className="section-title">Product Categories</h2>
          <p className="section-subtitle">
            Explore our comprehensive portfolio of high-purity industrial materials,
            chemicals, and specialty products spanning seven major categories.
          </p>
        </div>

        <div className="categories__grid">
          {categories.map(cat => {
            const colors = CATEGORY_COLORS[cat.id] || CATEGORY_COLORS['metals-alloys'];
            return (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="category-card"
                style={{
                  '--cat-bg':     colors.bg,
                  '--cat-border': colors.border,
                  '--cat-icon':   colors.icon,
                  '--cat-text':   colors.text,
                }}
              >
                <div className="category-card__icon-wrap">
                  <span className="category-card__icon">{cat.icon}</span>
                </div>
                <div className="category-card__body">
                  <h3 className="category-card__name">{cat.name}</h3>
                  <p className="category-card__desc">{cat.description}</p>
                  <span className="category-card__count">{cat.count} products →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
