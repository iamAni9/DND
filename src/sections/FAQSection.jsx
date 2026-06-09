import React, { useState, useRef, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import '@/styles/faq.css';

/* ───────── Mystical Fairy Flourish SVG ───────── */
const MysticalFairyFlourish = () => (
  <svg 
    viewBox="0 0 100 30" 
    fill="none" 
    stroke="#ebdcae" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    style={{ width: '180px', height: 'auto', margin: '0.8rem auto 0', display: 'block', opacity: 0.8 }}
  >
    {/* Center sparkling star */}
    <path d="M50 3 L53 12 L62 15 L53 18 L50 27 L47 18 L38 15 L47 12 Z" fill="#cc9e43" stroke="none" />
    {/* Elegant swirling vine lines */}
    <path d="M38 15 Q25 5 10 15 C5 17 2 15 2 12" />
    <path d="M62 15 Q75 5 90 15 C95 17 98 15 98 12" />
    {/* Sparkling pollen dots */}
    <circle cx="25" cy="8" r="1.5" fill="#ebdcae" />
    <circle cx="75" cy="8" r="1.5" fill="#ebdcae" />
    <circle cx="18" cy="22" r="1" fill="#cc9e43" />
    <circle cx="82" cy="22" r="1" fill="#cc9e43" />
  </svg>
);

/* ───────── Individual FAQ Card Component ───────── */
const FAQCard = ({ q, a, index }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className="faq-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic displaced torn background */}
      <div className="faq-card-bg" />

      {/* Base Text Layer (Charcoal ink, readable size) */}
      <div className="faq-card-content base-content">
        <span className="faq-q-indicator">Quest 0{index + 1}</span>
        <h4 className="faq-question">{q}</h4>
        <span className="faq-a-indicator">Loot / Response</span>
        <p className="faq-answer">{a}</p>
        <div className="faq-card-flourish" />
      </div>

      {/* Magnified Text Layer + Floating Lens */}
      {isHovered && (
        <>
          {/* Zoomed content: scaled 1.4x and centered at mouse coordinate */}
          <div
            className="faq-card-content magnified-content"
            style={{
              transform: 'scale(1.4)',
              transformOrigin: `${mousePos.x}px ${mousePos.y}px`,
              clipPath: `circle(70px at ${mousePos.x}px ${mousePos.y}px)`,
              WebkitClipPath: `circle(70px at ${mousePos.x}px ${mousePos.y}px)`,
            }}
          >
            <span className="faq-q-indicator">Quest 0{index + 1}</span>
            <h4 className="faq-question">{q}</h4>
            <span className="faq-a-indicator">Loot / Response</span>
            <p className="faq-answer">{a}</p>
            <div className="faq-card-flourish" />
          </div>

          {/* Floating Vintage Magnifying Glass Frame */}
          <div
            className="magnifying-lens"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
            }}
          >
            <div className="lens-glass" />
            {/* Swirling fairy dust sparks around brass frame */}
            <div className="lens-sparkle sparkle-1" />
            <div className="lens-sparkle sparkle-2" />
            <div className="lens-sparkle sparkle-3" />
          </div>
        </>
      )}
    </div>
  );
};

/* ───────── Main FAQ Section Component ───────── */
const FAQSection = () => {
  const [fireflies, setFireflies] = useState([]);

  // Generate randomized positions and delays for the floating fireflies on mount
  useEffect(() => {
    const list = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      top: Math.random() * 85 + 5,      // restrict to main section area
      left: Math.random() * 90 + 5,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 16,
      scale: 0.5 + Math.random() * 0.8,
    }));
    setFireflies(list);
  }, []);

  const faqData = [
    {
      q: "How fast can you deliver a scroll?",
      a: "Simple quests (landing pages) take 1 to 2 weeks. Larger campaigns (full SaaS platforms or AI integrations) take 4 to 8 weeks depending on the complexity of your spellbook.",
    },
    {
      q: "What spells (technologies) do you cast?",
      a: "We primarily cast React, Vite, Next.js, Node.js, and TypeScript, backed by LLM AI integrations, Postgres databases, and custom automation scripts.",
    },
    {
      q: "Can we adjust our quest details mid-campaign?",
      a: "Yes! We work in agile party sprint systems. You can adjust your loot requirements at the end of each sprint milestone.",
    },
  ];

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      {/* Drifting fireflies layer */}
      <div className="firefly-container">
        {fireflies.map((ff) => (
          <div
            key={ff.id}
            className="firefly"
            style={{
              top: `${ff.top}%`,
              left: `${ff.left}%`,
              animationDelay: `${ff.delay}s`,
              animationDuration: `${ff.duration}s`,
              transform: `scale(${ff.scale})`,
            }}
          />
        ))}
      </div>

      <div className="faq-header">
        <ScrollReveal delay={50}>
          <h2 id="faq-title" className="faq-title font-sketch">
            The Guild's Spellbook (FAQ)
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="faq-subtitle">
            Answers to the most common inquiries sent to our tavern.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={250}>
          <MysticalFairyFlourish />
        </ScrollReveal>
      </div>

      <div className="faq-grid">
        {faqData.map((item, idx) => (
          <ScrollReveal key={idx} delay={300 + idx * 100}>
            <FAQCard q={item.q} a={item.a} index={idx} />
          </ScrollReveal>
        ))}
      </div>

      {/* Hidden SVG Filter for Torn Paper Edges */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="faq-torn-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </section>
  );
};

export default FAQSection;
