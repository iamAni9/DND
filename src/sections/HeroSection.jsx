import React, { useState, useEffect } from 'react';
import '@/styles/hero.css';

const SERVICES = [
  { 
    text: 'AI Agents 🤖', 
    className: 'cube-pos-top',
    description: 'Autonomous workflows, custom LLM integrations, and intelligent agents built to automate complex business operations.'
  },
  { 
    text: 'SaaS Programs 🚀', 
    className: 'cube-pos-top-right',
    description: 'Robust, multi-tenant cloud applications, customized dashboards, and secure backend portals built to scale with ease.'
  },
  { 
    text: 'Websites 🌐', 
    className: 'cube-pos-bottom-right',
    description: 'Bespoke, high-performance web experiences featuring premium designs, interactive animations, and responsive layouts.'
  },
  { 
    text: 'Mobile Apps 📱', 
    className: 'cube-pos-bottom',
    description: 'Sleek native and cross-platform mobile applications for iOS and Android, optimized for performance and fluid UX.'
  },
  { 
    text: 'API Platforms 🔌', 
    className: 'cube-pos-bottom-left',
    description: 'Fast, secure, and structured API integrations, backend architectures, and database orchestration pipelines.'
  },
  { 
    text: 'Automations ⚙️', 
    className: 'cube-pos-top-left',
    description: 'Custom background scripts, tool connectors, and automated schedules designed to eliminate repetitive operational work.'
  }
];

const renderIcon = (text) => {
  const normalizedText = text.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim().toLowerCase();
  switch (normalizedText) {
    case 'ai agents':
      return (
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M50,28 L50,16" />
          <circle cx="50" cy="12" r="4" fill="currentColor" />
          <rect x="24" y="28" width="52" height="46" rx="10" strokeWidth="4" />
          <circle cx="40" cy="48" r="3" fill="currentColor" stroke="none" />
          <circle cx="60" cy="48" r="3" fill="currentColor" stroke="none" />
          <path d="M42,62 L58,62" strokeWidth="3.5" />
          <rect x="18" y="44" width="6" height="14" rx="2" fill="currentColor" stroke="none" />
          <rect x="76" y="44" width="6" height="14" rx="2" fill="currentColor" stroke="none" />
        </g>
      );
    case 'saas programs':
      return (
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="20" y="25" width="60" height="50" rx="8" />
          <line x1="20" y1="38" x2="80" y2="38" />
          <circle cx="29" cy="31" r="2.5" fill="currentColor" stroke="none" />
          <circle cx="36" cy="31" r="2.5" fill="currentColor" stroke="none" />
          <circle cx="43" cy="31" r="2.5" fill="currentColor" stroke="none" />
          <line x1="42" y1="38" x2="42" y2="75" strokeWidth="3.5" />
          <line x1="50" y1="48" x2="72" y2="48" strokeWidth="3.5" />
          <line x1="50" y1="58" x2="66" y2="58" strokeWidth="3.5" />
        </g>
      );
    case 'websites':
      return (
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <circle cx="50" cy="50" r="32" />
          <ellipse cx="50" cy="50" rx="12" ry="32" />
          <line x1="18" y1="50" x2="82" y2="50" />
          <path d="M 22,34 C 32,42 68,42 78,34" />
          <path d="M 22,66 C 32,58 68,58 78,66" />
        </g>
      );
    case 'mobile apps':
      return (
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="28" y="18" width="44" height="64" rx="8" />
          <line x1="44" y1="24" x2="56" y2="24" strokeWidth="3" />
          <line x1="46" y1="75" x2="54" y2="75" strokeWidth="3.5" />
          <rect x="34" y="30" width="32" height="38" rx="2" strokeWidth="3" />
        </g>
      );
    case 'api platforms':
      return (
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <circle cx="50" cy="50" r="10" fill="currentColor" />
          <path d="M 50,50 L 25,25" />
          <path d="M 50,50 L 25,75" />
          <path d="M 50,50 L 78,50" />
          <circle cx="25" cy="25" r="6" fill="#ffffff" strokeWidth="3.5" />
          <circle cx="25" cy="75" r="6" fill="#ffffff" strokeWidth="3.5" />
          <circle cx="78" cy="50" r="6" fill="#ffffff" strokeWidth="3.5" />
        </g>
      );
    case 'automations':
    default:
      return (
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <circle cx="42" cy="42" r="13" />
          <path d="M42,24 L42,28 M42,56 L42,60 M24,42 L28,42 M56,42 L60,42 M29,29 L32,32 M52,52 L55,55 M29,55 L32,52 M52,29 L55,32" strokeWidth="4" />
          <circle cx="62" cy="62" r="9" />
          <path d="M62,49 L62,53 M62,71 L62,75 M49,62 L53,62 M71,62 L75,62" strokeWidth="3.5" />
        </g>
      );
  }
};

