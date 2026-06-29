import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import '@/styles/philosophy.css';

/* ───────── SVG illustrations (clean vector line-art) ───────── */
const EyeLens = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="philosophy-svg">
    <circle cx="50" cy="50" r="32" fill="var(--accent-bg)" />
    <circle cx="50" cy="50" r="14" />
    <path d="M50 18 L36 32" /><path d="M82 50 L68 36" />
    <path d="M50 82 L64 68" /><path d="M18 50 L32 64" />
    <circle cx="50" cy="50" r="6" fill="var(--accent)" stroke="none" />
  </svg>
);

const RisingShield = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="philosophy-svg">
    <path d="M50 18 C30 18, 26 28, 26 48 C26 68, 50 82, 50 82 C50 82, 74 68, 74 48 C74 28, 70 18, 50 18 Z" fill="var(--accent-bg)" />
    <path d="M38 52 L46 60 L62 44" strokeWidth="3.5" />
  </svg>
);

const GrowthNodes = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="philosophy-svg">
    <path d="M30 65 L45 42 L62 58 L78 30" strokeWidth="3" />
    <circle cx="30" cy="65" r="7" fill="#ffffff" strokeWidth="3.5" />
    <circle cx="45" cy="42" r="7" fill="#ffffff" strokeWidth="3.5" />
    <circle cx="62" cy="58" r="7" fill="#ffffff" strokeWidth="3.5" />
    <circle cx="78" cy="30" r="7" fill="var(--accent)" stroke="none" />
    <path d="M74 24 L82 24 L82 32" strokeWidth="3" />
  </svg>
);

const PHILOSOPHY_CARDS = [
  {
    title: 'Fresh, Bold Perspective',
    desc: 'Zero legacy code, zero old-school constraints. We engineer modern digital applications with a 2026 tech stack and high-performance design.',
    Icon: EyeLens
  },
  {
    title: 'Invest in Your Website',
    desc: 'The difference between cheap and quality design is conversion rates, credibility, and security. We build assets, not expenses.',
    Icon: RisingShield
  },
  {
    title: 'No Drama, Just Growth',
    desc: 'Clear timelines, direct communication with creators, and zero developer overhead. We align design aesthetics with functional business scale.',
    Icon: GrowthNodes
  }
];

const PhilosophySection = () => {
  return (
    <section className="philosophy" id="about" aria-labelledby="phil-title">
      {/* Background Ambient Glow Flare */}
      <div className="philosophy-radial-glow" />

      {/* Header Text Area */}
      <div className="philosophy__header">
        <ScrollReveal delay={50}>
          <h2 id="phil-title" className="philosophy__title font-solid">
            No Tech Drama. Just Results.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <div className="philosophy__subtitle">
            <span className="philosophy__subtitle-text">
              We Handle the Tech. You Focus on What You Do Best.
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* Philosophy Cards Grid */}
      <div className="services-grid">
        {PHILOSOPHY_CARDS.map((card, idx) => (
          <ScrollReveal key={idx} delay={idx * 150}>
            <div className="service-card">
              <div className="service-card__top-bar" />
              <div className="service-card__icon-container">
                <card.Icon />
              </div>
              <h3 className="service-card__title font-solid">{card.title}</h3>
              <p className="service-card__text">{card.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default PhilosophySection;