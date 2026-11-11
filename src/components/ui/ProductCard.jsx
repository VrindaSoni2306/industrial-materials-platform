import React from 'react';
import { Link } from 'react-router-dom';
import { getProductImage } from '../../data/products';
import './ProductCard.css';

const CATEGORY_COLORS = {
  'metals-alloys':        '#1E5FAD',
  'rare-earth':           '#7C3AED',
  'industrial-chemicals': '#059669',
  'advanced-ceramics':    '#D97706',
  'polymers':             '#DC2626',
  'semiconductor':        '#0891B2',
  'lab-reagents':         '#BE185D',
};

const CATEGORY_LABELS = {
  'metals-alloys':        'Metals & Alloys',
  'rare-earth':           'Rare Earth',
  'industrial-chemicals': 'Industrial Chemicals',
  'advanced-ceramics':    'Advanced Ceramics',
  'polymers':             'Polymers',
  'semiconductor':        'Semiconductor',
  'lab-reagents':         'Lab Reagents',
};

export default function ProductCard({ product }) {
  const { id, name, formula, casNumber, category, purity, appearance, featured, new: isNew } = product;
  const accentColor = CATEGORY_COLORS[category] || '#1E5FAD';

  return (
    <article className="product-card">
      {/* Badges */}
      <div className="product-card__badges">
        {featured && <span className="badge badge--featured">⭐ Featured</span>}
        {isNew    && <span className="badge badge--new">New</span>}
      </div>

      {/* Image / placeholder */}
      <div className="product-card__image" style={{ '--accent': accentColor }}>
        <img className="product-card__image-photo" src={getProductImage(product)} alt="" loading="lazy" />
        <span className="product-card__image-category">{CATEGORY_LABELS[category] || category}</span>
        <div className="product-card__formula-overlay">{formula}</div>
      </div>

      {/* Body */}
      <div className="product-card__body">
        <span
          className="product-card__category"
          style={{ color: accentColor, background: `${accentColor}18` }}
        >
          {CATEGORY_LABELS[category] || category}
        </span>

        <h3 className="product-card__name">{name}</h3>

        <div className="product-card__meta">
          <div className="product-card__meta-row">
            <span className="product-card__meta-label">CAS:</span>
            <span className="product-card__meta-val">{casNumber}</span>
          </div>
          <div className="product-card__meta-row">
            <span className="product-card__meta-label">Purity:</span>
            <span className="product-card__meta-val">{purity}</span>
          </div>
          <div className="product-card__meta-row">
            <span className="product-card__meta-label">Form:</span>
            <span className="product-card__meta-val">{appearance}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="product-card__footer">
        <Link to={`/products/${id}`} className="btn btn--outline btn--sm product-card__details-btn">
          View Details
        </Link>
        <Link to={`/quote?product=${id}`} className="btn btn--primary btn--sm">
          Get Quote
        </Link>
      </div>
    </article>
  );
}
