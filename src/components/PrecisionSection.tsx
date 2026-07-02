import React from 'react';

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

export const PrecisionSection: React.FC = () => {
  return (
    <section
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
            style={{
              fontSize: 'clamp(15px, 1.2vw, 20px)',
              color: 'rgb(169, 151, 206)',
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
        <div
          className="lg:hidden relative w-full max-w-[440px] mx-auto h-[900px] select-none"
        >
          {/* Mobile Vertical Winding Connecting Curve SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="precision-mobile-curve-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c86fff" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <filter id="precision-mobile-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 12,6 C 88,12 88,20 88,24 C 12,28 12,37 12,42 C 88,46 88,55 88,60 C 12,64 12,73 12,78 C 88,82 88,90 88,94"
              fill="none"
              stroke="url(#precision-mobile-curve-grad)"
              strokeWidth="0.6"
              filter="url(#precision-mobile-glow)"
              strokeLinecap="round"
              className="opacity-70"
            />
          </svg>

          {PILLARS.map((pillar, index) => {
            const isRight = index % 2 !== 0;
            const y = index === 0 ? 6 : (index === 1 ? 24 : (index === 2 ? 42 : (index === 3 ? 60 : (index === 4 ? 78 : 94))));

            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: isRight ? 'auto' : '12%',
                  right: isRight ? '12%' : 'auto',
                  top: `${y}%`,
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isRight ? 'flex-end' : 'flex-start',
                }}
              >
                {/* Row for Circle + Chip */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: isRight ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    gap: '12px',
                    marginLeft: isRight ? 0 : '-5px',
                    marginRight: isRight ? '-5px' : 0,
                  }}
                >
                  {/* Node Circle */}
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: `2.5px solid ${index % 3 === 0 ? '#c86fff' : (index % 3 === 1 ? '#3b82f6' : '#f59e0b')}`,
                      boxShadow: `0 0 10px ${index % 3 === 0 ? '#c86fff' : (index % 3 === 1 ? '#3b82f6' : '#f59e0b')}`,
                      zIndex: 10,
                    }}
                  />

                  {/* Chip */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundImage: 'linear-gradient(135deg, rgb(255, 255, 255), rgba(255, 255, 255, 0.75))',
                      fontSize: '13px',
                      fontWeight: 500,
                      borderRadius: '16px',
                      padding: '6px 12px',
                      whiteSpace: 'nowrap',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(26, 11, 84, 0.05)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      color: 'rgb(26, 11, 84)',
                    }}
                  >
                    <img src={LOGO_ICON} alt="" style={{ width: 14, height: 'auto' }} />
                    {pillar.label}
                  </div>
                </div>

                {/* Items list */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    fontSize: '12px',
                    paddingLeft: isRight ? '0' : '17px',
                    paddingRight: isRight ? '17px' : '0',
                    paddingTop: '6px',
                    alignItems: isRight ? 'flex-end' : 'flex-start',
                  }}
                  className="text-slate-600 font-medium select-text"
                >
                  {pillar.items.map((item, idx) => (
                    <div key={idx} className="bg-white/50 backdrop-blur-[1px] px-2.5 py-1 rounded border border-white/20 shadow-[0_1px_4px_rgba(26,11,84,0.01)]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
