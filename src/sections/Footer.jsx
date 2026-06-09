import React, { useState } from 'react';
import InteractiveNimbu from '@/components/InteractiveNimbu';
import '@/styles/footer.css';

/* ───────── Winding Fairy Forest Vines SVG ───────── */
const FooterVines = () => (
  <div className="footer-vines">
    <svg viewBox="0 0 1000 30" preserveAspectRatio="none">
      {/* Main vine stalks */}
      <path d="M0,15 Q125,5 250,15 T500,15 T750,15 T1000,15" fill="none" stroke="#2d3d2c" strokeWidth="2.2" />
      <path d="M0,15 Q125,25 250,15 T500,15 T750,15 T1000,15" fill="none" stroke="#465e45" strokeWidth="1.2" strokeDasharray="3 3" />
      {/* Vintage green ivy leaves */}
      <path d="M50,12 C45,5 55,2 60,10 C65,18 55,18 50,12 Z" fill="#587a56" stroke="#2d3d2c" strokeWidth="1.2" />
      <path d="M180,18 C185,25 175,28 170,20 C165,12 175,12 180,18 Z" fill="#6a9167" stroke="#2d3d2c" strokeWidth="1.2" />
      <path d="M300,10 C295,3 305,0 310,8 C315,16 305,16 300,10 Z" fill="#587a56" stroke="#2d3d2c" strokeWidth="1.2" />
      <path d="M430,20 C435,27 425,30 420,22 C415,14 425,14 430,20 Z" fill="#6a9167" stroke="#2d3d2c" strokeWidth="1.2" />
      <path d="M560,12 C555,5 565,2 570,10 C575,18 565,18 560,12 Z" fill="#587a56" stroke="#2d3d2c" strokeWidth="1.2" />
      <path d="M680,18 C685,25 675,28 670,20 C665,12 675,12 680,18 Z" fill="#6a9167" stroke="#2d3d2c" strokeWidth="1.2" />
      <path d="M810,10 C805,3 815,0 820,8 C825,16 815,16 810,10 Z" fill="#587a56" stroke="#2d3d2c" strokeWidth="1.2" />
      <path d="M930,20 C935,27 925,30 920,22 C915,14 925,14 930,20 Z" fill="#6a9167" stroke="#2d3d2c" strokeWidth="1.2" />
      {/* Twinkling fairy firefly bulbs along vine */}
      <circle cx="100" cy="11" r="3.5" fill="#ffd700" className="twinkle-bud" />
      <circle cx="220" cy="19" r="2.5" fill="#ffae00" className="twinkle-bud" style={{ animationDelay: '-0.7s' }} />
      <circle cx="360" cy="12" r="3.5" fill="#ffd700" className="twinkle-bud" style={{ animationDelay: '-1.4s' }} />
      <circle cx="480" cy="17" r="2.5" fill="#ffae00" className="twinkle-bud" style={{ animationDelay: '-2.1s' }} />
      <circle cx="610" cy="11" r="3.5" fill="#ffd700" className="twinkle-bud" style={{ animationDelay: '-0.4s' }} />
      <circle cx="730" cy="19" r="2.5" fill="#ffae00" className="twinkle-bud" style={{ animationDelay: '-1.1s' }} />
      <circle cx="860" cy="12" r="3.5" fill="#ffd700" className="twinkle-bud" style={{ animationDelay: '-1.8s' }} />
      <circle cx="970" cy="17" r="2.5" fill="#ffae00" className="twinkle-bud" style={{ animationDelay: '-2.5s' }} />
    </svg>
  </div>
);

