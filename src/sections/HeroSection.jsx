import React, { useState, useRef } from 'react';
import RoughAnnotation from '@/components/RoughAnnotation';

const CARDS = [
  { text: 'Websites 🌐', description: 'Modern, responsive, and blazing-fast web experiences.', color: 'rgba(253, 224, 71, 0.45)', type: 'highlight', position: { top: '15%', left: '8%' }, rotate: '-3deg' },
  { text: 'AI Agents 🤖', description: 'Autonomous LLM workflows & intelligent assistants.', color: 'rgba(147, 197, 253, 0.45)', type: 'highlight', position: { top: '42%', left: '5%' }, rotate: '4deg' },
  { text: 'SaaS Programs 🚀', description: 'Scalable multi-tenant cloud platforms & services.', color: 'rgba(244, 114, 182, 0.45)', type: 'highlight', position: { top: '68%', left: '10%' }, rotate: '-2deg' },
  { text: 'Mobile Apps 📱', description: 'Native iOS & Android apps designed from scratch.', color: 'rgba(134, 239, 172, 0.45)', type: 'highlight', position: { top: '18%', right: '8%' }, rotate: '3deg' },
  { text: 'API Platforms 🔌', description: 'Secure REST/GraphQL API designs & integrations.', color: 'rgba(253, 186, 116, 0.45)', type: 'highlight', position: { top: '45%', right: '5%' }, rotate: '-4deg' },
  { text: 'Automations ⚙️', description: 'Custom workflow scripts saving you hours of work.', color: 'rgba(216, 180, 254, 0.45)', type: 'highlight', position: { top: '66%', right: '9%' }, rotate: '2deg' },
];

const FloatingCard = ({ text, description, color, type, position, rotate }) => {
  const [hovered, setHovered] = useState(false);
  const annotationRef = useRef(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (annotationRef.current) {
      annotationRef.current.show();
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (annotationRef.current) {
      annotationRef.current.hide();
    }
  };

  return (
    <div
      className="hero-card-wrapper"
      style={position}
    >
      <div
        className="hero-card"
        style={{
          transform: hovered ? 'scale(1.15) rotate(0deg)' : `rotate(${rotate})`,
          zIndex: hovered ? 10 : 1,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <RoughAnnotation
          ref={annotationRef}
          type={type}
          color={color}
          padding={6}
          strokeWidth={3}
          animationDuration={100}
        >
          <span style={styles.cardText}>{text}</span>
        </RoughAnnotation>
        <div className="hero-card__description">
          {description}
        </div>
      </div>
    </div>
  );
};

const MobileCard = ({ text, description, color, type }) => {
  const [hovered, setHovered] = useState(false);
  const annotationRef = useRef(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (annotationRef.current) {
      annotationRef.current.show();
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (annotationRef.current) {
      annotationRef.current.hide();
    }
  };

  return (
    <div
      className="hero-card-mobile"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <RoughAnnotation
        ref={annotationRef}
        type={type}
        color={color}
        padding={6}
        strokeWidth={3}
        animationDuration={100}
      >
        <span style={styles.cardText}>{text}</span>
      </RoughAnnotation>
      <div className="hero-card__description">
        {description}
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="hero" aria-labelledby="hero-title">
      {/* Desktop Scattered Floating Cards */}
      <div className="hero__cards-desktop">
        {CARDS.map((card, idx) => (
          <FloatingCard key={idx} {...card} />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="hero__content">
        <h1 id="hero-title" className="hero__title">
          DevNextDoor
        </h1>
        <p className="hero__subtitle">
          From robust SaaS systems to intelligent AI integrations, websites, and fully-featured platforms. We turn your concepts into elegant, clean code.
        </p>
      </div>

      {/* Mobile Grid View for Cards */}
      <div className="hero__cards-mobile">
        {CARDS.map((card, idx) => (
          <MobileCard key={idx} {...card} />
        ))}
      </div>
    </section>
  );
};

const styles = {
  cardText: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: 'var(--text-h)',
    fontFamily: 'var(--sans)',
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
};

export default HeroSection;
