import React, { useState, useEffect } from 'react';
import '@/styles/hero.css';
import SketchCube from '@/components/SketchCube';


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