import React, { useState, useEffect } from 'react';
import '@/styles/hero.css';

const ROTATING_TEXTS = ['AI Agents 🤖', 'Dashboards 📊', 'Websites 🌐', 'SaaS Programs 🚀', 'Mobile Apps 📱', 'Automations ⚙️'];

// Reusable Blueprint 3D Sketch Wireframe Cube
const SketchCube = ({ text, className, isFocal }) => (
  <div className={`sketch-cube-node ${className} ${isFocal ? 'focal-cube' : ''}`}>
    <svg viewBox="0 0 160 140" className="cube-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Outline Wireframe */}
      <polygon points="80,10 145,40 80,70 15,40" className="cube-face face-top" />
      <polygon points="15,40 80,70 80,130 15,100" className="cube-face face-left" />
      <polygon points="145,40 80,70 80,130 145,100" className="cube-face face-right" />
      
      {/* Architecture Inner Hidden Wireframe Lines */}
      <path d="M 15 40 L 80 100 L 145 40" strokeWidth="1" strokeDasharray="3 3" className="inner-wireframe" />
      <path d="M 80 100 L 80 130" strokeWidth="1" strokeDasharray="3 3" className="inner-wireframe" />
    </svg>
    <div className="cube-text-overlay">
      <span>{text}</span>
    </div>
  </div>
);

const HeroSection = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const stringTimer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setTextIndex((prevIndex) => (prevIndex + 1) % ROTATING_TEXTS.length);
        setIsTransitioning(false);
      }, 350); // Matches the fading transition curve duration
    }, 2800);

    return () => clearInterval(stringTimer);
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid">
        
        {/* Left Column: Premium Minimalist Content & Text Rotator */}
        <div className="hero__content">
          <h1 id="hero-title" className="hero__title">
            DevNextDoor
          </h1>
          <div className="hero__subtitle-container">
            <p className="hero__subtitle-base">We can design & build</p>
            <span className={`hero__subtitle-dynamic ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
              {ROTATING_TEXTS[textIndex]}
            </span>
          </div>
          <p className="hero__description">
            From robust SaaS platforms to fully-featured web ecosystems. We turn complex visual concepts into elegant, hand-crafted code.
          </p>
        </div>

        {/* Right Column: Sketchy 3D Box Orbit Orbit Ring */}
        <div className="hero__visual">
          
          {/* Blueprint Layout Calibration Marks */}
          <span className="draft-crosshair top-left">+</span>
          <span className="draft-crosshair top-right">+</span>
          <span className="draft-crosshair bottom-left">+</span>
          <span className="draft-crosshair bottom-right">+</span>
          
          {/* Centralized Brand Focal Target */}
          <div className="logo-wrapper">
            <img 
              src="/dnd_logo.png" 
              alt="DevNextDoor Logo" 
              className="hero-logo"
            />
          </div>

          {/* Textured Under-Logo Pencil Smudge Shadow */}
          <div className="pencil-smudge-shadow" />

          {/* Isometric 3D Node Rings */}
          <div className="cube-matrix-container">
            <SketchCube text="AI Agents 🤖" className="cube-pos-top" isFocal={true} />
            <SketchCube text="SaaS Programs 🚀" className="cube-pos-top-right" />
            <SketchCube text="Websites 🌐" className="cube-pos-bottom-right" />
            <SketchCube text="Mobile Apps 📱" className="cube-pos-bottom" />
            <SketchCube text="API Platforms 🔌" className="cube-pos-bottom-left" />
            <SketchCube text="Automations ⚙️" className="cube-pos-top-left" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;