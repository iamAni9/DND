import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import SketchCube from '@/components/SketchCube';
import '@/styles/hero.css';

const SERVICES = [
  {
    text: 'AI Integration',
    description: 'Autonomous LLM workflows, custom AI integrations, and intelligent assistant features trained on your proprietary data.',
    className: 'cube-pos-top'
  },
  {
    text: 'SaaS Applications',
    description: 'Scalable multi-tenant cloud architectures, dashboard telemetry, billing pipelines, and custom back-office applications.',
    className: 'cube-pos-top-right'
  },
  {
    text: 'Web Systems',
    description: 'Modern, blazing-fast web applications designed with premium animations and responsive modern typography.',
    className: 'cube-pos-bottom-right'
  },
  {
    text: 'Mobile Applications',
    description: 'Native-feeling cross-platform iOS & Android mobile applications engineered from concept to app store deployment.',
    className: 'cube-pos-bottom'
  },
  {
    text: 'API Engineering',
    description: 'Fast, secure, and structured API integrations, backend architectures, and database orchestration pipelines.',
    className: 'cube-pos-bottom-left'
  },
  {
    text: 'Process Automations',
    description: 'Custom workflow scripts, database syncs, webhook orchestrations, and automated tool integrations.',
    className: 'cube-pos-top-left'
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
          
          <ScrollReveal delay={150}>
            <h1 id="hero-title" className="hero__title">
              DevNextDoor
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <p className="hero__subtitle">
              We can design & build{' '}
              <span className={`hero__subtitle-dynamic ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                {SERVICES[activeIndex].text}
              </span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={350}>
            <p className={`hero__description ${isTransitioning ? 'desc-fade-out' : 'desc-fade-in'}`}>
              {SERVICES[activeIndex].description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={450}>
            <div className="hero__ctas">
              <a href="#contact" className="hero__cta-primary">
                Get in Touch <span className="cta-arrow">→</span>
              </a>
              <a href="#work" className="hero__cta-secondary">
                Explore Work
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Sketchy 3D Box Orbit Orbit Ring */}
        <div
          className="hero__visual"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          {/* Orbit Ring SVG */}
          <svg className="orbit-ring-svg" viewBox="0 0 100 100" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" className="orbit-line" />
            
            {/* Orbit Particle Group */}
            <g
              className={`orbit-particle-group ${isTransitioning ? 'is-transit' : 'is-resting'}`}
              style={{
                transform: `rotate(${90 + currentIndex * 60}deg)`,
              }}
            >
              <g
                className="orbit-particle-wrapper"
                style={{
                  transform: `rotate(${-(90 + currentIndex * 60)}deg)`,
                }}
              >
                <circle cx="50" cy="4" r="5" className="orbit-glow-particle" />
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