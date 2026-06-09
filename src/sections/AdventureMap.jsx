import React, { useEffect, useRef, useState, useCallback } from 'react';
import RoughAnnotation from '@/components/RoughAnnotation';
import '@/styles/adventure.css';

/* ───────── Step illustrations (hand-drawn SVGs) ───────── */
const ScrollQuill = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="var(--text-h)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="draw-svg">
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
  <svg viewBox="0 0 100 100" fill="none" stroke="var(--text-h)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="draw-svg">
    <rect x="15" y="20" width="70" height="48" rx="4" fill="var(--accent-bg)" />
    <line x1="15" y1="32" x2="85" y2="32" />
    <circle cx="22" cy="26" r="1.5" /><circle cx="28" cy="26" r="1.5" /><circle cx="34" cy="26" r="1.5" />
    <rect x="23" y="38" width="24" height="22" rx="2" />
    <line x1="54" y1="42" x2="77" y2="42" /><line x1="54" y1="48" x2="77" y2="48" /><line x1="54" y1="54" x2="68" y2="54" />
    <path d="M78 72 L65 85 L58 87 L60 80 L73 67 Z" />
  </svg>
);

const MagicWand = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="var(--text-h)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="draw-svg">
    <line x1="22" y1="78" x2="65" y2="35" strokeWidth="3.5" />
    <line x1="65" y1="35" x2="72" y2="28" strokeWidth="4" stroke="var(--accent)" />
    <path d="M75 16 L77 22 L83 24 L77 26 L75 32 L73 26 L67 24 L73 22 Z" fill="var(--accent)" stroke="none" />
    <path d="M38 22 L40 25 L43 25 L41 27 L42 30 L38 28 L34 30 L35 27 L33 25 L36 25 Z" fill="var(--accent)" stroke="none" />
    <path d="M58 64 L59 66 L62 66 L60 67 L61 70 L58 68 L55 70 L56 67 L54 66 L57 66 Z" fill="var(--accent)" stroke="none" />
  </svg>
);

const CastleKey = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="var(--text-h)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="draw-svg">
    <path d="M15 80 L15 35 L28 35 L28 25 L38 25 L38 35 L62 35 L62 25 L72 25 L72 35 L85 35 L85 80" />
    <path d="M35 80 L35 55 C35 45, 65 45, 65 55 L65 80" fill="var(--accent-bg)" />
    <circle cx="50" cy="22" r="7" stroke="var(--accent)" strokeWidth="3" />
    <line x1="50" y1="29" x2="50" y2="52" stroke="var(--accent)" strokeWidth="3" />
    <path d="M50 40 L58 40" stroke="var(--accent)" strokeWidth="3" />
    <path d="M50 47 L58 47" stroke="var(--accent)" strokeWidth="3" />
  </svg>
);

/* ───────── DND Logo SVG ───────── */
const DNDLogo = () => (
  <svg viewBox="0 0 120 100" fill="none" className="cover-logo" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' }}>
    <path d="M30 20 L30 80" stroke="#e8c54c" strokeWidth="6" strokeLinecap="round" />
    <path d="M30 20 C30 20, 70 15, 70 40 C70 65, 30 60, 30 60" stroke="#e8c54c" strokeWidth="6" strokeLinecap="round" fill="none" />
    <text x="42" y="48" fontFamily="monospace" fontSize="18" fontWeight="bold" fill="#e8c54c">&lt;&gt;</text>
    <path d="M85 25 L87 31 L93 33 L87 35 L85 41 L83 35 L77 33 L83 31 Z" fill="#e8c54c" />
  </svg>
);

/* ───────── Page Corner Ornament ───────── */
const PageCorner = ({ style }) => (
  <svg style={{ position: 'absolute', width: '22px', height: '22px', zIndex: 6, pointerEvents: 'none', ...style }} viewBox="0 0 22 22">
    <path d="M 0,0 L 22,0 L 0,22 Z" fill="#e8c54c" stroke="#1a1a1a" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M 3,3 L 15,3 L 3,15 Z" fill="none" stroke="#1a1a1a" strokeWidth="0.8" opacity="0.5" />
    <circle cx="5" cy="5" r="1.2" fill="#1a1a1a" />
  </svg>
);

