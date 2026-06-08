import React from 'react';
import RoughAnnotation from '@/components/RoughAnnotation';
import ScrollReveal from '@/components/ScrollReveal';
import '@/styles/philosophy.css';

const PhilosophySection = () => {
  return (
    <section className="philosophy" id="about" aria-labelledby="phil-title">
      {/* Header Text Area */}
      <div className="philosophy__header">
        <h2 id="phil-title" className="philosophy__title font-sketch">
          No Tech Drama. Just Results.
        </h2>
        <div className="philosophy__subtitle">
          <RoughAnnotation type="highlight" color="#fef08a" strokeWidth={2} padding={4} show={true}>
            <span style={styles.highlightText}>We Handle the Tech. You Focus on What You Do Best.</span>
          </RoughAnnotation>
        </div>
      </div>

      {/* Cosmic Illustration Canvas */}
      <div className="cosmic-canvas">
        {/* Animated SVGs */}
        <svg className="svg-overlay" viewBox="0 0 900 380">
          <defs>
            <style>
              {`
                .sketch-line { stroke: var(--text-h); stroke-width: 2.5; fill: none; stroke-linecap: round; stroke-linejoin: round; }
                .sketch-fill { fill: var(--bg); stroke: var(--text-h); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
              `}
            </style>
          </defs>

          {/* Twinkling Stars */}
          <g className="star-twinkle">
            <path className="sketch-fill" d="M 60,60 L 65,75 L 80,75 L 68,84 L 72,99 L 60,90 L 48,99 L 52,84 L 40,75 L 55,75 Z" />
          </g>
          <g className="star-twinkle" style={{ animationDelay: '-1s' }}>
            <path className="sketch-fill" d="M 830,220 L 833,230 L 843,230 L 835,236 L 838,246 L 830,240 L 822,246 L 825,236 L 817,230 L 827,230 Z" transform="scale(0.8) translate(150, 50)" />
          </g>
          <g className="star-twinkle" style={{ animationDelay: '-2s' }}>
            <path className="sketch-fill" d="M 100,310 L 102,317 L 110,317 L 103,321 L 105,329 L 100,324 L 95,329 L 97,321 L 90,317 L 98,317 Z" transform="scale(0.7) translate(20, 150)" />
          </g>

          {/* Saturn Planet (Top Center-Right) */}
          <g className="star-twinkle" style={{ animationDelay: '-0.5s' }}>
            <circle cx="680" cy="50" r="16" className="sketch-fill" />
            <ellipse cx="680" cy="50" rx="30" ry="7" className="sketch-line" transform="rotate(-15 680 50)" />
          </g>

          {/* Ground / Moon Horizon (Left side) */}
          <path className="sketch-line" d="M -20,320 Q 180,270 380,320" />
          
          {/* Moon Details / Craters */}
          <ellipse cx="80" cy="305" rx="12" ry="6" className="sketch-line" />
          <ellipse cx="260" cy="300" rx="8" ry="4" className="sketch-line" />
          <ellipse cx="180" cy="312" rx="16" ry="5" className="sketch-line" />

          {/* Space Rover (Driving on the Moon Horizon) */}
          <g className="rover-bounce">
            <rect x="280" y="260" width="40" height="20" rx="5" className="sketch-fill" />
            <path className="sketch-fill" d="M 290,260 L 295,248 L 315,248 L 320,260 Z" />
            <circle cx="290" cy="287" r="8" className="sketch-fill" />
            <circle cx="290" cy="287" r="2" fill="var(--text-h)" />
            <circle cx="310" cy="287" r="8" className="sketch-fill" />
            <circle cx="310" cy="287" r="2" fill="var(--text-h)" />
            <line x1="300" y1="248" x2="295" y2="230" className="sketch-line" />
            <path className="sketch-line" d="M 292,230 Q 295,227 298,230" />
          </g>

          {/* Astronaut standing on Moon (Left) */}
          <g>
            <line x1="105" y1="285" x2="105" y2="300" className="sketch-line" />
            <line x1="115" y1="285" x2="115" y2="300" className="sketch-line" />
            <rect x="95" y="250" width="30" height="36" rx="6" className="sketch-fill" />
            <path className="sketch-line" d="M 95,260 Q 82,265 88,275" />
            <path className="sketch-line" d="M 125,260 Q 138,262 135,272" />
            <circle cx="110" cy="235" r="16" className="sketch-fill" />
            <ellipse cx="110" cy="233" rx="10" ry="7" fill="var(--text-h)" />
            <line x1="72" y1="305" x2="72" y2="210" className="sketch-line" />
            <path className="sketch-fill" style={{ fill: '#00c2a8' }} d="M 72,210 L 110,210 C 115,210 118,213 118,217 L 118,232 C 118,236 115,239 110,239 L 82,239 L 72,245 Z" />
            <path className="sketch-line" d="M 90,223 Q 95,228 100,223" style={{ strokeWidth: 2 }} />
          </g>

          {/* Flight Dashed Trail */}
          <path className="sketch-line animated-trail" d="M -10,180 Q 200,80 440,190 T 780,120" />

          {/* Floating Astronaut (Right) */}
          <g className="astronaut-float">
            <circle cx="780" cy="120" r="3" fill="var(--accent)" />
            <path className="sketch-line" d="M 798,110 Q 815,95 810,85" />
            <path className="sketch-line" d="M 766,113 Q 750,118 752,128" />
            <path className="sketch-line" d="M 776,136 Q 762,160 766,170" />
            <path className="sketch-line" d="M 788,136 Q 800,165 794,175" />
            <rect x="766" y="100" width="32" height="38" rx="8" className="sketch-fill" />
            <rect x="756" y="105" width="10" height="26" rx="3" className="sketch-fill" />
            <circle cx="782" cy="85" r="16" className="sketch-fill" />
            <ellipse cx="782" cy="83" rx="11" ry="8" fill="var(--text-h)" />
          </g>
        </svg>

        {/* Text centered inside the Canvas */}
        <div className="cosmic-canvas__content">
          <h3 className="cosmic-canvas__subtitle font-marker">
            Great Design is hard. We make it Easy
          </h3>
        </div>
      </div>

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

const styles = {
  highlightText: {
    fontFamily: 'var(--sans)',
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
  },
};

export default PhilosophySection;
