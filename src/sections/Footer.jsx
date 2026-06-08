import React from 'react';
import InteractiveNimbu from '@/components/InteractiveNimbu';
import '@/styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer" aria-labelledby="footer-brand">
      {/* Lemon Mascot Corner (Nimbu) - interactive stretchy string */}
      <InteractiveNimbu />

      <div className="footer-container">
        {/* Left Column: Brand & Logo */}
        <div className="footer-brand-box">
          <img src="/dnd logo with text.png" alt="DevNextDoor Logo" className="footer-logo-brand" />
          <p className="footer-desc">
            Squeezing fresh concepts into clean code. We build custom websites, automated workflows, and LLM-powered AI systems for fast-growing startups.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
            <a href="#" className="social-icon" aria-label="LinkedIn">🔗</a>
            <a href="#" className="social-icon" aria-label="GitHub">💻</a>
          </div>
        </div>

        {/* Center-Right Columns: Quick Links */}
        <div className="footer-nav-grid">
          <div className="footer-col">
            <h4 className="footer-col-title font-sketch">Explore</h4>
            <ul className="footer-col-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">Philosophy</a></li>
              <li><a href="#work">Our Work</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title font-sketch">What We Build</h4>
            <ul className="footer-col-links">
              <li><a href="#">SaaS Systems</a></li>
              <li><a href="#">AI Chat Companions</a></li>
              <li><a href="#">Web Platforms</a></li>
              <li><a href="#">Automations</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="footer-bottom">
        <p className="footer-copyright font-marker">
          © {new Date().getFullYear()} DevNextDoor. Freshly engineered from scratch in India.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