/* ───────── Page Sub-components ───────── */
const InsideCoverBack = () => (
  <div className="page-content" style={{ alignItems: 'center', textAlign: 'center' }}>
    <span className="pg-phase">Our Process</span>
    <h3 className="pg-title font-sketch" style={{ color: 'var(--accent)' }}>The Adventure Map</h3>
    <p className="pg-desc">Every great quest needs a plan. Here is ours.</p>
    <div className="pg-hint" style={{ marginTop: 'auto' }}>Click or use arrows to flip pages →</div>
  </div>
);

const IntroRight = () => (
  <div className="page-content">
    <h3 className="pg-title font-sketch" style={{ fontSize: 'clamp(12px, 3.5cqw, 20px)', lineHeight: 1.3 }}>
      How we take your concept from a rumor in a tavern to a legendary live product.
    </h3>
    <p className="pg-desc" style={{ marginTop: '2cqw' }}>
      Every great digital quest requires a map. Here is how we turn your vision into high-performance, custom reality.
    </p>
    <div className="pg-hint">Flip to begin the journey →</div>
  </div>
);

const StepLeft = ({ phase, title, badge }) => (
  <div className="page-content">
    <span className="pg-phase">{phase}</span>
    <h3 className="pg-title font-sketch">
      <RoughAnnotation type="underline" color="rgba(170, 59, 255, 0.3)" strokeWidth={2.5} show={true}>
        {title}
      </RoughAnnotation>
    </h3>
    <span className="pg-badge">{badge}</span>
  </div>
);

const StepRight = ({ description, Illustration }) => (
  <div className="page-content">
    <p className="pg-desc">{description}</p>
    <div className="pg-illustration"><Illustration /></div>
  </div>
);

const OutroLeft = () => (
  <div className="page-content">
    <span className="pg-phase">Ready to Start?</span>
    <h3 className="pg-title font-sketch">Your Quest Awaits</h3>
    <p className="pg-desc" style={{ marginBottom: '5%' }}>
      We have the tools, the experience, and the spells to craft your digital platform.
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'Shadows Into Light', fontSize: 'clamp(11px, 2.6cqw, 18px)', marginTop: 'auto', color: 'var(--text-h)', fontWeight: 'bold' }}>
      <div>✓ Budget & timeline alignment</div>
      <div>✓ Interactive blueprints</div>
      <div>✓ Staging live portal</div>
      <div>✓ Handover of kingdom keys</div>
    </div>
  </div>
);

