import React, { useState, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import '@/styles/adventure.css';

/* ───────── Step illustrations (clean vector SVGs) ───────── */
const ScrollQuill = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="process-svg">
    <path d="M25 25 C25 15, 45 15, 45 25 C45 35, 25 35, 25 45 L25 75 C25 85, 45 85, 45 75" />
    <path d="M45 25 L75 25 C85 25, 85 35, 75 35 L45 35" />
    <path d="M45 75 L75 75 C85 75, 85 65, 75 65 L45 65" />
    <path d="M75 35 L75 65" />
    <line x1="38" y1="45" x2="62" y2="45" strokeWidth="1.5" />
    <line x1="38" y1="53" x2="58" y2="53" strokeWidth="1.5" />
    <path d="M80 20 L52 62 C50 65, 46 68, 44 68 C44 68, 47 64, 50 62 L78 20 Z" fill="var(--accent-bg)" />
  </svg>
);

const BrowserPencil = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="process-svg">
    <rect x="15" y="20" width="70" height="48" rx="4" fill="var(--accent-bg)" />
    <line x1="15" y1="32" x2="85" y2="32" />
    <circle cx="22" cy="26" r="1.5" /><circle cx="28" cy="26" r="1.5" /><circle cx="34" cy="26" r="1.5" />
    <rect x="23" y="38" width="24" height="22" rx="2" />
    <line x1="54" y1="42" x2="77" y2="42" /><line x1="54" y1="48" x2="77" y2="48" /><line x1="54" y1="54" x2="68" y2="54" />
    <path d="M78 72 L65 85 L58 87 L60 80 L73 67 Z" />
  </svg>
);

const MagicWand = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="process-svg">
    <line x1="22" y1="78" x2="65" y2="35" strokeWidth="3.5" />
    <line x1="65" y1="35" x2="72" y2="28" strokeWidth="4" />
    <path d="M75 16 L77 22 L83 24 L77 26 L75 32 L73 26 L67 24 L73 22 Z" fill="var(--accent)" stroke="none" />
    <path d="M38 22 L40 25 L43 25 L41 27 L42 30 L38 28 L34 30 L35 27 L33 25 L36 25 Z" fill="var(--accent)" stroke="none" />
    <path d="M58 64 L59 66 L62 66 L60 67 L61 70 L58 68 L55 70 L56 67 L54 66 L57 66 Z" fill="var(--accent)" stroke="none" />
  </svg>
);

const CastleKey = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="process-svg">
    <path d="M15 80 L15 35 L28 35 L28 25 L38 25 L38 35 L62 35 L62 25 L72 25 L72 35 L85 35 L85 80" />
    <path d="M35 80 L35 55 C35 45, 65 45, 65 55 L65 80" fill="var(--accent-bg)" />
    <circle cx="50" cy="22" r="7" stroke="var(--accent)" strokeWidth="3" />
    <line x1="50" y1="29" x2="50" y2="52" stroke="var(--accent)" strokeWidth="3" />
    <path d="M50 40 L58 40" stroke="var(--accent)" strokeWidth="3" />
    <path d="M50 47 L58 47" stroke="var(--accent)" strokeWidth="3" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="deliverable-check-icon">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const STEPS = [
  {
    phase: 'Phase 01',
    title: 'Discovery & Inquiry',
    badge: 'Discovery',
    desc: 'We start by discussing your concept, goals, and business requirements to align expectations and build a solid technical roadmap.',
    Icon: BrowserPencil,
    deliverables: [
      'Deep-dive concept alignment & strategy session',
      'Technical feasibility & complexity analysis',
      'Comprehensive project roadmap & milestones proposal'
    ]
  },
  {
    phase: 'Phase 02',
    title: 'Strategy & Scope',
    badge: 'Strategy',
    desc: 'We map out the architecture, design blueprints, wireframe database schemas, and align on a 2026-ready modern tech stack.',
    Icon: ScrollQuill,
    deliverables: [
      'Sleek wireframe blueprints & UX content outline',
      'Scalable database schemas & dataflow mapping',
      'Vetted, high-performance tech stack architecture'
    ]
  },
  {
    phase: 'Phase 03',
    title: 'Development & Design',
    badge: 'Development',
    desc: 'Our team designs custom, high-end layouts and engineers clean, modular, and optimized code via fast iterative sprints.',
    Icon: MagicWand,
    deliverables: [
      'Bespoke, high-end visual UI design mockups',
      'Clean, modular, and optimized React codebase',
      'Rapid, iterative weekly builds with interactive feedback'
    ]
  },
  {
    phase: 'Phase 04',
    title: 'Launch & Integration',
    badge: 'Delivery',
    desc: 'We deploy your platform to live production, run detailed QA audits, and hand over the documentation and access keys.',
    Icon: CastleKey,
    deliverables: [
      'Continuous deployment setup (Vercel/Netlify/AWS)',
      'Rigorous cross-browser QA & lighthouse audit',
      'Developer handoff documentation & secure admin keys'
    ]
  }
];

