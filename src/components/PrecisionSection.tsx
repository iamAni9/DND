import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LOGO_ICON =
  'https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/6870f623cf3df417ce45df05_icon%20logo%20eternacloud.png';

const LINE_GRADIENT =
  'linear-gradient(rgb(28, 78, 255), rgb(254, 136, 27) 0%, rgb(172, 36, 255) 25%, rgb(247, 159, 255) 50%, rgb(255, 214, 0) 66%, rgb(254, 136, 27) 84%, rgba(254, 136, 27, 0) 102%)';

const PILLARS = [
  { label: 'Discover',     items: ['understanding', 'the business'],     leftVw: 2.0,  bottomVw: 3.5,  leftPct: 2.0,  bottomPct: 11.0 },
  { label: 'Design',       items: ['creating the', 'user experience'],   leftVw: 15.2, bottomVw: 5.4,  leftPct: 18.2, bottomPct: 17.0 },
  { label: 'Develop',      items: ['building the', 'product'],           leftVw: 28.4, bottomVw: 7.3,  leftPct: 34.4, bottomPct: 23.0 },
  { label: 'Intelligence', items: ['adding AI', 'capabilities'],         leftVw: 41.6, bottomVw: 9.2,  leftPct: 50.6, bottomPct: 29.0 },
  { label: 'Integrate',    items: ['connecting', 'all systems'],         leftVw: 54.8, bottomVw: 11.1, leftPct: 66.8, bottomPct: 35.0 },
  { label: 'Scale',        items: ['deploying', 'and optimizing'],       leftVw: 68.0, bottomVw: 13.0, leftPct: 83.0, bottomPct: 46.0 },
];

const MOBILE_STEPS = [
  {
    step: "01",
    label: "Discover",
    color: "#6366f1",
    glowColor: "rgba(99, 102, 241, 0.15)",
    description: "Deep dive into business logic & user needs.",
    details: [
      "In-depth business goal alignment",
      "User persona & workflow mapping",
      "Technical requirements definition"
    ]
  },
  {
    step: "02",
    label: "Design",
    color: "#6366f1",
    glowColor: "rgba(99, 102, 241, 0.15)",
    description: "Creating premium, user-centric experiences.",
    details: [
      "High-fidelity UI/UX wireframes",
      "Interactive component prototyping",
      "Design system & branding guidelines"
    ]
  },
  {
    step: "03",
    label: "Develop",
    color: "#6366f1",
    glowColor: "rgba(99, 102, 241, 0.15)",
    description: "Building production-grade software products.",
    details: [
      "Clean, maintainable frontend & backend",
      "Scalable database architecture setup",
      "Robust API integration"
    ]
  },
  {
    step: "04",
    label: "Intelligence",
    color: "#6366f1",
    glowColor: "rgba(99, 102, 241, 0.15)",
    description: "Injecting cognitive and automated features.",
    details: [
      "Custom AI agents & LLM workflows",
      "Predictive analytics integrations",
      "Intelligent process automation"
    ]
  },
  {
    step: "05",
    label: "Integrate",
    color: "#6366f1",
    glowColor: "rgba(99, 102, 241, 0.15)",
    description: "Unifying systems for seamless data flow.",
    details: [
      "Syncing legacy software & modern APIs",
      "Unified data pipelines & orchestration",
      "Enterprise security compliance"
    ]
  },
  {
    step: "06",
    label: "Scale",
    color: "#6366f1",
    glowColor: "rgba(99, 102, 241, 0.15)",
    description: "Deploying and optimizing for massive growth.",
    details: [
      "Cloud native architecture & DevOps",
      "Real-time performance monitoring",
      "Continuous delivery & reliability tuning"
    ]
  }
];

