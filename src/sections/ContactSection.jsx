import React, { useState } from 'react';
import RoughAnnotation from '@/components/RoughAnnotation';
import ScrollReveal from '@/components/ScrollReveal';
import '@/styles/contact.css';

/* ───────── Gold Corner Ornament SVG ───────── */
const ContactCorner = ({ style }) => (
  <svg 
    style={{ position: 'absolute', width: '22px', height: '22px', zIndex: 6, pointerEvents: 'none', ...style }} 
    viewBox="0 0 22 22"
  >
    <path d="M 0,0 L 22,0 L 0,22 Z" fill="#cc9e43" stroke="#2d2314" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M 4,4 L 14,4 L 4,14 Z" fill="none" stroke="#2d2314" strokeWidth="0.8" opacity="0.6" />
    <circle cx="5" cy="5" r="1.2" fill="#2d2314" />
  </svg>
);

/* ───────── Animated Inkwell & Quill SVG ───────── */
const QuillAndInk = ({ isWriting }) => (
  <div className={`quill-ink-container ${isWriting ? 'is-writing' : ''}`}>
    <svg viewBox="0 0 100 100" className="quill-ink-svg">
      {/* Inkwell stand / saucer */}
      <path d="M25,82 Q50,78 75,82 L72,87 L28,87 Z" fill="#1f180e" stroke="#2d2314" strokeWidth="1.2" />
      {/* Glass Inkwell body */}
      <path d="M32,58 L68,58 L72,82 L28,82 Z" fill="#3d301f" stroke="#2d2314" strokeWidth="1.5" />
      <rect x="42" y="49" width="16" height="9" fill="#524029" stroke="#2d2314" strokeWidth="1.5" />
      <ellipse cx="50" cy="49" rx="8" ry="2.5" fill="#20170a" stroke="#2d2314" strokeWidth="1" />
      {/* Level of dark magical ink */}
      <path d="M30,68 C35,66 65,66 70,68 L71.5,80 L28.5,80 Z" fill="#120c06" opacity="0.85" />
      
      {/* Feather Quill Pen */}
      <g className="quill-feather-group">
        {/* Shaft/tip dipping in jar */}
        <path d="M50,56 Q44,38 64,18" fill="none" stroke="#ebd69e" strokeWidth="2.2" strokeLinecap="round" />
        {/* Feathery vane */}
        <path 
          d="M64,18 C74,8 88,3 84,18 C79,33 55,48 50,56 C52,48 58,30 64,18 Z" 
          fill="url(#quill-feather-grad)" 
          stroke="#2d2314" 
          strokeWidth="1" 
        />
        {/* Fine feather lines */}
        <path d="M58,28 Q68,22 73,20" stroke="#2d2314" strokeWidth="0.8" fill="none" />
        <path d="M54,36 Q63,30 68,28" stroke="#2d2314" strokeWidth="0.8" fill="none" />
        <path d="M52,44 Q60,38 65,36" stroke="#2d2314" strokeWidth="0.8" fill="none" />
        {/* Sparkling tip aura */}
        <circle cx="50" cy="56" r="3" fill="#ffae00" opacity="0.4" filter="blur(1px)" />
      </g>
      
      <defs>
        <linearGradient id="quill-feather-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#ebd69e" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#cc9e43" />
        </linearGradient>
      </defs>
    </svg>
    <div className="quill-ink-label font-thin-marker">Drafting scroll...</div>
  </div>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [hovered, setHovered] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const isWriting = focusedInput !== null;

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
              Have an adventure, a SaaS platform, or a design system in mind? Fill out the form and send a scroll!
            </p>
          </ScrollReveal>

          <div className="contact-info__details">
            <ScrollReveal delay={250}>
              <div className="contact-detail-item">
                <span className="contact-detail-icon">📬</span>
                <div>
                  <strong className="font-marker">Write to us:</strong>
                  <div className="contact-detail-email">hello@devnextdoor.com</div>
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

          {/* Interactive Quill & Inkwell illustration */}
          <ScrollReveal delay={450}>
            <QuillAndInk isWriting={isWriting} />
          </ScrollReveal>
        </div>

        {/* Right Side Form (styled as a vintage ledger book page) */}
        <ScrollReveal delay={200}>
          <div className="contact-form-box">
            {/* Torn parchment background layer */}
            <div className="contact-form-bg" />

            <div className="contact-form-content">
              {/* Corner gold brackets */}
              <ContactCorner style={{ top: '8px', left: '8px' }} />
              <ContactCorner style={{ top: '8px', right: '8px', transform: 'rotate(90deg)' }} />
              <ContactCorner style={{ bottom: '8px', right: '8px', transform: 'rotate(180deg)' }} />
              <ContactCorner style={{ bottom: '8px', left: '8px', transform: 'rotate(270deg)' }} />

              {submitted ? (
                <div className="contact-success font-sketch">
                  🎉 Scroll received! We'll reply within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label className="form-label font-marker" htmlFor="contact-name">Noble Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Sir Galahad"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedInput('name')}
                      onBlur={() => setFocusedInput(null)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label font-marker" htmlFor="contact-email">Scroll Destination (Email)</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. noble@realm.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedInput('email')}
                      onBlur={() => setFocusedInput(null)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label font-marker" htmlFor="contact-message">The Quest details (Message)</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="What spellbook or SaaS platform are we building?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedInput('message')}
                      onBlur={() => setFocusedInput(null)}
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
                      color="#cc9e43"
                      strokeWidth={3.5}
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
          </div>
        </ScrollReveal>
      </div>

      {/* Hidden SVG Filter for contact form torn edges */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="contact-torn-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </section>
  );
};

export default ContactSection;