const OutroRight = () => (
  <div className="page-content" style={{ alignItems: 'center', textAlign: 'center', gap: '2cqw' }}>
    <img src="/dnd logo with text.png" alt="DevNextDoor Logo" style={{ width: 'clamp(100px, 24cqw, 190px)', height: 'auto', marginBottom: '2cqw', objectFit: 'contain' }} />
    <p className="pg-desc">
      Ready to craft your digital legend? Let's take your concept from a rumor in a tavern to a live product.
    </p>
    <a href="#contact" className="book-nav-btn" style={{ width: 'auto', padding: '0 20px', borderRadius: '20px', textDecoration: 'none', height: '40px', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto' }}>
      Send scroll ✉
    </a>
  </div>
);

/* ═══════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════ */
const TOTAL_LEAVES = 7; // Leaf 0 to Leaf 6

const AdventureMap = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const flipbookRef = useRef(null);

  // Manage flipping state timing to optimize rendering
  useEffect(() => {
    setIsFlipping(true);
    const timer = setTimeout(() => {
      setIsFlipping(false);
    }, 650); // matches CSS flip duration
    return () => clearTimeout(timer);
  }, [currentPage]);

  const goForward = useCallback(() => {
    if (currentPage < TOTAL_LEAVES) {
      setLastPage(currentPage);
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage]);

  const goBackward = useCallback(() => {
    if (currentPage > 0) {
      setLastPage(currentPage);
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const goToPage = useCallback((p) => {
    const pageTarget = Math.max(0, Math.min(p, TOTAL_LEAVES));
    if (pageTarget !== currentPage) {
      setLastPage(currentPage);
      setCurrentPage(pageTarget);
    }
  }, [currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') goForward();
      if (e.key === 'ArrowLeft') goBackward();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goForward, goBackward]);

  const getZIndex = (leafIndex) => {
    const isFlipped = leafIndex < currentPage;
    return isFlipped ? leafIndex + 1 : TOTAL_LEAVES - leafIndex;
  };

  const getLeafStyle = (leafIndex) => {
    const isFlipped = leafIndex < currentPage;
    const isFlippingLeaf = isFlipping && leafIndex === Math.min(lastPage, currentPage);
    const leafZIndex = isFlippingLeaf ? 100 : getZIndex(leafIndex);
    return {
      '--leaf-rotate': `${isFlipped ? -180 : 0}deg`,
      '--leaf-z-index': leafZIndex,
    };
  };

  const getBookStyle = () => {
    let translateVal = '0%';
    if (currentPage === 0) {
      translateVal = '-50%';
    } else if (currentPage === TOTAL_LEAVES) {
      translateVal = '50%';
    }
    return {
      '--book-translate': translateVal,
    };
  };

  const getShadowStyle = () => {
    const isClosed = currentPage === 0 || currentPage === TOTAL_LEAVES;
    return {
      '--shadow-scale': isClosed ? 0.5 : 1.0,
    };
  };

  return (
    <section className="adventure-section" id="process" aria-labelledby="adventure-title">
      <div className="adventure-header">
        <ScrollRevealInline delay={50}>
          <h2 id="adventure-title" className="adventure-title font-sketch">
            The Adventure Map
          </h2>
        </ScrollRevealInline>
        <ScrollRevealInline delay={150}>
          <p className="adventure-subtitle-line">
            How we take your concept from a rumor to reality
          </p>
        </ScrollRevealInline>
      </div>

      <div className="flipbook-scene">
        <div className={`flipbook ${isFlipping ? 'flipping' : ''}`} style={getBookStyle()} ref={flipbookRef}>
          <div className="book-under-shadow" style={getShadowStyle()} />

          {/* Static left page background (only visible when book is open/opening) */}
          <div className="book-left-bg" style={{ opacity: currentPage > 0 && currentPage < TOTAL_LEAVES ? 1 : 0, transition: 'opacity 0.4s ease' }} />

          {/* ── Leaf 0: Front Cover → Inside Cover Back ── */}
          <div
            className="leaf"
            style={getLeafStyle(0)}
            onClick={currentPage > 0 ? goBackward : goForward}
          >
            <div className="leaf-face cover-front-face leaf-front">
              <div className="cover-spine-strip">
                <div className="spine-band" style={{ top: '18%' }} />
                <div className="spine-band" style={{ top: '50%' }} />
                <div className="spine-band" style={{ top: '82%' }} />
              </div>
              <div className="cover-overlay-container" />
            </div>
            <div className="leaf-face paper-page-face leaf-back">
              <PageCorner style={{ top: '6px', left: '6px' }} />
              <PageCorner style={{ top: '6px', right: '6px', transform: 'rotate(90deg)' }} />
              <PageCorner style={{ bottom: '6px', right: '6px', transform: 'rotate(180deg)' }} />
              <PageCorner style={{ bottom: '6px', left: '6px', transform: 'rotate(270deg)' }} />
              <InsideCoverBack />
            </div>
          </div>

          {/* ── Leaf 1: Intro Right → Step 1 Left ── */}
          <div
            className="leaf"
            style={getLeafStyle(1)}
            onClick={currentPage > 1 ? goBackward : goForward}
          >
            <div className="leaf-face paper-page-face leaf-front">
              <PageCorner style={{ top: '6px', left: '6px' }} />
              <PageCorner style={{ top: '6px', right: '6px', transform: 'rotate(90deg)' }} />
              <PageCorner style={{ bottom: '6px', right: '6px', transform: 'rotate(180deg)' }} />
              <PageCorner style={{ bottom: '6px', left: '6px', transform: 'rotate(270deg)' }} />
              <IntroRight />
            </div>
            <div className="leaf-face paper-page-face leaf-back">
              <PageCorner style={{ top: '6px', left: '6px' }} />
              <PageCorner style={{ top: '6px', right: '6px', transform: 'rotate(90deg)' }} />
              <PageCorner style={{ bottom: '6px', right: '6px', transform: 'rotate(180deg)' }} />
              <PageCorner style={{ bottom: '6px', left: '6px', transform: 'rotate(270deg)' }} />
              <StepLeft phase="Step 1 · Discovery" title="Gathering the Party" badge="Scroll of Agreement" />
            </div>
          </div>

          {/* ── Leaf 2: Step 1 Right → Step 2 Left ── */}
          <div
            className="leaf"
            style={getLeafStyle(2)}
            onClick={currentPage > 2 ? goBackward : goForward}
          >
            <div className="leaf-face paper-page-face leaf-front">
              <PageCorner style={{ top: '6px', left: '6px' }} />
              <PageCorner style={{ top: '6px', right: '6px', transform: 'rotate(90deg)' }} />
              <PageCorner style={{ bottom: '6px', right: '6px', transform: 'rotate(180deg)' }} />
              <PageCorner style={{ bottom: '6px', left: '6px', transform: 'rotate(270deg)' }} />
              <StepRight
                description="We align on your budget, timeframe, and features. We sign a scroll of agreement to seal our alliance."
                Illustration={ScrollQuill}
              />
            </div>
            <div className="leaf-face paper-page-face leaf-back">
              <PageCorner style={{ top: '6px', left: '6px' }} />
              <PageCorner style={{ top: '6px', right: '6px', transform: 'rotate(90deg)' }} />
              <PageCorner style={{ bottom: '6px', right: '6px', transform: 'rotate(180deg)' }} />
              <PageCorner style={{ bottom: '6px', left: '6px', transform: 'rotate(270deg)' }} />
              <StepLeft phase="Step 2 · Design" title="Drawing the Blueprints" badge="Interactive Layouts" />
            </div>
          </div>

          {/* ── Leaf 3: Step 2 Right → Step 3 Left ── */}
          <div
            className="leaf"
            style={getLeafStyle(3)}
            onClick={currentPage > 3 ? goBackward : goForward}
          >
            <div className="leaf-face paper-page-face leaf-front">
              <PageCorner style={{ top: '6px', left: '6px' }} />
              <PageCorner style={{ top: '6px', right: '6px', transform: 'rotate(90deg)' }} />
              <PageCorner style={{ bottom: '6px', right: '6px', transform: 'rotate(180deg)' }} />
              <PageCorner style={{ bottom: '6px', left: '6px', transform: 'rotate(270deg)' }} />
              <StepRight
                description="We sketch interactive wireframes and high-fidelity design mockups. You approve the exact aesthetic layout before code is forged."
                Illustration={BrowserPencil}
              />
            </div>
            <div className="leaf-face paper-page-face leaf-back">
              <PageCorner style={{ top: '6px', left: '6px' }} />
              <PageCorner style={{ top: '6px', right: '6px', transform: 'rotate(90deg)' }} />
              <PageCorner style={{ bottom: '6px', right: '6px', transform: 'rotate(180deg)' }} />
              <PageCorner style={{ bottom: '6px', left: '6px', transform: 'rotate(270deg)' }} />
              <StepLeft phase="Step 3 · Development" title="Forging the Code" badge="Live Demo Portals" />
            </div>
          </div>

          {/* ── Leaf 4: Step 3 Right → Step 4 Left ── */}
          <div
            className="leaf"
            style={getLeafStyle(4)}
            onClick={currentPage > 4 ? goBackward : goForward}
          >
            <div className="leaf-face paper-page-face leaf-front">
              <PageCorner style={{ top: '6px', left: '6px' }} />
              <PageCorner style={{ top: '6px', right: '6px', transform: 'rotate(90deg)' }} />
              <PageCorner style={{ bottom: '6px', right: '6px', transform: 'rotate(180deg)' }} />
              <PageCorner style={{ bottom: '6px', left: '6px', transform: 'rotate(270deg)' }} />
              <StepRight
                description="We build clean, responsive, high-performance code. We provide private staging URLs so you can watch your product come to life and test it in real time."
                Illustration={MagicWand}
              />
            </div>
            <div className="leaf-face paper-page-face leaf-back">
              <PageCorner style={{ top: '6px', left: '6px' }} />
              <PageCorner style={{ top: '6px', right: '6px', transform: 'rotate(90deg)' }} />
              <PageCorner style={{ bottom: '6px', right: '6px', transform: 'rotate(180deg)' }} />
              <PageCorner style={{ bottom: '6px', left: '6px', transform: 'rotate(270deg)' }} />
              <StepLeft phase="Step 4 · Deploy" title="Launching the Quest" badge="Security Spells" />
            </div>
          </div>

          {/* ── Leaf 5: Step 4 Right → Outro Left ── */}
          <div
            className="leaf"
            style={getLeafStyle(5)}
            onClick={currentPage > 5 ? goBackward : goForward}
          >
            <div className="leaf-face paper-page-face leaf-front">
              <PageCorner style={{ top: '6px', left: '6px' }} />
              <PageCorner style={{ top: '6px', right: '6px', transform: 'rotate(90deg)' }} />
              <PageCorner style={{ bottom: '6px', right: '6px', transform: 'rotate(180deg)' }} />
              <PageCorner style={{ bottom: '6px', left: '6px', transform: 'rotate(270deg)' }} />
              <StepRight
                description="We launch your platform, configure domains, verify SSL security spells, and hand over the keys to your new digital kingdom."
                Illustration={CastleKey}
              />
            </div>
            <div className="leaf-face paper-page-face leaf-back">
              <PageCorner style={{ top: '6px', left: '6px' }} />
              <PageCorner style={{ top: '6px', right: '6px', transform: 'rotate(90deg)' }} />
              <PageCorner style={{ bottom: '6px', right: '6px', transform: 'rotate(180deg)' }} />
              <PageCorner style={{ bottom: '6px', left: '6px', transform: 'rotate(270deg)' }} />
              <OutroLeft />
            </div>
          </div>

          {/* ── Leaf 6: Outro Right → Back Cover Back ── */}
          <div
            className="leaf"
            style={getLeafStyle(6)}
            onClick={currentPage > 6 ? goBackward : goForward}
          >
            <div className="leaf-face paper-page-face leaf-front">
              <PageCorner style={{ top: '6px', left: '6px' }} />
              <PageCorner style={{ top: '6px', right: '6px', transform: 'rotate(90deg)' }} />
              <PageCorner style={{ bottom: '6px', right: '6px', transform: 'rotate(180deg)' }} />
              <PageCorner style={{ bottom: '6px', left: '6px', transform: 'rotate(270deg)' }} />
              <OutroRight />
            </div>
            <div className="leaf-face cover-back-face">
              <div className="cover-spine-strip">
                <div className="spine-band" style={{ top: '18%' }} />
                <div className="spine-band" style={{ top: '50%' }} />
                <div className="spine-band" style={{ top: '82%' }} />
              </div>
              <div className="back-cover-body">
                <div className="back-cover-emblem">
                  <svg viewBox="0 0 100 100" fill="none" stroke="#e8c54c" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" style={{ width: '60%', height: '60%' }}>
                    <path d="M30 40 L30 80 L70 80 L70 40 Z" />
                    <path d="M50 50 L50 65" />
                    <circle cx="50" cy="50" r="4" fill="#e8c54c" />
                    <path d="M35 40 L35 25 C35 15, 65 15, 65 25 L65 40" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="book-nav">
        <button className="book-nav-btn" onClick={goBackward} disabled={currentPage === 0} aria-label="Previous page">
          ←
        </button>
        <div className="book-nav-dots">
          {Array.from({ length: TOTAL_LEAVES + 1 }).map((_, i) => (
            <button
              key={i}
              className={`book-nav-dot ${currentPage === i ? 'active' : ''}`}
              onClick={() => goToPage(i)}
              aria-label={`Go to page ${i}`}
            />
          ))}
        </div>
        <button className="book-nav-btn" onClick={goForward} disabled={currentPage === TOTAL_LEAVES} aria-label="Next page">
          →
        </button>
      </div>

      {/* Hand-drawn SVG displacement filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="sketchy-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </section>
  );
};

/* ─── Inline ScrollReveal (lightweight, no separate import needed) ─── */
const ScrollRevealInline = ({ children, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

export default AdventureMap;