const Footer = () => {
  const [sparkles, setSparkles] = useState([]);
  const [isWobbling, setIsWobbling] = useState(false);

  const triggerMagic = () => {
    if (isWobbling) return;
    setIsWobbling(true);
    setTimeout(() => setIsWobbling(false), 600);

    const newSparkles = Array.from({ length: 10 }).map((_, i) => {
      const tx = (Math.random() - 0.5) * 120;
      const ty = -70 - Math.random() * 80;
      const rot = (Math.random() - 0.5) * 360;
      return {
        id: Date.now() + i,
        x: 35,
        y: 25,
        size: Math.random() * 12 + 6,
        color: ['#a78bfa', '#c084fc', '#ffd700', '#ffae00', '#f472b6', '#38bdf8'][Math.floor(Math.random() * 6)],
        delay: Math.random() * 0.25,
        duration: 0.9 + Math.random() * 0.8,
        tx,
        ty,
        rot
      };
    });

    setSparkles((prev) => [...prev, ...newSparkles]);

    setTimeout(() => {
      setSparkles((prev) => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
    }, 2000);
  };

  return (
    <footer className="footer" aria-labelledby="footer-brand">
      {/* Fairy Vines top border cover */}
      <FooterVines />

      {/* Lemon Mascot Corner (Nimbu) - interactive stretchy string */}
      <InteractiveNimbu />

      <div className="footer-container">
        {/* Left Column: Brand & Logo */}
        <div className="footer-brand-box">
          <img src="/dnd_logo_with_text.png" alt="DevNextDoor Logo" className="footer-logo-brand" />
          <p className="footer-desc">
            Squeezing fresh concepts into clean code. We build custom websites, automated workflows, and LLM-powered AI systems for fast-growing startups.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
            <a href="#" className="social-icon" aria-label="LinkedIn">🔗</a>
            <a href="#" className="social-icon" aria-label="GitHub">💻</a>
          </div>
        </div>

        {/* Center-Right Columns: Quick Links */}
        <div className="footer-nav-grid">
          <div className="footer-col">
            <h4 className="footer-col-title font-sketch">Explore</h4>
            <ul className="footer-col-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">Philosophy</a></li>
              <li><a href="#work">Our Work</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title font-sketch">What We Build</h4>
            <ul className="footer-col-links">
              <li><a href="#">SaaS Systems</a></li>
              <li><a href="#">AI Chat Companions</a></li>
              <li><a href="#">Web Platforms</a></li>
              <li><a href="#">Automations</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="footer-bottom">
        <p className="footer-copyright font-marker">
          © {new Date().getFullYear()} DevNextDoor. Freshly engineered from scratch in India.
        </p>

        {/* Magic Potion Bottle Artifact */}
        <div 
          className="potion-bottle-container" 
          onClick={triggerMagic} 
          onMouseEnter={triggerMagic}
          title="Click or Hover to cast a Dev Spell!"
        >
          {sparkles.map((sparkle) => (
            <span
              key={sparkle.id}
              className="potion-sparkle"
              style={{
                left: `${sparkle.x}px`,
                top: `${sparkle.y}px`,
                fontSize: `${sparkle.size}px`,
                color: sparkle.color,
                '--delay': `${sparkle.delay}s`,
                '--duration': `${sparkle.duration}s`,
                '--tx': `${sparkle.tx}px`,
                '--ty': `${sparkle.ty}px`,
                '--rot': `${sparkle.rot}deg`,
                textShadow: `0 0 6px ${sparkle.color}`,
              }}
            >
              ✦
            </span>
          ))}

          <div className={`potion-bottle-wrapper ${isWobbling ? 'potion-wobble' : ''}`}>
            <svg viewBox="0 0 100 120" width="100%" height="100%" style={{ overflow: 'visible' }}>
              <defs>
                <clipPath id="potion-liquid-clip">
                  <path d="M43 25 C43 25, 45 42, 35 47 C25 52, 23 93, 23 95 C23 103, 77 103, 77 95 C77 93, 75 52, 65 47 C55 42, 57 25, 57 25 Z" />
                </clipPath>
              </defs>

              {/* Cork Stopper */}
              <path d="M42 13 L58 13 L56 25 L44 25 Z" fill="#8c6239" stroke="#1a0e05" strokeWidth="2" strokeLinejoin="round" />
              <ellipse cx="50" cy="13" rx="8" ry="3" fill="#a07248" stroke="#1a0e05" strokeWidth="1" />

              {/* Liquid inside (clipped to bottle interior) */}
              <g clipPath="url(#potion-liquid-clip)">
                {/* Darker base liquid */}
                <rect x="10" y="40" width="80" height="70" className="potion-liquid" />
                
                {/* Wavy top layer */}
                <path d="M -10 52 Q 15 46, 40 52 T 90 52 T 140 52 L 140 110 L -10 110 Z" fill="#a78bfa" className="potion-wave" style={{ opacity: 0.8 }} />
                
                {/* Little magical bubbles */}
                <circle cx="34" cy="85" r="2.5" fill="#f5f3ff" className="potion-bubble bubble-1" style={{ '--bubble-drift': '-6px' }} />
                <circle cx="58" cy="90" r="1.5" fill="#f5f3ff" className="potion-bubble bubble-2" style={{ '--bubble-drift': '4px' }} />
                <circle cx="46" cy="75" r="2" fill="#f5f3ff" className="potion-bubble bubble-3" style={{ '--bubble-drift': '2px' }} />
                <circle cx="64" cy="80" r="3" fill="#f5f3ff" className="potion-bubble bubble-4" style={{ '--bubble-drift': '-3px' }} />
              </g>

              {/* Glass Bottle Outline */}
              <path d="M43 25 C43 25, 45 42, 35 47 C25 52, 23 93, 23 95 C23 103, 77 103, 77 95 C77 93, 75 52, 65 47 C55 42, 57 25, 57 25 Z" fill="none" stroke="#2d2012" strokeWidth="2.5" strokeLinejoin="round" />
              
              {/* Glass Highlights / Reflection */}
              <path d="M30 58 C27 68, 27 88, 31 95" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              <path d="M68 53 C71 62, 72 75, 71 85" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
              
              {/* Neck Ribbon */}
              <path d="M43 28 Q 50 31, 57 28" fill="none" stroke="#b45309" strokeWidth="2" />
              <path d="M50 29 L54 44 M50 29 L47 42" fill="none" stroke="#b45309" strokeWidth="1.5" />

              {/* Hanging Tag */}
              <g transform="rotate(12, 54, 44)">
                <rect x="46" y="38" width="22" height="12" rx="2" fill="#fef3c7" stroke="#78350f" strokeWidth="1" />
                <text x="57" y="46" fontSize="5" fontFamily="var(--sans)" textAnchor="middle" fill="#78350f" fontWeight="900">
                  CODE
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
