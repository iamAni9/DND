import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import '@/styles/philosophy.css';
import WitchBanners from '../components/WitchBanners';
import RainEffect from '../components/RainEffect';

const PhilosophySection = () => {
  return (
    <section className="philosophy" id="about" aria-labelledby="phil-title">
      {/* Canvas-based Rain over the entire section */}
      <RainEffect />

      {/* Handdrawn small clouds */}
      <div className="philosophy-clouds">
        {/* Cloud 1 */}
        <svg viewBox="0 0 100 60" fill="var(--bg)" stroke="var(--text-h)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cloud-doodle">
          <path d="M 10,45 C 5,45 2,38 7,33 C 5,25 15,15 25,18 C 30,10 45,5 55,10 C 65,5 80,10 85,20 C 95,20 98,30 93,38 C 98,45 90,50 82,48 C 75,52 65,48 55,48 C 45,50 35,52 25,48 C 18,52 12,50 10,45 Z" />
          <path d="M 22,28 C 28,24 38,24 42,28" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 50,22 C 58,18 70,22 72,28" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 30,42 C 45,40 60,40 70,42" strokeWidth="1.5" fill="none" opacity="0.6" />
        </svg>
        {/* Cloud 2 */}
        <svg viewBox="0 0 120 70" fill="var(--bg)" stroke="var(--text-h)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cloud-doodle">
          <path d="M 15,50 C 8,50 5,42 10,36 C 8,26 20,15 32,18 C 38,8 55,5 68,10 C 80,5 95,12 100,24 C 110,24 114,35 108,44 C 114,52 104,58 95,55 C 88,60 75,55 65,55 C 52,58 40,60 28,55 C 20,60 12,58 15,50 Z" />
          <path d="M 28,32 C 35,28 45,28 50,32" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 60,25 C 70,20 82,25 85,32" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 35,48 C 55,45 75,45 85,48" strokeWidth="1.5" fill="none" opacity="0.6" />
        </svg>
        {/* Cloud 3 */}
        <svg viewBox="0 0 100 60" fill="var(--bg)" stroke="var(--text-h)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cloud-doodle">
          <path d="M 10,45 C 5,45 2,38 7,33 C 5,25 15,15 25,18 C 30,10 45,5 55,10 C 65,5 80,10 85,20 C 95,20 98,30 93,38 C 98,45 90,50 82,48 C 75,52 65,48 55,48 C 45,50 35,52 25,48 C 18,52 12,50 10,45 Z" />
          <path d="M 22,28 C 28,24 38,24 42,28" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 50,22 C 58,18 70,22 72,28" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 30,42 C 45,40 60,40 70,42" strokeWidth="1.5" fill="none" opacity="0.6" />
        </svg>
        {/* Cloud 4 */}
        <svg viewBox="0 0 120 70" fill="var(--bg)" stroke="var(--text-h)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cloud-doodle">
          <path d="M 15,50 C 8,50 5,42 10,36 C 8,26 20,15 32,18 C 38,8 55,5 68,10 C 80,5 95,12 100,24 C 110,24 114,35 108,44 C 114,52 104,58 95,55 C 88,60 75,55 65,55 C 52,58 40,60 28,55 C 20,60 12,58 15,50 Z" />
          <path d="M 28,32 C 35,28 45,28 50,32" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 60,25 C 70,20 82,25 85,32" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 35,48 C 55,45 75,45 85,48" strokeWidth="1.5" fill="none" opacity="0.6" />
        </svg>
      </div>

      {/* Header Text Area */}
      <div className="philosophy__header">
        <h2 id="phil-title" className="philosophy__title font-sketch">
          No Tech Drama. Just Results.
        </h2>
        <div className="philosophy__subtitle">
          <span className="philosophy__subtitle-text">
            We Handle the Tech. You Focus on What You Do Best.
          </span>
        </div>
      </div>

      <WitchBanners />

      {/* Philosophy Details Grid */}
      <div className="feature-grid">
        {/* Card 1 */}
        <ScrollReveal delay={100}>
          <div className="phil-card">
            <h4 className="phil-card__title font-sketch">
              Fresh, Bold Perspective ⚡
            </h4>
            <p className="phil-card__text">
              Zero legacy code, zero old-school constraints. We engineer modern digital applications with a 2026 tech stack and high-performance design.
            </p>
          </div>
        </ScrollReveal>

        {/* Card 2 */}
        <ScrollReveal delay={200}>
          <div className="phil-card">
            <h4 className="phil-card__title font-outline">
              INVEST IN YOUR WEBSITE
            </h4>
            <p className="phil-card__text">
              The difference between cheap and quality design is conversion rates, credibility, and security. We build assets, not expenses.
            </p>
          </div>
        </ScrollReveal>

        {/* Card 3 */}
        <ScrollReveal delay={300}>
          <div className="phil-card">
            <h4 className="phil-card__title font-solid">
              No Drama, Just Growth 🚀
            </h4>
            <p className="phil-card__text">
              Clear timelines, direct communication with creators, and zero developer overhead. We align design aesthetics with functional business scale.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PhilosophySection;