import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const STATS = [
  { value: '2,400+', label: 'Products' },
  { value: '98',     label: 'Countries Served' },
  { value: '25+',    label: 'Years Experience' },
  { value: '99.999%', label: 'Max Purity' },
];

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    else navigate('/products');
  };

  const SUGGESTIONS = ['Titanium Sponge', 'Neodymium Oxide', 'Lithium Hydroxide', 'Silicon Carbide', 'GaN Wafer'];

  return (
    <section className="hero">
      {/* Animated background */}
      <div className="hero__bg">
        <div className="hero__bg-grid" />
        <div className="hero__bg-orb hero__bg-orb--1" />
        <div className="hero__bg-orb hero__bg-orb--2" />
        <div className="hero__bg-orb hero__bg-orb--3" />
      </div>

      <div className="container hero__content">
        <div className="hero__text">
          <span className="hero__eyebrow">Trusted by Global Industry Leaders</span>
          <h1 className="hero__title">
            Advanced Materials for<br />
            <span className="hero__title-accent">Critical Applications</span>
          </h1>
          <p className="hero__subtitle">
            From ultra-high purity metals and rare earth elements to advanced ceramics and
            semiconductor materials — NexaChem delivers precision-grade chemical products
            that power the world's most demanding industries.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="hero__search">
            <div className="hero__search-box">
              <span className="hero__search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by product name, CAS number, or formula…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="hero__search-input"
              />
              <button type="submit" className="btn btn--primary hero__search-btn">Search</button>
            </div>
            <div className="hero__suggestions">
              <span className="hero__suggestions-label">Popular:</span>
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  type="button"
                  className="hero__suggestion-pill"
                  onClick={() => { setQuery(s); navigate(`/products?search=${encodeURIComponent(s)}`); }}
                >
                  {s}
                </button>
              ))}
            </div>
          </form>

          <div className="hero__ctas">
            <a href="/products" className="btn btn--amber btn--lg">Browse Catalogue</a>
            <a href="/quote" className="btn btn--outline-white btn--lg">Request a Quote</a>
          </div>
        </div>

        {/* Stats */}
        <div className="hero__stats">
          {STATS.map(s => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="hero__wave">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
