import React from 'react';
import { Link } from 'react-router-dom';
import './CompanyIntro.css';

const CAPABILITIES = [
  { icon: '🔬', title: 'R&D Laboratory', desc: 'State-of-the-art synthesis and characterization capabilities including ICP-MS, XRD, SEM-EDS, and BET surface area analysis.' },
  { icon: '✅', title: 'Quality Control', desc: 'Rigorous multi-stage QC with Certificate of Analysis (CoA) for every batch. ISO 9001:2015 certified quality management system.' },
  { icon: '🌍', title: 'Global Supply Chain', desc: 'Direct sourcing from verified mines and chemical plants worldwide, with strategic inventory for rapid order fulfillment.' },
  { icon: '📦', title: 'Custom Packaging', desc: 'From gram-scale laboratory quantities to multi-tonne industrial shipments, with appropriate packaging for air-sensitive materials.' },
];

export default function CompanyIntro() {
  return (
    <section className="company-intro">
      <div className="container">
        {/* Top: text + image split */}
        <div className="company-intro__split">
          <div className="company-intro__text">
            <span className="company-intro__eyebrow">About NexaChem Solutions</span>
            <h2 className="section-title">25 Years of Materials Excellence</h2>
            <p className="company-intro__body">
              Founded in 1998, NexaChem Solutions has grown from a regional chemical
              distributor into a global supplier of advanced industrial materials trusted
              by Fortune 500 manufacturers, national laboratories, and research institutions.
            </p>
            <p className="company-intro__body">
              Our extensive catalogue of over 2,400 products — spanning rare earth elements,
              superalloy powders, semiconductor-grade precursors, and specialty reagents —
              is backed by in-house analytical capabilities and a commitment to unmatched
              purity specifications.
            </p>
            <div className="company-intro__ctas">
              <Link to="/about" className="btn btn--navy">Learn About Us</Link>
              <Link to="/contact" className="btn btn--outline">Contact Sales</Link>
            </div>
          </div>

          <div className="company-intro__visual">
            <img
              className="company-intro__photo"
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85"
              alt="Materials science team working in a modern industrial laboratory"
              loading="lazy"
            />
            <div className="company-intro__visual-card">
              <div className="visual-stat-grid">
                {[
                  ['2,400+', 'Products in Catalogue'],
                  ['98',     'Countries Shipped To'],
                  ['500+',   'Industry Partners'],
                  ['25+',    'Years of Experience'],
                ].map(([v, l]) => (
                  <div key={l} className="visual-stat">
                    <span className="visual-stat__value">{v}</span>
                    <span className="visual-stat__label">{l}</span>
                  </div>
                ))}
              </div>
              <div className="visual-cert-row">
                {['ISO 9001', 'REACH Compliant', 'GMP Ready', 'RoHS'].map(c => (
                  <span key={c} className="visual-cert">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <div className="company-intro__capabilities">
          {CAPABILITIES.map(cap => (
            <div key={cap.title} className="capability-card">
              <div className="capability-card__icon">{cap.icon}</div>
              <h3 className="capability-card__title">{cap.title}</h3>
              <p className="capability-card__desc">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
