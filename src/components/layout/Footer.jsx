import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/products';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subDone, setSubDone] = useState(false);

  const handleSub = (e) => {
    e.preventDefault();
    if (email) { setSubDone(true); setEmail(''); }
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">

          {/* Brand column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-icon">⬡</span>
              <span className="footer__logo-name">NexaChem Solutions</span>
            </Link>
            <p className="footer__tagline">
              Precision Materials for Advanced Industries. Supplying high-purity chemicals,
              metals, and specialty materials to global industry leaders since 1998.
            </p>
            <div className="footer__certifications">
              <span className="cert-badge">ISO 9001:2015</span>
              <span className="cert-badge">REACH</span>
              <span className="cert-badge">GMP</span>
              <span className="cert-badge">RoHS</span>
            </div>
          </div>

          {/* Product categories */}
          <div className="footer__col">
            <h4 className="footer__heading">Product Categories</h4>
            <ul className="footer__list">
              {categories.map(c => (
                <li key={c.id}>
                  <Link to={`/products?category=${c.id}`} className="footer__link">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="footer__col">
            <h4 className="footer__heading">Company</h4>
            <ul className="footer__list">
              {[
                ['About Us', '/about'],
                ['Industries Served', '/about#industries'],
                ['Quality & Certifications', '/about#quality'],
                ['Research & Development', '/about#rd'],
                ['Careers', '/about#careers'],
                ['News & Media', '/about#news'],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="footer__link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="footer__col footer__col--contact">
            <h4 className="footer__heading">Get in Touch</h4>
            <div className="footer__contact-items">
              <div className="footer__contact-item">
                <span className="footer__contact-icon">📍</span>
                <span>12 Industrial Parkway, Houston, TX 77002, USA</span>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">📞</span>
                <a href="tel:+17135550192" className="footer__link">+1 (713) 555-0192</a>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">✉️</span>
                <a href="mailto:sales@nexachem.com" className="footer__link">sales@nexachem.com</a>
              </div>
            </div>

            <h4 className="footer__heading" style={{ marginTop: 20 }}>Newsletter</h4>
            {subDone
              ? <p className="footer__sub-thanks">✅ Thank you for subscribing!</p>
              : (
                <form onSubmit={handleSub} className="footer__newsletter">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="footer__newsletter-input"
                  />
                  <button type="submit" className="footer__newsletter-btn">Subscribe</button>
                </form>
              )
            }
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {new Date().getFullYear()} NexaChem Solutions, Inc. All rights reserved.
          </p>
          <div className="footer__legal">
            <a href="/privacy" className="footer__link">Privacy Policy</a>
            <a href="/terms" className="footer__link">Terms of Use</a>
            <a href="/safety" className="footer__link">Safety Data Sheets</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
