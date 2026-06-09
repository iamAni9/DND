import React from 'react';
import MagicalDesk from '@/components/MagicalDesk';
import WitchBanners from '@/components/WitchBanners';
import '@/styles/hero.css';

const HeroSection = () => {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid">
        {/* Left Column: Main Content Area */}
        <div className="hero__content">
          <h1 id="hero-title" className="hero__title">
            DevNextDoor
          </h1>
          <p className="hero__subtitle">
            From robust SaaS systems to intelligent AI integrations, websites, and fully-featured platforms. We turn your concepts into elegant, clean code.
          </p>
        </div>

        {/* Right Column: Visual Storytelling Animation */}
        <MagicalDesk />
      </div>

      {/* Flying Witch pulling stardust string with hanging cards */}
      <WitchBanners />
    </section>
  );
};

export default HeroSection;
