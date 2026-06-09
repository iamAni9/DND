import React, { useState, useEffect } from 'react';
import RoughAnnotation from '@/components/RoughAnnotation';
import '@/styles/navbar.css';

const Navbar = () => {
  const [detached, setDetached] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setDetached(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <div className="navbar__inner">
          {/* Brand/Logo */}
          <div className="navbar__section navbar__section--left">
            <div className="navbar__brand">
              <div className="navbar__logo-wrapper">
                <img src="/dnd logo plain.png" alt="DevNextDoor Logo" className="navbar__logo" />
              </div>
              <span className="navbar__title">DevNextDoor</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className={`navbar__section navbar__section--center ${isMobileMenuOpen ? 'navbar__section--mobile-visible' : ''}`}>
            <ul className="navbar__links">
              <li>
                <RoughAnnotation type="box" color="#aa3bff" padding={8} strokeWidth={2.5}>
                  <a href="#home" className="navbar__link" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
                </RoughAnnotation>
              </li>
              <li>
                <RoughAnnotation type="box" color="#ff5a79" padding={8} strokeWidth={2.5}>
                  <a href="#about" className="navbar__link" onClick={() => setIsMobileMenuOpen(false)}>About</a>
                </RoughAnnotation>
              </li>
              <li>
                <RoughAnnotation type="box" color="#00c2a8" padding={8} strokeWidth={2.5}>
                  <a href="#contact" className="navbar__link" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</a>
                </RoughAnnotation>
              </li>
            </ul>
          </div>

          {/* Right CTA / Mobile Toggle */}
          <div className="navbar__section navbar__section--right">
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