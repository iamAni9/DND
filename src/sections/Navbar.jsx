import React, { useState, useEffect } from 'react';
import RoughAnnotation from '@/components/RoughAnnotation';
import '@/styles/navbar.css';

const Navbar = () => {
  const [detached, setDetached] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    const handleScroll = () => {
      setDetached(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      {/* =========================================================================
         THE MAGIC SKETCHY ENGINE (Hidden SVG filter applied via CSS)
         ========================================================================= */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <filter id="excalidraw-sketch">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Your Navbar */}
      <nav className={`navbar ${detached ? 'navbar--detached' : 'navbar--attached'} ${isMobileMenuOpen ? 'navbar--open' : ''}`}>
        <div className="navbar__bg"></div>
        <div className="navbar__inner">
          {/* Brand/Logo */}
          <div className="navbar__section navbar__section--left">
            <div className="navbar__brand">
              <div className="navbar__logo-wrapper">
                <img src="/dnd_logo.png" alt="DevNextDoor Logo" className="navbar__logo" />
              </div>
              <span className="navbar__title">DevNextDoor</span>
            </div>
          </div>

          {/* Desktop & Mobile Navigation Links */}
          <div className={`navbar__section navbar__section--center ${isMobileMenuOpen ? 'navbar__section--mobile-visible' : ''}`}>
            <ul className="navbar__links">
              <li>
                <RoughAnnotation type="box" color="#6366f1" padding={8} strokeWidth={2.5}>
                  <a href="#home" className="navbar__link" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
                </RoughAnnotation>
              </li>
              <li>
                <RoughAnnotation type="box" color="#ff5a79" padding={8} strokeWidth={2.5}>
                  <a href="#about" className="navbar__link" onClick={() => setIsMobileMenuOpen(false)}>Philosophy</a>
                </RoughAnnotation>
              </li>
              <li>
                <RoughAnnotation type="box" color="#eab308" padding={8} strokeWidth={2.5}>
                  <a href="#process" className="navbar__link" onClick={() => setIsMobileMenuOpen(false)}>Process</a>
                </RoughAnnotation>
              </li>
              <li>
                <RoughAnnotation type="box" color="#3b82f6" padding={8} strokeWidth={2.5}>
                  <a href="#work" className="navbar__link" onClick={() => setIsMobileMenuOpen(false)}>Our Work</a>
                </RoughAnnotation>
              </li>
              <li>
                <RoughAnnotation type="box" color="#a855f7" padding={8} strokeWidth={2.5}>
                  <a href="#faq" className="navbar__link" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
                </RoughAnnotation>
              </li>
              <li>
                <RoughAnnotation type="box" color="#10b981" padding={8} strokeWidth={2.5}>
                  <a href="#contact" className="navbar__link" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                </RoughAnnotation>
              </li>
            </ul>
          </div>

          {/* Right CTA / Mobile Toggle */}
          <div className="navbar__section navbar__section--right">
            <button
              className="navbar__theme-toggle"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label="Toggle dark theme"
            >
              {theme === 'light' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="theme-toggle-svg">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="theme-toggle-svg">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button
              className={`navbar__burger ${isMobileMenuOpen ? 'navbar__burger--active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;