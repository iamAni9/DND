import React, { useState, useEffect, useRef } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeNode, setActiveNode] = useState(0); // Node 0 (AI Agents) active initially
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [timerResetTrigger, setTimerResetTrigger] = useState(0);

  const arrivalTimeoutRef = useRef(null);

  // Synchronized auto-rotation timer
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (arrivalTimeoutRef.current) {
        clearTimeout(arrivalTimeoutRef.current);
      }

      // 1. Close current active node (stops glowing & closes flaps)
      setActiveNode(null);

      // 2. Start transitioning the spark to the next node
      setIsTransitioning(true);
      setCurrentIndex((prev) => {
        const nextVal = prev + 1;
        setActiveIndex(nextVal % 6);
        return nextVal;
      });

      // 3. Wait for the spark transition along the orbit to finish (1000ms / 1s)
      arrivalTimeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => {
          setActiveNode(prev % 6);
          return prev;
        });
        setIsTransitioning(false);
      }, 1000);

    }, 7200); // 7.2 seconds total cycle (6.2s resting + 1.0s transit)

    return () => {
      clearInterval(interval);
      if (arrivalTimeoutRef.current) {
        clearTimeout(arrivalTimeoutRef.current);
      }
    };
  }, [isHovered, timerResetTrigger]);

  const handleCubeClick = (index) => {
    if (activeIndex === index) return;
    setTimerResetTrigger((prev) => prev + 1); // Reset interval timer

    if (arrivalTimeoutRef.current) {
      clearTimeout(arrivalTimeoutRef.current);
    }

    // Close current active node
    setActiveNode(null);
    setIsTransitioning(true);

    // Calculate next clockwise index value
    const currentSubIndex = currentIndex % 6;
    let diff = index - currentSubIndex;
    if (diff <= 0) {
      diff += 6;
    }
    const targetVal = currentIndex + diff;

    setCurrentIndex(targetVal);
    setActiveIndex(index);

    arrivalTimeoutRef.current = setTimeout(() => {
      setActiveNode(index);
      setIsTransitioning(false);
    }, 1000);
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
          <svg className="orbit-ring-svg" viewBox="0 0 100 100" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" className="orbit-line" />
            
            {/* Orbit Spark Group */}
            <g
              className={`orbit-spark-group ${isTransitioning ? 'is-transit' : 'is-resting'}`}
              style={{
                transform: `rotate(${90 + currentIndex * 60}deg)`,
              }}
            >
              <g
                className="orbit-spark-bolt-wrapper"
                style={{
                  transform: `rotate(${-(90 + currentIndex * 60)}deg)`,
                }}
              >
                <g className="orbit-spark-bolt-jitter">
                  {/* Thin golden circle container */}
                  <circle cx="50" cy="4" r="10" className="spark-symbol-circle" />
                  
                  {/* The main solid lightning bolt */}
                  <path
                    d="M 52 -4 L 46.25 3 L 49.25 3 L 45 8.5 L 51.25 13 L 50.5 6 L 54.25 6 Z"
                    className="spark-symbol-bolt"
                  />

                  {/* Jagged electric crackle lines radiating outwards */}
                  <path d="M 43 4 L 39 2 L 36.5 4" className="resting-spark-line spark-line-1" />
                  <path d="M 57 4 L 61 6 L 63.5 4" className="resting-spark-line spark-line-2" />
                  <path d="M 50 -4 L 48.5 -8 L 49.5 -11.5" className="resting-spark-line spark-line-3" />
                  <path d="M 50 12 L 52 16 L 50.5 19.5" className="resting-spark-line spark-line-4" />
                </g>
              </g>
            </g>
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
                isFocal={activeNode === index}
                isOpen={activeNode === index}
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