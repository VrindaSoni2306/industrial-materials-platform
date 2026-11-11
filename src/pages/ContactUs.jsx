import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ContactUs.css';

const CONTACT_DETAILS = [
  { label: 'Sales', value: 'sales@nexachem.com', href: 'mailto:sales@nexachem.com' },
  { label: 'Phone', value: '+1 (713) 555-0192', href: 'tel:+17135550192' },
  { label: 'Office', value: '12 Industrial Parkway, Houston, TX 77002, USA' },
];

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="contact-page">
      <div className="page-banner">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span>Contact Us</span>
          </nav>
          <h1>Contact NexaChem</h1>
          <p>Talk with our team about materials, technical requirements, or supply.</p>
        </div>
      </div>

      <div className="container contact-layout">
        <section className="contact-details" aria-labelledby="contact-details-title">
          <span className="contact-eyebrow">We are here to help</span>
          <h2 id="contact-details-title">Connect with a materials specialist</h2>
          <p>Send your question and our team will follow up within one business day.</p>
          <dl className="contact-details__list">
            {CONTACT_DETAILS.map(({ label, value, href }) => (
              <div className="contact-details__item" key={label}>
                <dt>{label}</dt>
                <dd>{href ? <a href={href}>{value}</a> : value}</dd>
              </div>
            ))}
          </dl>
          <Link className="contact-quote-link" to="/quote">Already know what you need? Request a quote <span aria-hidden="true">→</span></Link>
        </section>

        <section className="contact-form-panel" aria-labelledby="contact-form-title">
          {submitted ? (
            <div className="contact-success" role="status">
              <span className="contact-success__mark" aria-hidden="true">✓</span>
              <h2 id="contact-form-title">Message received</h2>
              <p>Thank you for contacting NexaChem. Our team will be in touch shortly.</p>
              <button className="btn btn--outline" onClick={() => setSubmitted(false)} type="button">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 id="contact-form-title">Send us a message</h2>
              <div className="contact-form__row">
                <label className="contact-field">
                  <span>Name <span aria-hidden="true">*</span></span>
                  <input autoComplete="name" name="name" required />
                </label>
                <label className="contact-field">
                  <span>Work email <span aria-hidden="true">*</span></span>
                  <input autoComplete="email" name="email" type="email" required />
                </label>
              </div>
              <label className="contact-field">
                <span>Company</span>
                <input autoComplete="organization" name="company" />
              </label>
              <label className="contact-field">
                <span>How can we help? <span aria-hidden="true">*</span></span>
                <textarea name="message" rows="5" required />
              </label>
              <button className="btn btn--primary" type="submit">Send enquiry</button>
              <p className="contact-form__note">For product pricing and availability, use our <Link to="/quote">Request a Quote form</Link>.</p>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}