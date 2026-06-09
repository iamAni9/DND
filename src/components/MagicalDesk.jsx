import React from 'react';

const MagicalDesk = () => {
  return (
    <div className="magical-desk-container">
      <svg
        viewBox="0 0 500 400"
        width="100%"
        height="100%"
        className="magical-desk-svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Ambient Window Sky Gradient */}
          <linearGradient id="window-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#070314" />
            <stop offset="60%" stopColor="#120c24" />
            <stop offset="100%" stopColor="#1c1130" />
          </linearGradient>

          {/* Golden Rune Glow */}
          <filter id="rune-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Liquid Radial Gradient */}
          <radialGradient id="liquid-grad" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="70%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#164e63" />
          </radialGradient>

          {/* Crystal Ball Radial Gradient */}
          <radialGradient id="crystal-glow" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2e1065" stopOpacity="0.95" />
          </radialGradient>

          {/* Crystal Glow Highlight Filter */}
          <filter id="crystal-glow-filter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Wood Grain Pattern */}
          <pattern id="wood-pattern" width="100" height="20" patternUnits="userSpaceOnUse">
            <path d="M 0 10 Q 25 7, 50 10 T 100 10" fill="none" stroke="#331e0b" strokeWidth="1" opacity="0.15" />
            <path d="M 0 18 Q 25 15, 50 18 T 100 18" fill="none" stroke="#331e0b" strokeWidth="1" opacity="0.1" />
          </pattern>

          {/* Quill Gradient */}
          <linearGradient id="quill-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d8b4fe" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>

          {/* Liquid Clip Path */}
          <clipPath id="flask-liquid-clip">
            <path d="M 111 254 L 111 230 L 129 230 L 129 254 C 141 262, 145 285, 141 297 C 137 302, 103 302, 99 297 C 95 285, 99 262, 111 254 Z" />
          </clipPath>
        </defs>

        {/* ─── BACKGROUND: Arch Window to Fairy Woods ─── */}
        <g className="window-group">
          {/* Stone Outer Frame */}
          <path d="M 160 310 L 160 150 C 160 50, 340 50, 340 150 L 340 310 Z" fill="#201c2d" stroke="#161320" strokeWidth="6" />
          {/* Inside Sky */}
          <path d="M 170 310 L 170 150 C 170 65, 330 65, 330 150 L 330 310 Z" fill="url(#window-sky)" />
          
          {/* Crescent Moon */}
          <path d="M 290 95 C 290 80, 275 70, 260 72 C 272 78, 274 95, 265 102 C 258 107, 248 106, 242 101 C 248 115, 268 122, 280 114 C 288 109, 290 102, 290 95 Z" fill="#fef3c7" opacity="0.85" filter="drop-shadow(0 0 6px #fef08a)" />

          {/* Background Pine Silhouettes */}
          <path d="M 170 310 L 185 240 L 195 310 L 210 260 L 225 310 L 305 310 L 315 250 L 330 310 Z" fill="#090514" opacity="0.8" />

          {/* Twinkling Stars */}
          <circle cx="190" cy="110" r="1.2" fill="#ffffff" className="bg-star star-1" />
          <circle cx="215" cy="85" r="1.5" fill="#ffd700" className="bg-star star-2" />
          <circle cx="240" cy="130" r="1" fill="#ffffff" className="bg-star star-3" />
          <circle cx="305" cy="120" r="1.6" fill="#ffd700" className="bg-star star-4" />
          <circle cx="315" cy="95" r="1.2" fill="#ffffff" className="bg-star star-5" />
          
          {/* Fireflies floating in background */}
          <circle cx="200" cy="200" r="2.5" fill="#a7f3d0" className="bg-firefly fly-1" />
          <circle cx="310" cy="180" r="2" fill="#a7f3d0" className="bg-firefly fly-2" />
          <circle cx="230" cy="230" r="3" fill="#6ee7b7" className="bg-firefly fly-3" />
          <circle cx="280" cy="220" r="2.2" fill="#6ee7b7" className="bg-firefly fly-4" />
        </g>

        {/* ─── TABLE: Solid Wooden Desk ─── */}
        <g className="desk-group">
          {/* Desk Base Structure */}
          <path d="M 0 310 L 500 310 L 500 400 L 0 400 Z" fill="#42220f" stroke="#251307" strokeWidth="3" />
          {/* Wood highlights */}
          <path d="M 0 310 L 500 310" stroke="#783f1d" strokeWidth="4" strokeLinecap="round" />
          {/* Overlay Wood Pattern */}
          <rect x="0" y="312" width="500" height="88" fill="url(#wood-pattern)" pointerEvents="none" />
          {/* Desk Shadow overlay */}
          <ellipse cx="250" cy="316" rx="200" ry="6" fill="#180a04" opacity="0.4" />
        </g>

        {/* ─── COZY MASCOT: Sleeping Fairy Nimbu (Left Corner) ─── */}
        <g className="desk-mascot-group">
          {/* Mascot shadow on desk */}
          <ellipse cx="65" cy="312" rx="16" ry="5" fill="#180a04" opacity="0.6" />

          {/* Sleeping character body (breathing scale animation) */}
          <g className="mascot-body">
            {/* Small fairy wings */}
            <path d="M 46 280 C 35 272, 38 290, 48 290 Z" fill="#a78bfa" opacity="0.75" className="mascot-wing wing-l" />
            <path d="M 84 280 C 95 272, 92 290, 82 290 Z" fill="#a78bfa" opacity="0.75" className="mascot-wing wing-r" />

            {/* Rounded body/lemon head */}
            <circle cx="65" cy="290" r="16" fill="#fef08a" stroke="#251307" strokeWidth="2" />
            {/* Little leafy stem on top */}
            <path d="M 65 274 Q 63 266, 56 264 Q 61 271, 65 274" fill="#4ade80" stroke="#251307" strokeWidth="1.5" />

            {/* Cheek blush */}
            <circle cx="53" cy="294" r="2" fill="#f87171" opacity="0.6" />
            <circle cx="77" cy="294" r="2" fill="#f87171" opacity="0.6" />

            {/* Sleeping Eyes (visible by default) */}
            <g className="eyes-asleep">
              <path d="M 52 288 Q 56 291, 60 288" fill="none" stroke="#251307" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 70 288 Q 74 291, 78 288" fill="none" stroke="#251307" strokeWidth="1.8" strokeLinecap="round" />
            </g>

            {/* Awake Eyes (hidden by default, shows on hover) */}
            <g className="eyes-awake">
              <circle cx="56" cy="287" r="2.5" fill="#251307" />
              <circle cx="74" cy="287" r="2.5" fill="#251307" />
              <circle cx="57" cy="286" r="0.8" fill="#ffffff" />
              <circle cx="75" cy="286" r="0.8" fill="#ffffff" />
              {/* Cute smiling mouth */}
              <path d="M 62 293 Q 65 296, 68 293" fill="none" stroke="#251307" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Zzz sleep bubbles rising up */}
            <g className="sleep-bubbles">
              <text x="50" y="260" fontSize="8" fontFamily="sans-serif" fill="#d8b4fe" fontWeight="bold" className="zzz zzz-1">z</text>
              <text x="40" y="245" fontSize="11" fontFamily="sans-serif" fill="#d8b4fe" fontWeight="bold" className="zzz zzz-2">Z</text>
              <text x="28" y="230" fontSize="13" fontFamily="sans-serif" fill="#a78bfa" fontWeight="bold" className="zzz zzz-3">Z</text>
            </g>
          </g>
        </g>

        {/* ─── LEFT ARTIFACT: Glowing Alchemical Potion ─── */}
        <g className="potion-flask-group">
          {/* Flask Shadow */}
          <ellipse cx="120" cy="311" rx="22" ry="6" fill="#180a04" opacity="0.6" />

          {/* Rising steam lines */}
          <path d="M 120 220 Q 115 195, 125 180 T 115 155" fill="none" stroke="#a5f3fc" strokeWidth="2" strokeLinecap="round" className="flask-steam steam-1" />
          <path d="M 123 220 Q 128 198, 118 185 T 128 162" fill="none" stroke="#a5f3fc" strokeWidth="1.5" strokeLinecap="round" className="flask-steam steam-2" />

          {/* Liquid content clipping mask */}
          <g clipPath="url(#flask-liquid-clip)">
            {/* Liquid base */}
            <rect x="90" y="250" width="60" height="60" fill="url(#liquid-grad)" className="flask-liquid" />
            {/* Animated liquid surface wave */}
            <path d="M 90 262 Q 105 258, 120 262 T 150 262 L 150 310 L 90 310 Z" fill="#22d3ee" opacity="0.4" className="flask-liquid-wave" />
            
            {/* Rising alchemical bubbles */}
            <circle cx="110" cy="285" r="2" fill="#e0f7fa" className="potion-bubble pb-1" />
            <circle cx="128" cy="292" r="1.2" fill="#e0f7fa" className="potion-bubble pb-2" />
            <circle cx="118" cy="275" r="1.6" fill="#e0f7fa" className="potion-bubble pb-3" />
            <circle cx="134" cy="282" r="2.2" fill="#e0f7fa" className="potion-bubble pb-4" />
          </g>

          {/* Beaker Glass Outline */}
          <path d="M 111 230 L 129 230 M 115 230 L 115 254 C 103 262, 99 285, 103 297 C 107 302, 133 302, 137 297 C 141 285, 137 262, 125 254 L 125 230" fill="none" stroke="#251307" strokeWidth="2.5" strokeLinejoin="round" />
          
          {/* Glass Rim Top */}
          <ellipse cx="120" cy="230" rx="7" ry="2" fill="none" stroke="#251307" strokeWidth="2" />
          
          {/* Beaker Glass Reflections */}
          <path d="M 107 268 C 103 277, 103 290, 107 296" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
          <path d="M 133 264 C 135 272, 135 285, 133 291" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
        </g>

        {/* ─── CENTER ARTIFACT: Open Spellbook & Writing Quill ─── */}
        <g className="spellbook-group">
          {/* Book Shadow */}
          <path d="M 125 315 C 180 300, 320 300, 375 315 L 350 322 C 300 312, 200 312, 150 322 Z" fill="#180a04" opacity="0.65" />

          {/* Book Cover */}
          <path d="M 135 287 L 135 304 C 180 287, 215 287, 250 316 L 250 299 C 215 270, 180 270, 135 287 Z" fill="#881337" stroke="#251307" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 365 287 L 365 304 C 320 287, 285 287, 250 316 L 250 299 C 285 270, 320 270, 365 287 Z" fill="#881337" stroke="#251307" strokeWidth="2" strokeLinejoin="round" />

          {/* Extra page thickness */}
          <path d="M 138 290 L 138 301 C 180 284, 215 284, 250 312 M 362 290 L 362 301 C 320 284, 285 284, 250 312" fill="none" stroke="#4c0519" strokeWidth="2.5" />

          {/* Open Pages (Beige Parchment) */}
          <path d="M 250 294 C 215 265, 180 265, 142 282 L 142 295 C 180 278, 215 278, 250 307 Z" fill="#faf5e6" stroke="#251307" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 250 294 C 285 265, 320 265, 358 282 L 358 295 C 320 278, 285 278, 250 307 Z" fill="#faf5e6" stroke="#251307" strokeWidth="2" strokeLinejoin="round" />

          {/* Spine center divide line */}
          <path d="M 250 294 L 250 307" stroke="#3b2311" strokeWidth="1.5" />

          {/* Written "Spell-Code" text lines (Abstract scribbles) */}
          <path d="M 152 277 Q 165 273, 185 276 T 215 273 M 152 284 Q 170 281, 195 284 T 225 282 M 156 291 Q 175 288, 205 291" fill="none" stroke="#6b533e" strokeWidth="1.5" strokeDasharray="6 3 2 3" strokeLinecap="round" />
          <path d="M 285 275 Q 310 272, 335 275 T 348 273 M 275 282 Q 295 279, 325 282 T 345 280 M 275 290 Q 300 287, 320 290 T 338 288" fill="none" stroke="#6b533e" strokeWidth="1.5" strokeDasharray="5 2 4 2 2 2" strokeLinecap="round" />

          {/* Little green plant sprout growing out of the book spine */}
          <path d="M 250 290 Q 248 276, 240 270 Q 247 274, 250 284" fill="#22c55e" stroke="#14532d" strokeWidth="1" />
          <path d="M 250 290 Q 254 274, 262 268 Q 255 274, 250 284" fill="#22c55e" stroke="#14532d" strokeWidth="1" />
          <circle cx="240" cy="270" r="1.5" fill="#a7f3d0" filter="drop-shadow(0 0 2px #34d399)" />
          <circle cx="262" cy="268" r="1.5" fill="#a7f3d0" filter="drop-shadow(0 0 2px #34d399)" />

          {/* Floating magical code rune particles rising from book */}
          <g className="floating-runes-group">
            <text x="210" y="255" className="floating-rune fr-1">&lt;/&gt;</text>
            <text x="265" y="245" className="floating-rune fr-2">&#123;..&#125;</text>
            <text x="185" y="260" className="floating-rune fr-3">λ</text>
            <text x="290" y="250" className="floating-rune fr-4">++</text>
            <text x="235" y="240" className="floating-rune fr-5">=&gt;</text>
          </g>

          {/* Inkwell */}
          <g className="inkwell-subgroup">
            <ellipse cx="218" cy="308" rx="8" ry="3.5" fill="#180a04" opacity="0.5" />
            <rect x="212" y="295" width="12" height="11" rx="2.2" fill="#374151" stroke="#251307" strokeWidth="1.5" />
            <ellipse cx="218" cy="295" rx="4.5" ry="1.5" fill="#111827" stroke="#251307" strokeWidth="1.2" />
            {/* White reflection shine */}
            <path d="M 214 298 L 214 303" stroke="#ffffff" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
          </g>

          {/* Magical Feather Quill (Wobbly writing animation) */}
          <g className="quill-pen-group">
            {/* The feather */}
            <path d="M 218 293 Q 223 250, 248 220 Q 235 255, 218 293 Z" fill="url(#quill-grad)" stroke="#251307" strokeWidth="1.5" className="quill-feather" />
            {/* The quill shaft / tip in inkpot */}
            <line x1="218" y1="293" x2="216" y2="299" stroke="#251307" strokeWidth="2.2" strokeLinecap="round" className="quill-feather" />
          </g>
        </g>

        {/* ─── RIGHT ARTIFACT: Interactive Crystal Ball Matrix ─── */}
        <g className="crystal-ball-group">
          {/* Stand Shadow */}
          <ellipse cx="380" cy="310" rx="28" ry="6" fill="#180a04" opacity="0.65" />

          {/* Golden Brass Claw Stand */}
          <path d="M 356 295 C 362 288, 398 288, 404 295 L 396 310 L 364 310 Z" fill="#d97706" stroke="#251307" strokeWidth="2" strokeLinejoin="round" />
          <ellipse cx="380" cy="293" rx="19" ry="4" fill="#b45309" stroke="#251307" strokeWidth="1.5" />
          {/* Base bottom rim */}
          <path d="M 358 308 Q 380 311, 402 308" fill="none" stroke="#92400e" strokeWidth="2.5" />

          {/* Glowing Crystal Sphere */}
          <circle cx="380" cy="242" r="38" fill="url(#crystal-glow)" stroke="#251307" strokeWidth="2.5" className="crystal-sphere" filter="url(#crystal-glow-filter)" />

          {/* Glowing Software Matrix Constellation (spinning network nodes) */}
          <g className="crystal-nodes">
            {/* Connective lines */}
            <line x1="365" y1="230" x2="380" y2="215" stroke="#fbcfe8" strokeWidth="1" opacity="0.6" />
            <line x1="380" y1="215" x2="398" y2="235" stroke="#fbcfe8" strokeWidth="1" opacity="0.6" />
            <line x1="398" y1="235" x2="385" y2="260" stroke="#fbcfe8" strokeWidth="1" opacity="0.6" />
            <line x1="385" y1="260" x2="360" y2="252" stroke="#fbcfe8" strokeWidth="1" opacity="0.6" />
            <line x1="360" y1="252" x2="365" y2="230" stroke="#fbcfe8" strokeWidth="1" opacity="0.6" />
            <line x1="380" y1="215" x2="385" y2="260" stroke="#fbcfe8" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2" />

            {/* Glowing Node dots */}
            <circle cx="365" cy="230" r="3" fill="#ffffff" filter="drop-shadow(0 0 3px #f472b6)" />
            <circle cx="380" cy="215" r="4.5" fill="#fef08a" filter="drop-shadow(0 0 4px #eab308)" />
            <circle cx="398" cy="235" r="3.5" fill="#ffffff" filter="drop-shadow(0 0 3px #a78bfa)" />
            <circle cx="385" cy="260" r="4" fill="#a5f3fc" filter="drop-shadow(0 0 4px #06b6d4)" />
            <circle cx="360" cy="252" r="2.5" fill="#ffffff" filter="drop-shadow(0 0 3px #f472b6)" />
          </g>

          {/* Glass Shiny Highlights */}
          <path d="M 354 230 A 32 32 0 0 1 406 230" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
          <circle cx="394" cy="222" r="3.5" fill="#ffffff" opacity="0.6" />
          <circle cx="388" cy="215" r="1.5" fill="#ffffff" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
};

export default MagicalDesk;
