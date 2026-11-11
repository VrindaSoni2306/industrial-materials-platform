import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProductById, products, categories } from '../data/products';
import './RequestQuote.css';

const STEPS = ['Product Info', 'Company Details', 'Order Details'];

const COUNTRIES = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Japan', 'South Korea',
  'China', 'India', 'Canada', 'Australia', 'Netherlands', 'Switzerland', 'Sweden',
  'Singapore', 'Brazil', 'Mexico', 'South Africa', 'UAE', 'Other',
];

export default function RequestQuote() {
  const [searchParams] = useSearchParams();
  const prefilledId = searchParams.get('product');
  const prefilledProduct = prefilledId ? getProductById(prefilledId) : null;

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    // Step 1: Product
    productId:   prefilledId || '',
    productName: prefilledProduct?.name || '',
    casNumber:   prefilledProduct?.casNumber || '',
    // Step 2: Company
    firstName:   '',
    lastName:    '',
    email:       '',
    phone:       '',
    company:     '',
    country:     '',
    jobTitle:    '',
    // Step 3: Order
    quantity:    '',
    unit:        'kg',
    purity:      prefilledProduct?.purity || '',
    grade:       prefilledProduct?.grade  || '',
    targetDate:  '',
    application: '',
    notes:       '',
  });

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  /* Sync when product changes */
  useEffect(() => {
    if (form.productId) {
      const p = getProductById(form.productId);
      if (p) set('productName', p.name);
      if (p) set('casNumber', p.casNumber);
    }
  }, [form.productId]);

  /* Validation per step */
  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.productId && !form.productName) e.productName = 'Please specify a product.';
    }
    if (step === 1) {
      if (!form.firstName)   e.firstName  = 'Required.';
      if (!form.lastName)    e.lastName   = 'Required.';
      if (!form.email)       e.email      = 'Required.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
      if (!form.company)     e.company    = 'Required.';
      if (!form.country)     e.country    = 'Required.';
    }
    if (step === 2) {
      if (!form.quantity) e.quantity = 'Required.';
      if (!form.application) e.application = 'Please describe the intended application.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => { if (validateStep()) setStep(s => s + 1); };
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) setSubmitted(true);
  };

  return (
    <div>
      <div className="page-banner">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Request a Quote</span>
          </nav>
          <h1>Request a Quote</h1>
          <p>Complete the form below — our team will respond within one business day.</p>
        </div>
      </div>

      <div className="container rq-wrapper">
        {submitted
          ? (
            <div className="success-box">
              <div className="success-icon">✓</div>
              <h3>Quote Request Received!</h3>
              <p>
                Thank you, <strong>{form.firstName}</strong>! Your enquiry for{' '}
                <strong>{form.productName || 'the requested product'}</strong> has been submitted.
                Our technical sales team will contact you at <strong>{form.email}</strong> within
                one business day with pricing and availability.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/products" className="btn btn--primary">Browse More Products</Link>
                <button className="btn btn--outline" onClick={() => { setSubmitted(false); setStep(0); }}>
                  Submit Another Request
                </button>
              </div>
            </div>
          )
          : (
            <div className="rq-container">
              {/* Step indicators */}
              <div className="rq-steps">
                {STEPS.map((s, i) => (
                  <React.Fragment key={s}>
                    <div className={`rq-step${i === step ? ' rq-step--active' : ''}${i < step ? ' rq-step--done' : ''}`}>
                      <div className="rq-step__circle">{i < step ? '✓' : i + 1}</div>
                      <span className="rq-step__label">{s}</span>
                    </div>
                    {i < STEPS.length - 1 && <div className={`rq-step-line${i < step ? ' rq-step-line--done' : ''}`} />}
                  </React.Fragment>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="rq-form">

                {/* Step 0: Product Info */}
                {step === 0 && (
                  <div className="rq-form-section">
                    <h2 className="rq-form-title">Product Information</h2>
                    <div className="form-group">
                      <label htmlFor="quote-product">Select from Catalogue</label>
                      <select
                        id="quote-product"
                        value={form.productId}
                        onChange={e => set('productId', e.target.value)}
                        className="rq-select"
                      >
                        <option value="">— Select a product —</option>
                        {categories.map(cat => (
                          <optgroup key={cat.id} label={cat.name}>
                            {products
                              .filter(p => p.category === cat.id)
                              .map(p => (
                                <option key={p.id} value={p.id}>{p.name} ({p.casNumber})</option>
                              ))
                            }
                          </optgroup>
                        ))}
                      </select>
                    </div>

                    <div className="rq-or-divider"><span>or enter manually</span></div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="quote-product-name">Product Name <span className="req-mark">*</span></label>
                        <input
                          id="quote-product-name"
                          type="text"
                          value={form.productName}
                          onChange={e => set('productName', e.target.value)}
                          placeholder="e.g. Neodymium Oxide"
                          className={errors.productName ? 'error' : ''}
                        />
                        {errors.productName && <span className="form-group__error">{errors.productName}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="quote-cas">CAS Number</label>
                        <input
                          id="quote-cas"
                          type="text"
                          value={form.casNumber}
                          onChange={e => set('casNumber', e.target.value)}
                          placeholder="e.g. 1313-97-9"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1: Company Details */}
                {step === 1 && (
                  <div className="rq-form-section">
                    <h2 className="rq-form-title">Company Details</h2>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="quote-first-name">First Name <span className="req-mark">*</span></label>
                        <input id="quote-first-name" type="text" value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="John" className={errors.firstName ? 'error' : ''} />
                        {errors.firstName && <span className="form-group__error">{errors.firstName}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="quote-last-name">Last Name <span className="req-mark">*</span></label>
                        <input id="quote-last-name" type="text" value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Smith" className={errors.lastName ? 'error' : ''} />
                        {errors.lastName && <span className="form-group__error">{errors.lastName}</span>}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="quote-email">Work Email <span className="req-mark">*</span></label>
                        <input id="quote-email" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="john@company.com" className={errors.email ? 'error' : ''} />
                        {errors.email && <span className="form-group__error">{errors.email}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="quote-phone">Phone</label>
                        <input id="quote-phone" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="quote-company">Company / Organization <span className="req-mark">*</span></label>
                        <input id="quote-company" type="text" value={form.company} onChange={e => set('company', e.target.value)} placeholder="Acme Industries LLC" className={errors.company ? 'error' : ''} />
                        {errors.company && <span className="form-group__error">{errors.company}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="quote-job-title">Job Title</label>
                        <input id="quote-job-title" type="text" value={form.jobTitle} onChange={e => set('jobTitle', e.target.value)} placeholder="Procurement Manager" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="quote-country">Country <span className="req-mark">*</span></label>
                      <select id="quote-country" value={form.country} onChange={e => set('country', e.target.value)} className={`rq-select${errors.country ? ' error' : ''}`}>
                        <option value="">— Select Country —</option>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.country && <span className="form-group__error">{errors.country}</span>}
                    </div>
                  </div>
                )}

                {/* Step 2: Order Details */}
                {step === 2 && (
                  <div className="rq-form-section">
                    <h2 className="rq-form-title">Order Details</h2>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="quote-quantity">Quantity Required <span className="req-mark">*</span></label>
                        <input id="quote-quantity" type="number" min="0" step="any" value={form.quantity} onChange={e => set('quantity', e.target.value)} placeholder="e.g. 25" className={errors.quantity ? 'error' : ''} />
                        {errors.quantity && <span className="form-group__error">{errors.quantity}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="quote-unit">Unit</label>
                        <select id="quote-unit" value={form.unit} onChange={e => set('unit', e.target.value)} className="rq-select">
                          {['g', 'kg', 'MT', 'oz', 'lb', 'L', 'mL', 'pcs'].map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="quote-purity">Required Purity / Grade</label>
                        <input id="quote-purity" type="text" value={form.purity} onChange={e => set('purity', e.target.value)} placeholder="e.g. 99.99%, ACS Grade" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="quote-delivery-date">Target Delivery Date</label>
                        <input id="quote-delivery-date" type="date" value={form.targetDate} onChange={e => set('targetDate', e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="quote-application">Intended Application <span className="req-mark">*</span></label>
                      <input id="quote-application" type="text" value={form.application} onChange={e => set('application', e.target.value)} placeholder="e.g. Battery cathode precursor synthesis" className={errors.application ? 'error' : ''} />
                      {errors.application && <span className="form-group__error">{errors.application}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="quote-notes">Additional Notes / Specifications</label>
                      <textarea id="quote-notes" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Any special packaging, documentation, or technical requirements…" rows={4} />
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="rq-nav">
                  {step > 0 && (
                    <button type="button" className="btn btn--outline" onClick={prevStep}>← Back</button>
                  )}
                  {step < STEPS.length - 1
                    ? <button type="button" className="btn btn--primary" onClick={nextStep}>Next Step →</button>
                    : <button type="submit" className="btn btn--primary">Submit Quote Request ✓</button>
                  }
                </div>
              </form>
            </div>
          )
        }

        {/* Info sidebar */}
        <div className="rq-info">
          <div className="rq-info-card">
            <h3>🕐 Fast Response</h3>
            <p>Receive detailed pricing and availability within one business day.</p>
          </div>
          <div className="rq-info-card">
            <h3>🔬 Technical Support</h3>
            <p>Our materials scientists can help specify the right grade and form for your application.</p>
          </div>
          <div className="rq-info-card">
            <h3>📦 Flexible Quantities</h3>
            <p>From gram-scale R&D samples to multi-tonne production supply agreements.</p>
          </div>
          <div className="rq-info-card">
            <h3>✅ Quality Guaranteed</h3>
            <p>Every shipment comes with a Certificate of Analysis and full traceability.</p>
          </div>
          <div className="rq-contact-block">
            <strong>Need help? Call us directly:</strong>
            <a href="tel:+17135550192">+1 (713) 555-0192</a>
            <a href="mailto:sales@nexachem.com">sales@nexachem.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
