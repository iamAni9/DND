import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import '@/styles/contact.css';

/* ───────── SVG illustrations (clean vector icons) ───────── */
const EnvelopeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-info-svg">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-info-svg">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', scope: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', scope: '' });
    }, 1200);
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      {/* Background Ambient light glow flare */}
      <div className="contact-radial-glow" />

      <div className="contact-container">
        {/* Left Column: Direct Call to Action Info */}
        <div className="contact-info">
          <ScrollReveal delay={50}>
            <h2 id="contact-title" className="contact-info__title font-solid">
              Get In Touch
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="contact-info__description">
              Have an idea for a SaaS platform, custom application, or automation pipeline? Send us a message and let's build something exceptional.
            </p>
          </ScrollReveal>

          <div className="contact-details">
            <ScrollReveal delay={250}>
              <div className="contact-detail-row">
                <div className="contact-detail-icon">
                  <EnvelopeIcon />
                </div>
                <div>
                  <span className="contact-detail-label">Email Us</span>
                  <a href="mailto:hello@devnextdoor.com" className="contact-detail-link font-solid">
                    hello@devnextdoor.com
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={350}>
              <div className="contact-detail-row">
                <div className="contact-detail-icon">
                  <MapPinIcon />
                </div>
                <div>
                  <span className="contact-detail-label">Location</span>
                  <span className="contact-detail-text">India</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Right Column: Premium Form Card */}
        <div className="contact-card-wrapper">
          <ScrollReveal delay={100}>
            <div className="contact-card">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. john@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="scope" className="form-label">
                    Project Scope
                  </label>
                  <textarea
                    id="scope"
                    name="scope"
                    value={formData.scope}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Describe what SaaS platform, AI workflow, or product you want to build..."
                    rows="4"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`contact-submit-btn ${status === 'success' ? 'success' : ''}`}
                >
                  {status === 'sending' && 'Sending...'}
                  {status === 'success' && 'Message Sent! ✓'}
                  {status === '' && (
                    <>
                      Send Message <span className="btn-arrow">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
