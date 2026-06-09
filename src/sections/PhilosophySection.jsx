import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import '@/styles/philosophy.css';
import WitchBanners from '../components/WitchBanners';

const PhilosophySection = () => {
  return (
    <section className="philosophy" id="about" aria-labelledby="phil-title">
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


// {/* Magic Forest Illustration Canvas */}
//       <div className="cosmic-canvas">
//         {/* Animated SVGs */}
//         <svg className="svg-overlay" viewBox="0 0 900 380">
//           <defs>
//             <style>
//               {`
//                 .sketch-line { stroke: var(--text-h); stroke-width: 2.5; fill: none; stroke-linecap: round; stroke-linejoin: round; }
//                 .sketch-fill { fill: var(--bg); stroke: var(--text-h); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
//                 .magic-fairy { transform-origin: 120px 116px; animation: fairyBob 4s infinite ease-in-out; }
//                 .fairy-wing-l { transform-origin: 114px 116px; animation: wingFlapL 0.15s infinite alternate ease-in-out; }
//                 .fairy-wing-r { transform-origin: 126px 116px; animation: wingFlapR 0.15s infinite alternate ease-in-out; }
//                 .fox-tail { transform-origin: 174px 306px; animation: tailWag 3s infinite ease-in-out alternate; }
                
//                 @keyframes fairyBob {
//                   0%, 100% { transform: translateY(0px) rotate(0deg); }
//                   50% { transform: translateY(-8px) rotate(3deg); }
//                 }
//                 @keyframes wingFlapL {
//                   0% { transform: scaleX(0.35); }
//                   100% { transform: scaleX(1); }
//                 }
//                 @keyframes wingFlapR {
//                   0% { transform: scaleX(0.35); }
//                   100% { transform: scaleX(1); }
//                 }
//                 @keyframes tailWag {
//                   0% { transform: rotate(-5deg); }
//                   100% { transform: rotate(12deg); }
//                 }
//               `}
//             </style>
//           </defs>

//           {/* Twinkling Stars */}
//           <g className="star-twinkle">
//             <path className="sketch-fill" d="M 60,60 L 63,70 L 73,70 L 65,76 L 68,86 L 60,80 L 52,86 L 55,76 L 47,70 L 57,70 Z" />
//           </g>
//           <g className="star-twinkle" style={{ animationDelay: '-1s' }}>
//             <path className="sketch-fill" d="M 830,70 L 833,80 L 843,80 L 835,86 L 838,96 L 830,90 L 822,96 L 825,86 L 817,80 L 827,80 Z" />
//           </g>
//           <g className="star-twinkle" style={{ animationDelay: '-2s' }}>
//             <path className="sketch-fill" d="M 100,240 L 102,247 L 110,247 L 103,251 L 105,259 L 100,254 L 95,259 L 97,251 L 90,247 L 98,247 Z" />
//           </g>

//           {/* Crescent Moon */}
//           <g className="star-twinkle" style={{ animationDelay: '-0.5s' }}>
//             <path className="sketch-fill" d="M 680,60 C 680,45, 665,35, 650,37 C 662,43, 664,60, 655,67 C 648,72, 638,71, 632,66 C 638,80, 658,87, 670,79 C 678,74, 680,67, 680,60 Z" />
//           </g>

//           {/* Wizard Tower Silhouette (Right background) */}
//           <g>
//             <ellipse cx="765" cy="315" rx="28" ry="6" fill="#180a04" opacity="0.3" />
//             {/* Tower Wall */}
//             <path className="sketch-fill" d="M 745,315 L 745,210 L 785,210 L 785,315 Z" fill="#201c2d" />
//             {/* Tower Roof */}
//             <polygon points="735,210 765,145 795,210" className="sketch-fill" fill="#4c1d95" />
//             {/* Tower Window glowing yellow */}
//             <circle cx="765" cy="240" r="5" fill="#fef08a" stroke="var(--text-h)" strokeWidth="1.5" />
//             {/* Light beam out of window */}
//             <polygon points="765,240 730,280 750,290" fill="#fef08a" opacity="0.2" />
//           </g>

//           {/* Forest Hills / Horizon */}
//           <path className="sketch-line" d="M -20,320 Q 230,270 480,320 T 920,300" />
//           <path className="sketch-line" d="M 350,320 Q 600,265 850,310" opacity="0.5" strokeDasharray="3 3" />

//           {/* Bioluminescent Glowing Mushrooms (Left Ground) */}
//           <g>
//             {/* Mush 1 */}
//             <path className="sketch-line" d="M 210,315 L 210,298" strokeWidth="3" />
//             <path className="sketch-fill" d="M 198,298 Q 210,288 222,298 Z" fill="#f472b6" style={{ filter: 'drop-shadow(0 0 4px #f472b6)' }} />
//             {/* Mush 2 */}
//             <path className="sketch-line" d="M 224,316 L 224,305" strokeWidth="2.5" />
//             <path className="sketch-fill" d="M 216,305 Q 224,297 232,305 Z" fill="#60a5fa" style={{ filter: 'drop-shadow(0 0 4px #60a5fa)' }} />
//           </g>

//           {/* Glowing Magic Crystal (Right Ground) */}
//           <g transform="translate(680, 290)">
//             <polygon points="10,20 18,5 26,20 18,30" className="sketch-fill" fill="#c084fc" style={{ filter: 'drop-shadow(0 0 5px #c084fc)' }} />
//             <polygon points="30,22 35,10 40,22 35,29" className="sketch-fill" fill="#f472b6" style={{ filter: 'drop-shadow(0 0 4px #f472b6)' }} />
//           </g>

//           {/* Cute sitting Fox looking up (Left Foreground) */}
//           <g>
//             {/* Fox Shadow */}
//             <ellipse cx="165" cy="316" rx="14" ry="4" fill="#180a04" opacity="0.5" />
//             {/* Body */}
//             <circle cx="165" cy="301" r="10" className="sketch-fill" fill="#f97316" />
//             {/* Head */}
//             <circle cx="165" cy="287" r="7.5" className="sketch-fill" fill="#f97316" />
//             {/* Ears */}
//             <polygon points="159,283 156,273 162,280" className="sketch-fill" fill="#f97316" />
//             <polygon points="171,283 174,273 168,280" className="sketch-fill" fill="#f97316" />
//             {/* Tail (Wagging) */}
//             <path className="sketch-line fox-tail" d="M 174,306 Q 188,302 184,292" strokeWidth="4.5" />
//             <path d="M 182,294 L 184,292 L 180,290 Z" fill="#ffffff" />
//             {/* Closed eyes and nose */}
//             <path d="M 161,287 Q 163,289 165,287 M 165,287 Q 167,289 169,287" fill="none" stroke="var(--text-h)" strokeWidth="1.2" />
//           </g>

//           {/* Wooden Signpost (Center holding the subtitle) */}
//           <g>
//             {/* Post */}
//             <rect x="444" y="160" width="12" height="150" className="sketch-fill" fill="#7c2d12" />
//             {/* Sign board backing shadow */}
//             <path d="M 256,154 Q 450,144 644,154 L 644,234 Q 450,244 256,234 Z" fill="none" stroke="var(--text-h)" strokeWidth="5" />
//             {/* Sign board */}
//             <path d="M 256,150 Q 450,140 644,150 L 644,230 Q 450,240 256,230 Z" className="sketch-fill" fill="#f5eed3" />
            
//             {/* Rope hangers from post hooks */}
//             <path d="M 330,150 L 330,135 M 570,150 L 570,135" className="sketch-line" strokeWidth="2" />
//             <path d="M 320,135 L 580,135" className="sketch-line" strokeWidth="2" strokeDasharray="3 3" />
            
//             {/* Decorative rivets on board */}
//             <circle cx="270" cy="190" r="3.5" className="sketch-fill" fill="#aa7c11" />
//             <circle cx="630" cy="190" r="3.5" className="sketch-fill" fill="#aa7c11" />
//           </g>

//           {/* Glowing Magic Stardust Trail */}
//           <path className="sketch-line animated-trail" d="M 125,120 Q 280,60 480,120 T 750,200" stroke="#ffd700" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 4px #ffd700)' }} />

//           {/* Flying Pixie / Fairy (Top Left) */}
//           <g className="magic-fairy">
//             {/* Aura */}
//             <circle cx="120" cy="116" r="14" fill="#fef08a" opacity="0.3" filter="drop-shadow(0 0 6px #fef08a)" />
//             {/* Wings */}
//             <path className="sketch-fill fairy-wing-l" d="M 114,116 C 100,100, 102,112, 114,114 Z" fill="#c084fc" />
//             <path className="sketch-fill fairy-wing-r" d="M 126,116 C 140,100, 138,112, 126,114 Z" fill="#c084fc" />
//             {/* Fairy Head */}
//             <circle cx="120" cy="116" r="6.5" className="sketch-fill" fill="#fef08a" />
//             {/* Wand trail spark */}
//             <polygon points="128,122 134,120 130,125 133,130 127,126" fill="#ffd700" />
//           </g>
//         </svg>

//         {/* Text centered inside the Canvas - positioned over the SVG Sign board */}
//         <div className="cosmic-canvas__content magic-canvas-content">
//           <h3 className="cosmic-canvas__subtitle font-marker magic-canvas-text">
//             Great Design is hard. We make it Easy
//           </h3>
//         </div>
//       </div>