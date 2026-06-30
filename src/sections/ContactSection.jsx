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
  const [formData, setFormData] = useState({ name: '', email: '', scope: '' , botcheck: false });
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData, 
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Mapping 'scope' to 'project_scope' right here for the API
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          project_scope: formData.scope,
          botcheck: formData.botcheck,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        // Reset form fields
        setFormData({ name: '', email: '', scope: '', botcheck: false });
        
        // Optional: Revert button status back to default after 4 seconds
        setTimeout(() => setStatus(''), 4000);
      } else {
        throw new Error(data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send message.');
      
      // Revert button back to normal so they can try again
      setTimeout(() => setStatus(''), 4000);
    }
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
                
                {/* Invisible Honeypot to trap spam bots */}
                <input
                  type="checkbox"
                  name="botcheck"
                  checked={formData.botcheck}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name" // Ensure name attribute matches state key
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
                    name="email" // Ensure name attribute matches state key
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
                    name="scope" // Ensure name attribute matches state key
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
                  {(status === '' || status === 'error') && (
                    <>
                      Send Message <span className="btn-arrow">→</span>
                    </>
                  )}
                </button>

                {/* Display backend error message if code execution breaks */}
                {status === 'error' && (
                  <p className="form-error-msg" style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.875rem' }}>
                    {errorMessage}
                  </p>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
