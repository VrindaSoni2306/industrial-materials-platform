import React from 'react';
import { industries } from '../../data/products';
import './IndustriesSection.css';

export default function IndustriesSection() {
  return (
    <section className="industries">
      <div className="industries__bg" />
      <div className="container">
        <div className="text-center industries__header">
          <h2 className="section-title" style={{ color: '#fff' }}>Industries We Serve</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,.7)', margin: '0 auto' }}>
            NexaChem supplies precision materials across the full spectrum of advanced manufacturing and research sectors.
          </p>
        </div>

        <div className="industries__grid">
          {industries.map(ind => (
            <div key={ind.id} className="industry-card">
              <div className="industry-card__icon">{ind.icon}</div>
              <h3 className="industry-card__name">{ind.name}</h3>
              <p className="industry-card__desc">{ind.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