export const PrecisionSection: React.FC = () => {
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileStickyRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!mobileContainerRef.current || !mobileStickyRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const len = path.getTotalLength();

    // Set initial path state
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    
    // Set initial card states: Card 0 expanded, others collapsed and dimmed
    gsap.set('.mobile-milestone-0', { opacity: 1, scale: 1, maxHeight: 320 });
    for (let i = 1; i < 6; i++) {
      gsap.set(`.mobile-milestone-${i}`, { opacity: 0.35, scale: 0.96, maxHeight: 52 });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mobileContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          pin: mobileStickyRef.current,
          pinSpacing: true,
          invalidateOnRefresh: true,
        }
      });

      // 1. Draw the path steadily over the entire timeline duration (0 to 5)
      tl.to(path, { strokeDashoffset: 0, ease: 'none', duration: 5 }, 0);

      const colors = Array(6).fill('#6366f1');
      const glows = Array(6).fill('rgba(99, 102, 241, 0.15)');

      // Helper function to animate active card shadows/borders
      const updateActiveCard = (index: number, active: boolean) => {
        const card = document.querySelector(`.mobile-milestone-${index}`) as HTMLDivElement;
        if (!card) return;
        if (active) {
          card.style.borderColor = colors[index];
          card.style.boxShadow = `0 10px 25px -5px rgba(26, 11, 84, 0.08), 0 0 20px ${glows[index]}`;
          
          // Show details elements smoothly
          const content = card.querySelector('.mobile-milestone-content') as HTMLDivElement;
          if (content) content.style.opacity = '1';
        } else {
          card.style.borderColor = 'rgba(0, 0, 0, 0.04)';
          card.style.boxShadow = 'none';
          
          // Hide details smoothly
          const content = card.querySelector('.mobile-milestone-content') as HTMLDivElement;
          if (content) content.style.opacity = '0';
        }
      };

      // Stage 0 Initial State
      tl.to('.mobile-node-0', { r: 10, opacity: 1, fill: colors[0], duration: 0.3 }, 0)
        .call(() => updateActiveCard(0, true), undefined, 0);

      // Transitions
      for (let i = 0; i < 5; i++) {
        const startOffset = i + 0.7;
        const endOffset = i + 1.0;
        const nextIndex = i + 1;

        // Collapse card i, deactivate node i
        tl.to(`.mobile-milestone-${i}`, { opacity: 0.35, scale: 0.96, maxHeight: 52, duration: 0.3 }, startOffset)
          .to(`.mobile-node-${i}`, { r: 6, opacity: 0.8, fill: '#64748b', duration: 0.3 }, startOffset)
          .call(() => updateActiveCard(i, false), undefined, startOffset)

          // Expand card i+1, activate node i+1
          .to(`.mobile-milestone-${nextIndex}`, { opacity: 1, scale: 1, maxHeight: 320, duration: 0.3 }, endOffset)
          .to(`.mobile-node-${nextIndex}`, { r: 10, opacity: 1, fill: colors[nextIndex], duration: 0.3 }, endOffset)
          .call(() => updateActiveCard(nextIndex, true), undefined, endOffset);
      }
    }, mobileContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="precision-section"
      style={{
        backgroundImage: 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260418_125638_553b96dc-a1fd-4b2b-81a9-ed7daa80006e.png&w=1280&q=85")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'clamp(48px, 8vw, 120px) clamp(16px, 4vw, 60px) clamp(48px, 5.56vw, 80px)',
        gap: 'clamp(32px, 4vw, 56px)',
      }}
    >
      {/* Block 1 — Header */}
      <div
        className="precision-header"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '36px',
        }}
      >
        {/* Badge pill */}
        <div
          style={{
            backgroundColor: 'rgb(249, 249, 249)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 'clamp(14px, 1.1vw, 18px)',
            fontWeight: 500,
            borderRadius: '36px',
            padding: 'clamp(8px, 0.9vw, 14px) clamp(12px, 1.25vw, 20px)',
            color: 'rgb(26, 11, 84)',
            whiteSpace: 'nowrap',
          }}
        >
          <svg
            width={19}
            height={18}
            viewBox="0 0 17 16"
            fill="none"
            style={{ flexShrink: 0 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#prec-clip)">
              <circle cx="8.5" cy="8" r="7" stroke="#c86fff" fill="none" />
              <path
                d="M9.5 11.5V10.5H7.5V11.5H9.5ZM7.5 14.5C7.5 15.0523 7.94772 15.5 8.5 15.5C9.05228 15.5 9.5 15.0523 9.5 14.5H7.5ZM8.5 11.5H7.5V14.5H8.5H9.5V11.5H8.5Z"
                fill="rgb(200, 111, 255)"
              />
              <path
                d="M12 7H11V9H12V7ZM15 9C15.5523 9 16 8.55228 16 8C16 7.44772 15.5523 7 15 7V9ZM12 8V9H15V8V7L12 7V8Z"
                fill="rgb(200, 111, 255)"
              />
              <path
                d="M5 9H6V7H5V9ZM2 7C1.44772 7 1 7.44772 1 8C1 8.55228 1.44772 9 2 9V7ZM5 8V7H2V8V9H5V8Z"
                fill="rgb(200, 111, 255)"
              />
              <path
                d="M7.5 4.5V5.5H9.5V4.5H7.5ZM9.5 1.5C9.5 0.947715 9.05228 0.5 8.5 0.5C7.94772 0.5 7.5 0.947715 7.5 1.5H9.5ZM8.5 4.5H9.5V1.5H8.5H7.5V4.5H8.5Z"
                fill="rgb(200, 111, 255)"
              />
            </g>
            <defs>
              <clipPath id="prec-clip">
                <rect width="16" height="16" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
          Why this works
        </div>

        {/* Heading + subtext wrapper */}
        <div
          className="precision-title-wrapper"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '900px',
            gap: '22px',
          }}
        >
          <h2
            className="precision-title"
            style={{
              fontSize: 'clamp(28px, 4vw, 56px)',
              fontWeight: 500,
              color: 'rgb(26, 11, 84)',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            <span className="sm:whitespace-nowrap" style={{ display: 'block' }}>
              One integrated technology ecosystem.
            </span>
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, rgb(43, 167, 255), rgb(202, 69, 255) 50%, rgb(254, 136, 27))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                paddingBottom: '0.3vw',
                display: 'block',
              }}
            >
              Engineering software that transforms businesses.
            </span>
          </h2>
          <p
            className="precision-desc"
            style={{
              fontSize: 'clamp(15px, 1.2vw, 20px)',
              color: 'rgb(71, 85, 105)',
              margin: 0,
            }}
          >
            We combine strategy, design, software engineering, artificial intelligence, cloud technologies, and DevOps into one seamless delivery process—helping organizations launch faster, operate smarter, and scale without limits.
          </p>
        </div>
      </div>

      {/* Block 2 — Pillars container */}
      <div
        className="w-full mx-auto max-w-[90%] lg:max-w-[82.292vw]"
      >
        {/* Desktop pillars (hidden lg:block) */}
        <div
          className="hidden lg:block"
          style={{
            position: 'relative',
            width: '82.292vw',
            height: '31.94vw',
            color: 'rgb(26, 11, 84)',
          }}
        >
          {PILLARS.map((pillar, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                bottom: `${pillar.bottomVw}vw`,
                left: `${pillar.leftVw}vw`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              {/* Chip */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: 'linear-gradient(135deg, rgb(255, 255, 255), rgba(255, 255, 255, 0.6))',
                  fontSize: '18px',
                  fontWeight: 500,
                  borderRadius: '20px',
                  paddingTop: '0.972vw',
                  paddingBottom: '0.972vw',
                  paddingLeft: '1.736vw',
                  paddingRight: '1.736vw',
                  whiteSpace: 'nowrap',
                  gap: '8px',
                }}
              >
                <img
                  src={LOGO_ICON}
                  alt=""
                  style={{
                    width: '1.111vw',
                    height: 'auto',
                    display: 'inline-block',
                  }}
                />
                {pillar.label}
              </div>

              {/* Line + items wrapper */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                {/* Items container */}
                <div
                  style={{
                    position: 'absolute',
                    top: '0.56vw',
                    left: '1.94vw',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    fontSize: '16px',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}
                >
                  {pillar.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        paddingTop: '0.69vw',
                        paddingBottom: '0.69vw',
                        paddingLeft: '1.04vw',
                        paddingRight: '1.04vw',
                        display: 'flex',
                        alignItems: 'flex-start',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Vertical gradient line */}
                <div
                  style={{
                    backgroundImage: LINE_GRADIENT,
                    width: '1px',
                    height: '14.24vw',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile & Tablet pillars (lg:hidden w-full) */}
        <div ref={mobileContainerRef} className="lg:hidden relative w-full" style={{ minHeight: '480vh' }}>
          
          <style dangerouslySetInnerHTML={{ __html: `
            @media (max-width: 1023px) {
              .precision-section {
                background-image: none !important;
                background: radial-gradient(at 0% 0%, rgba(200, 111, 255, 0.05) 0px, transparent 50%),
                            radial-gradient(at 100% 0%, rgba(59, 130, 246, 0.05) 0px, transparent 50%),
                            radial-gradient(at 50% 100%, rgba(245, 158, 11, 0.03) 0px, transparent 50%),
                            #ffffff !important;
              }
              .mobile-roadmap-container {
                display: flex;
                width: 100%;
                max-width: 480px;
                align-items: stretch;
                gap: 16px;
                height: 80vh;
              }
              .mobile-svg-col {
                width: 60px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .mobile-cards-col {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;
                padding: 10px 0;
              }
              .mobile-milestone {
                width: 100%;
                background: rgba(255, 255, 255, 0.8);
                border: 1px solid rgba(0, 0, 0, 0.04);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border-radius: 20px;
                padding: 12px 16px;
                opacity: 0.35;
                scale: 0.96;
                max-height: 52px;
                overflow: hidden;
                transition: max-height 0.4s cubic-bezier(0.25, 1, 0.5, 1),
                            opacity 0.4s ease,
                            scale 0.4s ease,
                            border-color 0.4s ease,
                            box-shadow 0.4s ease;
                text-align: left;
              }
              .mobile-milestone-content {
                opacity: 0;
                transition: opacity 0.3s ease;
                margin-top: 10px;
              }
            }
          ` }} />

          <div ref={mobileStickyRef} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4">
            
            <div className="mobile-roadmap-container">
              
              {/* SVG Panel on the left */}
              <div className="mobile-svg-col">
                <svg className="w-full h-full" viewBox="0 0 80 600" preserveAspectRatio="none">
                  <defs>
                    <filter id="glow-mobile" x="-30%" y="-10%" width="160%" height="120%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <linearGradient id="themePathGradMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  
                  {/* Background path track */}
                  <path d="M40,30 C60,84 20,84 40,138 C60,192 20,192 40,246 C60,300 20,300 40,354 C60,408 20,408 40,462 C60,516 20,516 40,570" fill="none" stroke="rgba(0, 0, 0, 0.04)" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* Animated path */}
                  <path ref={pathRef} d="M40,30 C60,84 20,84 40,138 C60,192 20,192 40,246 C60,300 20,300 40,354 C60,408 20,408 40,462 C60,516 20,516 40,570" fill="none" stroke="url(#themePathGradMobile)" strokeWidth="4.5" strokeLinecap="round" filter="url(#glow-mobile)" />
                  
                  {/* Circles */}
                  <circle className="mobile-node-0" cx="40" cy="30" r="6" fill="#64748b" opacity=".8" />
                  <circle className="mobile-node-1" cx="40" cy="138" r="6" fill="#64748b" opacity=".8" />
                  <circle className="mobile-node-2" cx="40" cy="246" r="6" fill="#64748b" opacity=".8" />
                  <circle className="mobile-node-3" cx="40" cy="354" r="6" fill="#64748b" opacity=".8" />
                  <circle className="mobile-node-4" cx="40" cy="462" r="6" fill="#64748b" opacity=".8" />
                  <circle className="mobile-node-5" cx="40" cy="570" r="6" fill="#64748b" opacity=".8" />
                </svg>
              </div>

              {/* Cards Panel on the right */}
              <div className="mobile-cards-col">
                {MOBILE_STEPS.map((step, idx) => (
                  <div
                    key={idx}
                    className={`mobile-milestone mobile-milestone-${idx}`}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: step.color,
                          backgroundColor: step.glowColor,
                          border: `1.5px solid ${step.color}`,
                          boxShadow: `0 0 8px ${step.color}20`,
                          flexShrink: 0,
                        }}
                      >
                        {step.step}
                      </div>

                      <div className="flex flex-col items-start justify-center">
                        <div className="flex items-center gap-1.5">
                          <span style={{ fontSize: '15px', fontWeight: 700, color: 'rgb(26, 11, 84)', letterSpacing: '-0.015em' }}>
                            {step.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Details content shown only when expanded */}
                    <div className="mobile-milestone-content">
                      <p style={{ fontSize: '12.5px', color: '#475569', margin: '0 0 10px 0', fontWeight: 500, lineHeight: 1.4 }}>
                        {step.description}
                      </p>

                      <div style={{ height: '1px', backgroundColor: 'rgba(26, 11, 84, 0.04)', margin: '6px 0', width: '100%' }} />

                      {/* Checklist details */}
                      <div className="flex flex-col gap-1.5 w-full mt-1.5">
                        {step.details.map((detail, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-start gap-2 text-[11.5px] text-slate-600 font-medium leading-relaxed"
                          >
                            <div
                              style={{
                                width: '15px',
                                height: '15px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid rgba(16, 185, 129, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '8px',
                                fontWeight: 'bold',
                                color: '#10b981',
                                marginTop: '2px',
                                flexShrink: 0,
                              }}
                            >
                              ✓
                            </div>
                            <span className="pt-[0.5px]">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
