import React from 'react';
import '@/styles/witchBanners.css';

const CARDS = [
  { text: 'Websites 🌐', description: 'Modern, responsive, and blazing-fast web experiences.', color: '#eab308' },
  { text: 'AI Agents 🤖', description: 'Autonomous LLM workflows & intelligent assistants.', color: '#3b82f6' },
  { text: 'SaaS Programs 🚀', description: 'Scalable multi-tenant cloud platforms & services.', color: '#ec4899' },
  { text: 'Mobile Apps 📱', description: 'Native iOS & Android apps designed from scratch.', color: '#10b981' },
  { text: 'API Platforms 🔌', description: 'Secure REST/GraphQL API designs & integrations.', color: '#f97316' },
  { text: 'Automations ⚙️', description: 'Custom workflow scripts saving you hours of work.', color: '#8b5cf6' },
];

const WitchBanners = () => {
  return (
    <div className="witch-banner-system">

      {/* Background Stardust Rope (Desktop only) */}
      <div className="witch-string-bg">
        <svg viewBox="0 0 1000 120" width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <linearGradient id="stardust-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="0.2" />
              <stop offset="20%" stopColor="#ffd700" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#f472b6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffd700" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* Main sagging rope line */}
          <path
            d="M 50,25 Q 470,105, 890,25"
            fill="none"
            stroke="url(#stardust-glow)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="4 4"
            className="stardust-rope"
          />
          {/* Glowing underlay */}
          <path
            d="M 50,25 Q 470,105, 890,25"
            fill="none"
            stroke="#ffd700"
            strokeWidth="1.5"
            opacity="0.4"
            strokeLinecap="round"
          />
          {/* Left Anchor: Hanging Star */}
          <g transform="translate(45, 15)">
            <circle cx="5" cy="10" r="5" fill="#f59e0b" filter="drop-shadow(0 0 4px #ffd700)" className="star-anchor" />
            <line x1="5" y1="0" x2="5" y2="10" stroke="#7c2d12" strokeWidth="1.5" />
          </g>
        </svg>
      </div>

      {/* Flying Witch Mascot (Absolute right on desktop, top on mobile) */}
      <div className="flying-witch-container">
        <svg viewBox="0 0 120 100" width="100" height="85" className="flying-witch-svg">
          <defs>
            <linearGradient id="quill-grad-w" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d8b4fe" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          {/* Sparkles trailing the broom */}
          <g className="witch-sparkles">
            <path d="M 0 50 Q -10 45, -20 52" fill="none" stroke="#ffd700" strokeWidth="2" opacity="0.6" strokeDasharray="3 3" />
            <circle cx="-12" cy="48" r="1.5" fill="#ffd700" className="w-sparkle sp-1" />
            <circle cx="-25" cy="55" r="1" fill="#ffffff" className="w-sparkle sp-2" />
            <circle cx="-8" cy="58" r="2" fill="#d8b4fe" className="w-sparkle sp-3" />
          </g>

          {/* Broom stick */}
          <path d="M 10 60 L 105 45" stroke="#7c2d12" strokeWidth="4.5" strokeLinecap="round" />
          {/* Broom brush (bristles) */}
          <path d="M 10 60 C 5 54, 2 48, 0 65 C 2 73, 8 70, 16 64 Z" fill="#b45309" stroke="#7c2d12" strokeWidth="1.5" />

          {/* Waving Cape */}
          <path d="M 45 42 Q 22 46, 12 36 Q 24 56, 45 48 Z" fill="#6d28d9" stroke="#4c1d95" strokeWidth="1" className="witch-cape" />

          {/* Little Black Cat sitting on the back of the broom */}
          <g transform="translate(26, 41)">
            {/* Body */}
            <circle cx="5" cy="5" r="5.5" fill="#1e1b4b" />
            {/* Head */}
            <circle cx="5" cy="-1" r="3.8" fill="#1e1b4b" />
            {/* Ears */}
            <polygon points="2.5,-3 4.5,-1 2.5,-1" fill="#1e1b4b" />
            <polygon points="7.5,-3 5.5,-1 7.5,-1" fill="#1e1b4b" />
            {/* Tail */}
            <path d="M 1 8 Q -3 11, -1 5" fill="none" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" />
            {/* Glowing Eyes */}
            <circle cx="3.8" cy="-1.2" r="0.6" fill="#a7f3d0" />
            <circle cx="6.2" cy="-1.2" r="0.6" fill="#a7f3d0" />
          </g>

          {/* Witch Dress & Legs */}
          <circle cx="54" cy="46" r="10" fill="#4c1d95" />
          <path d="M 50 56 L 45 68 M 58 56 L 55 68" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 45 68 L 39 70 M 55 68 L 49 70" stroke="#111827" strokeWidth="3" strokeLinecap="round" />

          {/* Face */}
          <circle cx="57" cy="32" r="7.5" fill="#fbcfe8" />
          {/* Eyes (happy curves) */}
          <path d="M 56 31 Q 58 29, 60 31" fill="none" stroke="#251307" strokeWidth="1" />
          {/* Cute Smile */}
          <path d="M 60 34 Q 62 36, 60 38" fill="none" stroke="#be185d" strokeWidth="1" strokeLinecap="round" />
          
          {/* Hair */}
          <path d="M 51 32 C 49 39, 51 44, 52 46 M 63 32 C 65 39, 64 44, 62 46" fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" />

          {/* Witch Hat */}
          {/* Brim */}
          <path d="M 44 27 C 44 27, 58 29, 72 26" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
          {/* Cone */}
          <path d="M 47 25 L 59 8 L 65 24 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
          {/* Gold Buckle Ribbon */}
          <path d="M 49 23 L 63 22" stroke="#d97706" strokeWidth="2" />
        </svg>
      </div>

      {/* Hanging Cards Grid */}
      <div className="hanging-cards-container">
        {CARDS.map((card, idx) => {
          // Compute exact position coordinate mapping onto the stardust rope
          const x = 130 + idx * 136; // Spacing cards evenly from 130 to 810
          const t = (x - 50) / 840;
          const y = 25 + 160 * t * (1 - t);

          return (
            <div 
              key={idx} 
              className={`hanging-card-item card-${idx + 1}`}
              style={{
                '--card-left': `${x / 10}%`,
                '--card-top': `${y}px`,
              }}
            >
              {/* The Rope hanger connecting to string */}
              <div className="hanging-rope">
                <svg viewBox="0 0 10 40" width="100%" height="100%" preserveAspectRatio="none">
                  <line x1="5" y1="0" x2="5" y2="40" stroke="#7c2d12" strokeWidth="1.8" strokeDasharray="2 2" />
                  <circle cx="5" cy="36" r="2.5" fill="#aa7c11" />
                </svg>
              </div>
              
              {/* Card Content (Parchment scroll look) */}
              <div 
                className="hanging-card-body"
                style={{ '--accent-color': card.color }}
              >
                {/* Gold hanging rivet */}
                <div className="card-rivet"></div>
                
                <h4 className="card-title">{card.text}</h4>
                <p className="card-desc">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WitchBanners;
