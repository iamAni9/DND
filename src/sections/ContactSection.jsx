import React, { useState } from 'react';
import RoughAnnotation from '@/components/RoughAnnotation';
import ScrollReveal from '@/components/ScrollReveal';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [hovered, setHovered] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-container">
        {/* Left Side Info */}
        <div className="contact-info">
          <ScrollReveal delay={50}>
            <h2 id="contact-title" className="contact-info__title font-ink">
              SAY HELLO 👋
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="contact-info__subtitle">
              Have an adventure, a SaaS portal, or a design system in mind? Fill out the form and send a scroll!
            </p>
          </ScrollReveal>

          <div className="contact-info__details">
            <ScrollReveal delay={250}>
              <div className="contact-detail-item">
                <span className="contact-detail-icon">📬</span>
                <div>
                  <strong className="font-marker">Write to us:</strong>
                  <div>hello@devnextdoor.com</div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={350}>
              <div className="contact-detail-item">
                <span className="contact-detail-icon">📍</span>
                <div>
                  <strong className="font-marker">Based in:</strong>
                  <div>India 🇮🇳</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Right Side Form */}
        <ScrollReveal delay={200}>
          <div className="contact-form-box">
            {submitted ? (
              <div className="contact-success font-sketch">
                🎉 Scroll received! We'll reply within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label className="form-label font-marker" htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your noble name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label font-marker" htmlFor="contact-email">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label font-marker" htmlFor="contact-message">Tell us about your project</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="What are we building?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-input form-textarea"
                  />
                </div>

                <div
                  className="form-submit-wrapper"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <RoughAnnotation
                    type="box"
                    color="#ff5a79"
                    strokeWidth={3}
                    padding={8}
                    show={hovered}
                  >
                    <button type="submit" className="form-submit-btn font-sketch">
                      SEND SCROLL ✉️
                    </button>
                  </RoughAnnotation>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