// Reusable Blueprint 3D Sketch Wireframe Cube
const SketchCube = ({ text, className, isFocal, onClick }) => (
  <div 
    className={`sketch-cube-node ${className} ${isFocal ? 'focal-cube' : ''}`}
    onClick={onClick}
  >
    <div className="cube-wrapper">
      <svg viewBox="0 0 160 140" className="cube-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cube-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2 1.5" />
          </pattern>
        </defs>
        
        {/* Solid Top Face Background to block the orbit line */}
        <polygon points="80,10 145,40 80,70 15,40" className="face-top-bg" />
        
        {/* Outer Outline Wireframe */}
        <polygon points="80,10 145,40 80,70 15,40" className="cube-face face-top" fill="url(#cube-hatch)" />
        <polygon points="15,40 80,70 80,130 15,100" className="cube-face face-left" />
        <polygon points="145,40 80,70 80,130 145,100" className="cube-face face-right" />
        
        {/* Architecture Inner Hidden Wireframe Lines */}
        <path d="M 15 40 L 80 100 L 145 40" strokeWidth="1" strokeDasharray="3 3" className="inner-wireframe" />
        <path d="M 80 100 L 80 130" strokeWidth="1" strokeDasharray="3 3" className="inner-wireframe" />
        
        {/* Isometric Front-Left Projected Icon */}
        <g transform="matrix(0.65 0.30 0 0.60 15 40)" className="cube-icon">
          {renderIcon(text)}
        </g>
      </svg>
    </div>
    <div className="cube-label">
      <span className="status-dot"></span>
      <span>{text}</span>
    </div>
  </div>
);

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const autoRotationTimer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % SERVICES.length);
        setIsTransitioning(false);
      }, 350);
    }, 4800);

    return () => clearInterval(autoRotationTimer);
  }, [isHovered]);

  const handleCubeClick = (index) => {
    if (activeIndex === index) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

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
              {SERVICES[activeIndex].text}
            </span>
          </div>
          <p className={`hero__description ${isTransitioning ? 'desc-fade-out' : 'desc-fade-in'}`}>
            {SERVICES[activeIndex].description}
          </p>
        </div>

        {/* Right Column: Sketchy 3D Box Orbit Orbit Ring */}
        <div 
          className="hero__visual"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Blueprint Layout Calibration Marks */}
          <span className="draft-crosshair top-left">+</span>
          <span className="draft-crosshair top-right">+</span>
          <span className="draft-crosshair bottom-left">+</span>
          <span className="draft-crosshair bottom-right">+</span>
          
          {/* Blueprint Guide Axis Lines */}
          <div className="blueprint-axis horizontal" />
          
          {/* Orbit Ring SVG */}
          <svg className="orbit-ring-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" className="orbit-line" />
            <circle cx="50" cy="50" r="46" className="orbit-spark-glow" />
            <circle cx="50" cy="50" r="46" className="orbit-spark-core" />
          </svg>
          
          {/* Centralized Brand Focal Target */}
          <div className="logo-wrapper">
            <div className="logo-glow-aura" />
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
            {SERVICES.map((service, index) => (
              <SketchCube 
                key={index}
                text={service.text} 
                className={service.className} 
                isFocal={activeIndex === index}
                onClick={() => handleCubeClick(index)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;