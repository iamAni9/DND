import React from 'react';
import { motion } from 'motion/react';

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
    color: "#c86fff",
    glowColor: "rgba(200, 111, 255, 0.15)",
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
    color: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.15)",
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
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.15)",
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
    color: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.15)",
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
    color: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.15)",
    description: "Deploying and optimizing for massive growth.",
    details: [
      "Cloud native architecture & DevOps",
      "Real-time performance monitoring",
      "Continuous delivery & reliability tuning"
    ]
  }
];

export const PrecisionSection: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);

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
        <div className="lg:hidden relative w-full max-w-[480px] mx-auto px-4 py-8 flex flex-col items-center">
          {/* Mobile view background override, hide-scrollbar, and glow pulse keyframes */}
          <style dangerouslySetInnerHTML={{ __html: `
            @media (max-width: 1023px) {
              .precision-section {
                background-image: none !important;
                background: radial-gradient(at 0% 0%, rgba(200, 111, 255, 0.06) 0px, transparent 50%),
                            radial-gradient(at 100% 0%, rgba(59, 130, 246, 0.06) 0px, transparent 50%),
                            radial-gradient(at 50% 100%, rgba(245, 158, 11, 0.04) 0px, transparent 50%),
                            #ffffff !important;
              }
              .hide-scrollbar {
                scrollbar-width: none !important;
              }
              .hide-scrollbar::-webkit-scrollbar {
                display: none !important;
              }
            }
          ` }} />

          {/* Tabs selector above the card stack */}
          <div
            className="hide-scrollbar"
            style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '8px',
              width: '100%',
              paddingBottom: '16px',
              marginBottom: '12px',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {MOBILE_STEPS.map((step, idx) => {
              const isActive = idx === activeCardIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCardIndex(idx)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    backgroundColor: isActive ? step.color : 'rgba(255, 255, 255, 0.7)',
                    color: isActive ? '#FFFFFF' : 'rgb(26, 11, 84)',
                    boxShadow: isActive
                      ? `0 8px 16px -4px ${step.glowColor}, 0 4px 6px -2px ${step.glowColor}`
                      : '0 2px 4px rgba(0,0,0,0.03)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {step.step} {step.label}
                </button>
              );
            })}
          </div>

          {/* Card stack deck */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '320px',
            }}
          >
            {MOBILE_STEPS.map((step, index) => {
              const diff = index - activeCardIndex;
              const isActive = index === activeCardIndex;

              // Fan card offsets (rotation and translation fanned from bottom center)
              const rotateVal = isActive ? 0 : (diff < 0 ? -6 * Math.abs(diff) : 6 * diff);
              const xVal = isActive ? 0 : (diff < 0 ? -12 * Math.abs(diff) : 12 * diff);
              const yVal = isActive ? 0 : (diff < 0 ? 6 * Math.abs(diff) : 6 * diff);
              const scaleVal = isActive ? 1 : Math.max(0.85, 1 - 0.04 * Math.abs(diff));
              const opacityVal = isActive ? 1 : Math.max(0.4, 0.95 - 0.15 * Math.abs(diff));
              const zIndexVal = isActive ? 40 : (diff < 0 ? 10 + index : 30 - index);

              return (
                <motion.div
                  key={index}
                  onClick={() => {
                    if (isActive) {
                      setActiveCardIndex((prev) => (prev + 1) % 6);
                    } else {
                      setActiveCardIndex(index);
                    }
                  }}
                  animate={{
                    rotate: rotateVal,
                    x: xVal,
                    y: yVal,
                    scale: scaleVal,
                    opacity: opacityVal,
                    zIndex: zIndexVal,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 24,
                  }}
                  style={{
                    position: 'absolute',
                    left: '6%',
                    right: '6%',
                    top: 0,
                    width: '88%',
                    pointerEvents: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    gap: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: '24px',
                    padding: '20px 22px',
                    boxShadow: isActive
                      ? `0 15px 35px -10px rgba(26, 11, 84, 0.1), 0 20px 40px -15px ${step.glowColor}, 0 1px 2px rgba(0,0,0,0.02)`
                      : `0 5px 15px -5px rgba(26, 11, 84, 0.05), 0 1px 1px rgba(0,0,0,0.01)`,
                    border: isActive
                      ? `1.5px solid ${step.color}`
                      : '1px solid rgba(255, 255, 255, 0.6)',
                    cursor: 'pointer',
                    transformOrigin: 'bottom center',
                  }}
                >
                  {/* Card Header */}
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: step.color,
                        backgroundColor: step.glowColor,
                        border: `1.5px solid ${step.color}`,
                        boxShadow: `0 0 10px ${step.color}25`,
                        flexShrink: 0,
                      }}
                    >
                      {step.step}
                    </div>

                    <div className="flex flex-col items-start justify-center">
                      <div className="flex items-center gap-1.5">
                        <span style={{ fontSize: '17px', fontWeight: 700, color: 'rgb(26, 11, 84)', letterSpacing: '-0.015em' }}>
                          {step.label}
                        </span>
                        <img src={LOGO_ICON} alt="" style={{ width: 13, height: 'auto' }} />
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 600, color: step.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Process Phase
                      </span>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p style={{ fontSize: '13.5px', color: '#475569', margin: 0, fontWeight: 500, lineHeight: 1.45 }}>
                    {step.description}
                  </p>

                  <div style={{ height: '1.5px', backgroundColor: 'rgba(26, 11, 84, 0.05)', margin: '1px 0', width: '100%' }} />

                  {/* Checklist Items */}
                  <div className="flex flex-col gap-2 w-full">
                    {step.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-[12.5px] text-slate-600 font-medium leading-relaxed"
                      >
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid rgba(16, 185, 129, 0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '9px',
                            fontWeight: 'bold',
                            color: '#10b981',
                            marginTop: '2px',
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </div>
                        <span className="pt-[1px]">{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
