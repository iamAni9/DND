import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import '@/styles/reviews.css';

/* ───────── Glowing Fairy Mascot SVG ───────── */
const ScrollFairy = () => (
  <svg viewBox="0 0 44 44" className="scroll-fairy">
    {/* Glow aura */}
    <circle cx="22" cy="22" r="14" fill="rgba(255, 215, 0, 0.25)" filter="blur(2.5px)" />
    
    {/* Left Wing */}
    <path
      className="fairy-wing-left"
      d="M 22,22 C 14,8 2,12 5,20 C 7,26 15,24 22,22 Z"
      fill="url(#fairy-wing-grad)"
      stroke="#543c0d"
      strokeWidth="1.2"
    />
    {/* Right Wing */}
    <path
      className="fairy-wing-right"
      d="M 22,22 C 30,8 42,12 39,20 C 37,26 29,24 22,22 Z"
      fill="url(#fairy-wing-grad)"
      stroke="#543c0d"
      strokeWidth="1.2"
    />
    
    {/* Main body & Head */}
    <circle cx="22" cy="19" r="2.2" fill="#ffffff" />
    <path
      d="M 22,21 L 22,29"
      stroke="url(#fairy-body-grad)"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    {/* Antennae */}
    <path d="M 22,17.5 Q 19,13 16,14" fill="none" stroke="#ffd700" strokeWidth="0.9" />
    <path d="M 22,17.5 Q 25,13 28,14" fill="none" stroke="#ffd700" strokeWidth="0.9" />
    
    <defs>
      <linearGradient id="fairy-wing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff4b8" />
        <stop offset="60%" stopColor="#ffb84d" />
        <stop offset="100%" stopColor="#ff4da6" />
      </linearGradient>
      <linearGradient id="fairy-body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#ffd700" />
      </linearGradient>
    </defs>
  </svg>
);

/* ───────── Review Scroll Card Subcomponent ───────── */
const ReviewScroll = ({ quote, author }) => {
  return (
    <div className="scroll-card">
      {/* Fluttering fairy mascot on top */}
      <ScrollFairy />

      {/* Decorative wood rod top */}
      <div className="scroll-rod-top" />

      {/* Falling sparkles container (activated on card hover via CSS) */}
      <div className="scroll-sparkle sparkle-c1" />
      <div className="scroll-sparkle sparkle-c2" />
      <div className="scroll-sparkle sparkle-c3" />
      <div className="scroll-sparkle sparkle-c4" />
      <div className="scroll-sparkle sparkle-c5" />

      {/* Rolled/unrolling parchment paper body */}
      <div className="scroll-paper">
        <div className="scroll-content">
          <p className="scroll-quote">"{quote}"</p>
          <p className="scroll-author">— {author}</p>
        </div>
      </div>

      {/* Decorative wood rod bottom (translates down & spins) */}
      <div className="scroll-rod-bottom" />
    </div>
  );
};

/* ───────── Main Section Component ───────── */
const ReviewsSection = () => {
  const reviewsData = [
    {
      quote: "DevNextDoor built our SaaS platform in record time. No dev drama, zero overhead, and the code was exceptionally clean!",
      author: "Eldon, Founder of MageFlow",
    },
    {
      quote: "The AI agent integrations they built saved our support guild over 30 hours of manual labor per week. Highly recommended!",
      author: "Lyra, Director at QuestLabs",
    },
  ];

  return (
    <section className="reviews-section" id="reviews" aria-labelledby="reviews-title">
      <div className="reviews-header">
        <ScrollReveal delay={50}>
          <h2 id="reviews-title" className="reviews-title font-sketch">
            Scrolls of Praise
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="reviews-subtitle">
            Reviews from allied guilds who went on adventures with us.
          </p>
        </ScrollReveal>
      </div>

      <div className="reviews-grid">
        {reviewsData.map((item, idx) => (
          <ScrollReveal key={idx} delay={300 + idx * 150}>
            <ReviewScroll quote={item.quote} author={item.author} />
          </ScrollReveal>
        ))}
      </div>

      {/* Hidden SVG Filter for torn scroll edges */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="scroll-torn-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </section>
  );
};

export default ReviewsSection;
