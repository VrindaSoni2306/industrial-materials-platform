import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const TEAM = [
  { name: 'Dr. Alexandra Reid', title: 'Chief Executive Officer', bio: 'Ph.D. Materials Science, MIT. 20+ years in advanced materials manufacturing and global supply chain.' },
  { name: 'James Thornton',    title: 'Chief Operating Officer', bio: 'Former VP Operations at a Fortune 500 specialty chemicals company. Expert in ISO quality systems.' },
  { name: 'Dr. Wei Huang',     title: 'VP Research & Development', bio: 'Ph.D. Inorganic Chemistry, Caltech. Leads NexaChem\'s synthesis and characterization laboratories.' },
  { name: 'Sarah O\'Brien',    title: 'VP Global Sales', bio: '15+ years in B2B technical sales across Europe, Asia-Pacific, and the Americas.' },
];

const CERTS = [
  { icon: '🏅', name: 'ISO 9001:2015', desc: 'Quality Management System certified' },
  { icon: '🌿', name: 'REACH Compliant', desc: 'Full EU chemical regulation compliance' },
  { icon: '💊', name: 'GMP Ready', desc: 'Pharmaceutical-grade manufacturing protocols' },
  { icon: '🌱', name: 'RoHS Compliant', desc: 'Restriction of Hazardous Substances certified' },
  { icon: '🛡️', name: 'ITAR Registered', desc: 'U.S. defense material export authorization' },
  { icon: '⚡', name: 'UN ADR Certified', desc: 'International hazardous materials transport' },
];

const MILESTONES = [
  { year: '1998', event: 'NexaChem Solutions founded in Houston, TX with a focus on rare earth distribution.' },
  { year: '2003', event: 'Opened first in-house analytical laboratory; achieved ISO 9001 certification.' },
  { year: '2008', event: 'Expanded into semiconductor materials; established Asia-Pacific sourcing offices.' },
  { year: '2012', event: 'Launched battery materials division as EV market began accelerating.' },
  { year: '2016', event: 'Reached 1,000+ product SKUs; established European distribution hub in Rotterdam.' },
  { year: '2020', event: 'Opened advanced ceramics and polymer composite division.' },
  { year: '2024', event: 'Surpassed 2,400 products and 98 countries served; launched AM-grade metal powder line.' },
];

export default function AboutUs() {
  return (
    <div>
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>About Us</span>
          </nav>
          <h1>About NexaChem Solutions</h1>
          <p>25 years of precision materials expertise powering the world's critical industries.</p>
        </div>
      </div>

      {/* Mission */}
      <section className="about-mission">
        <div className="container about-mission__grid">
          <div>
            <span className="about-eyebrow">Our Mission</span>
            <h2 className="section-title">Materials That Move Industries Forward</h2>
            <p className="about-body">
              NexaChem Solutions exists to ensure that researchers, engineers, and manufacturers
              around the world have reliable access to the highest-purity industrial materials —
              exactly when and where they need them.
            </p>
            <p className="about-body">
              We believe that advanced materials are the invisible foundation of modern
              civilization: enabling cleaner energy, faster electronics, safer aircraft, and
              more effective medicines. Our commitment to quality, traceability, and technical
              expertise ensures that every product we supply meets the most exacting standards.
            </p>
          </div>
          <div className="about-values">
            {[
              { icon: '🎯', title: 'Precision',    desc: 'Ultra-high purity specifications backed by independent analytical verification.' },
              { icon: '🤝', title: 'Partnership',  desc: 'Long-term technical partnerships with clients from R&D through full production.' },
              { icon: '🌍', title: 'Reliability',  desc: 'Strategic inventory and dual-source supply chains ensure consistent availability.' },
              { icon: '💡', title: 'Innovation',   desc: 'Continuously expanding our product range to address emerging technology needs.' },
            ].map(v => (
              <div key={v.title} className="about-value-card">
                <span className="about-value-icon">{v.icon}</span>
                <div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              A quarter century of growth, innovation, and global expansion.
            </p>
          </div>
          <div className="timeline">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className={`timeline-item${i % 2 === 0 ? ' timeline-item--left' : ' timeline-item--right'}`}>
                <div className="timeline-item__year">{m.year}</div>
                <div className="timeline-item__dot" />
                <div className="timeline-item__card">{m.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <h2 className="section-title">Leadership Team</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Experienced scientists and industry veterans driving NexaChem's global mission.
            </p>
          </div>
          <div className="team-grid">
            {TEAM.map(m => (
              <div key={m.name} className="team-card">
                <div className="team-card__avatar">
                  {m.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <h3 className="team-card__name">{m.name}</h3>
                <span className="team-card__title">{m.title}</span>
                <p className="team-card__bio">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="about-certs">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <h2 className="section-title" style={{ color: '#fff' }}>Certifications & Compliance</h2>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,.7)', margin: '0 auto' }}>
              Our quality management systems and regulatory compliance certifications.
            </p>
          </div>
          <div className="certs-grid">
            {CERTS.map(c => (
              <div key={c.name} className="cert-card">
                <span className="cert-card__icon">{c.icon}</span>
                <h4 className="cert-card__name">{c.name}</h4>
                <p className="cert-card__desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container about-cta__inner">
          <div>
            <h2 className="section-title">Ready to source precision materials?</h2>
            <p className="section-subtitle">
              Our technical sales team is ready to help you identify the right product,
              grade, and quantity for your application.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn--primary btn--lg">Browse Products</Link>
            <Link to="/quote"    className="btn btn--outline btn--lg">Request a Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