const AdventureMap = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-playing cycle between process phases
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleStepSelect = (idx) => {
    setActiveStep(idx);
    // Pause auto-play temporarily so the user can inspect their chosen step
    setIsAutoPlaying(false);
  };

  const activeData = STEPS[activeStep];

  return (
    <section className="adventure-section" id="process" aria-labelledby="adventure-title">
      {/* Dynamic Background Flare */}
      <div className="process-ambient-flare" />
      
      <div className="adventure-header">
        <ScrollReveal delay={50}>
          <h2 id="adventure-title" className="adventure-title font-solid">
            Our Process
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="adventure-subtitle-line">
            How we take your concept from ideas to live production
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={250}>
        <div 
          className="process-dashboard"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Milestone cards (Left column on desktop) */}
          <div className="process-nav">
            {STEPS.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={idx}
                  onClick={() => handleStepSelect(idx)}
                  className={`process-nav-item ${isActive ? 'is-active' : ''}`}
                  aria-pressed={isActive}
                >
                  <div className="process-nav-item__indicator">
                    <div className="process-nav-item__indicator-dot" />
                    {idx < STEPS.length - 1 && <div className="process-nav-item__indicator-line" />}
                  </div>
                  
                  <div className="process-nav-item__card-body">
                    <span className="process-nav-item__number">0{idx + 1}</span>
                    <div className="process-nav-item__text-wrap">
                      <span className="process-nav-item__badge">{step.badge}</span>
                      <h3 className="process-nav-item__title font-solid">{step.title}</h3>
                    </div>
                  </div>

                  {/* Inline Mobile Details Panel (Accordion display) */}
                  {isActive && (
                    <div className="process-mobile-details">
                      <p className="process-mobile-details__desc">{step.desc}</p>
                      <div className="process-mobile-details__deliverables">
                        <span className="process-mobile-details__subtitle">Key Deliverables</span>
                        <ul className="process-mobile-details__list">
                          {step.deliverables.map((item, dIdx) => (
                            <li key={dIdx} className="process-mobile-details__item">
                              <CheckIcon />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Detail Showcase Panel (Right column on desktop) */}
          <div className="process-showcase" key={activeStep}>
            <div className="process-showcase__content">
              {/* Background watermark */}
              <div className="process-showcase__watermark">0{activeStep + 1}</div>
              
              <div className="process-showcase__layout">
                {/* Visual Icon display with pulsing rings */}
                <div className="process-showcase__visual">
                  <div className="process-showcase__icon-box">
                    <div className="process-showcase__icon-pulse" />
                    <div className="process-showcase__icon-inner">
                      {React.createElement(activeData.Icon)}
                    </div>
                  </div>
                </div>

                {/* Details text & deliverables */}
                <div className="process-showcase__details">
                  <span className="process-showcase__phase">{activeData.phase}</span>
                  <h3 className="process-showcase__title font-solid">{activeData.title}</h3>
                  <p className="process-showcase__desc">{activeData.desc}</p>
                  
                  <div className="process-showcase__deliverables">
                    <h4 className="process-showcase__deliverables-title font-marker">
                      Key Deliverables
                    </h4>
                    <ul className="process-showcase__deliverables-list">
                      {activeData.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="process-showcase__deliverable-item">
                          <CheckIcon />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default AdventureMap;
