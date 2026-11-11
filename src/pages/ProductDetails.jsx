import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getProductImage, getRelatedProducts } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import './ProductDetails.css';

const CATEGORY_LABEL = {
  'metals-alloys':        'Metals & Alloys',
  'rare-earth':           'Rare Earth Elements',
  'industrial-chemicals': 'Industrial Chemicals',
  'advanced-ceramics':    'Advanced Ceramics',
  'polymers':             'Polymers & Composites',
  'semiconductor':        'Semiconductor Materials',
  'lab-reagents':         'Laboratory Reagents',
};

const TABS = ['Overview', 'Specifications', 'Applications', 'Ordering'];

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);
  const [activeTab, setActiveTab] = useState('Overview');

  if (!product) {
    return (
      <div className="pd-not-found">
        <div className="container">
          <span style={{ fontSize: '3rem' }}>⚗️</span>
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="btn btn--primary">Browse All Products</Link>
        </div>
      </div>
    );
  }

  const related = getRelatedProducts(product, 4);
  const catLabel = CATEGORY_LABEL[product.category] || product.category;

  return (
    <div>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/products">Products</Link>
            <span>›</span>
            <Link to={`/products?category=${product.category}`}>{catLabel}</Link>
            <span>›</span>
            <span>{product.name}</span>
          </nav>
          <h1>{product.name}</h1>
          <p>{product.formula} · CAS {product.casNumber}</p>
        </div>
      </div>

      <div className="container pd-layout">
        {/* Left: image + quick info */}
        <aside className="pd-sidebar">
          {/* Product visual */}
          <div className="pd-image">
            <img className="pd-image__photo" src={getProductImage(product)} alt={`${product.name}, representative material`} />
            <div className="pd-image__formula">{product.formula}</div>
          </div>

          {/* Quick info card */}
          <div className="pd-quick-info">
            <div className="pd-quick-info__row">
              <span className="pd-quick-info__label">CAS Number</span>
              <span className="pd-quick-info__val pd-quick-info__val--mono">{product.casNumber}</span>
            </div>
            <div className="pd-quick-info__row">
              <span className="pd-quick-info__label">Chemical Formula</span>
              <span className="pd-quick-info__val pd-quick-info__val--mono">{product.formula}</span>
            </div>
            <div className="pd-quick-info__row">
              <span className="pd-quick-info__label">Composition</span>
              <span className="pd-quick-info__val">{product.composition || product.formula}</span>
            </div>
            <div className="pd-quick-info__row">
              <span className="pd-quick-info__label">Purity</span>
              <span className="pd-quick-info__val">{product.purity}</span>
            </div>
            <div className="pd-quick-info__row">
              <span className="pd-quick-info__label">Grade</span>
              <span className="pd-quick-info__val">{product.grade}</span>
            </div>
            <div className="pd-quick-info__row">
              <span className="pd-quick-info__label">Mol. Weight</span>
              <span className="pd-quick-info__val">{product.molecularWeight}</span>
            </div>
            <div className="pd-quick-info__row">
              <span className="pd-quick-info__label">Appearance</span>
              <span className="pd-quick-info__val">{product.appearance}</span>
            </div>
          </div>

          {/* CTA buttons */}
          <Link
            to={`/quote?product=${product.id}`}
            className="btn btn--primary btn--full"
            style={{ marginBottom: 10 }}
          >
            📋 Request a Quote
          </Link>
          <Link to="/contact" className="btn btn--outline btn--full">
            💬 Contact Technical Sales
          </Link>

          <p className="pd-sidebar__note">
            Pricing and availability provided within 24 hours for qualified enquiries.
            Minimum order quantities apply.
          </p>
        </aside>

        {/* Right: tabbed detail */}
        <main className="pd-main">
          {/* Tabs */}
          <div className="pd-tabs">
            {TABS.map(tab => (
              <button
                key={tab}
                className={`pd-tab${activeTab === tab ? ' pd-tab--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="pd-tab-content">
            {activeTab === 'Overview' && (
              <div>
                <h2 className="pd-section-title">Product Description</h2>
                <p className="pd-description">{product.description}</p>

                <h3 className="pd-section-subtitle">Available Forms</h3>
                <div className="pd-forms">
                  {product.availableForms.map(f => (
                    <span key={f} className="pd-form-chip">{f}</span>
                  ))}
                </div>

                <h3 className="pd-section-subtitle">Tags</h3>
                <div className="pd-forms">
                  {product.tags.map(t => (
                    <span key={t} className="pd-tag-chip">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Specifications' && (
              <div>
                <h2 className="pd-section-title">Technical Specifications</h2>
                <table className="pd-specs-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Product Name</td><td>{product.name}</td></tr>
                    <tr><td>Chemical Formula</td><td>{product.formula}</td></tr>
                    <tr><td>Composition</td><td>{product.composition || product.formula}</td></tr>
                    <tr><td>CAS Number</td><td>{product.casNumber}</td></tr>
                    <tr><td>Purity</td><td>{product.purity}</td></tr>
                    <tr><td>Grade</td><td>{product.grade}</td></tr>
                    <tr><td>Molecular Weight</td><td>{product.molecularWeight}</td></tr>
                    <tr><td>Appearance</td><td>{product.appearance}</td></tr>
                    {Object.entries(product.specifications).map(([k, v]) => (
                      <tr key={k}><td>{k}</td><td>{v}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'Applications' && (
              <div>
                <h2 className="pd-section-title">Applications</h2>
                <ul className="pd-applications">
                  {product.applications.map(app => (
                    <li key={app} className="pd-application-item">
                      <span className="pd-application-icon">▸</span>
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'Ordering' && (
              <div>
                <h2 className="pd-section-title">Ordering Information</h2>
                <p className="pd-description">
                  NexaChem Solutions provides flexible ordering options to meet your project
                  requirements — from small research quantities to multi-tonne industrial
                  supply agreements. Submit a Request for Quote (RFQ) and our technical
                  sales team will respond within one business day with pricing and availability.
                </p>
                <div className="pd-ordering-grid">
                  {[
                    ['Laboratory Scale', '< 1 kg', 'Research / analytical quantities with full CoA'],
                    ['Pilot Scale', '1 – 50 kg', 'Process development and pilot production runs'],
                    ['Industrial Scale', '50 kg – MT', 'Full production supply with long-term contracts'],
                  ].map(([tier, qty, desc]) => (
                    <div key={tier} className="pd-order-tier">
                      <h4>{tier}</h4>
                      <span className="pd-order-tier__qty">{qty}</span>
                      <p>{desc}</p>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/quote?product=${product.id}`}
                  className="btn btn--primary btn--lg"
                  style={{ marginTop: 24 }}
                >
                  Request a Quote for {product.name}
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="pd-related">
          <div className="container">
            <h2 className="section-title" style={{ marginBottom: 24 }}>Related Products</h2>
            <div className="pd-related__grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
