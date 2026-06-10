import React from 'react';
import '@/styles/sketchCube.css';

const renderIcon = (text) => {
  const normalizedText = text.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim().toLowerCase();
  switch (normalizedText) {
    case 'ai agents':
      return (
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M50,28 L50,16" />
          <circle cx="50" cy="12" r="4" fill="currentColor" />
          <rect x="24" y="28" width="52" height="46" rx="10" strokeWidth="4" />
          <circle cx="40" cy="48" r="3" fill="currentColor" stroke="none" />
          <circle cx="60" cy="48" r="3" fill="currentColor" stroke="none" />
          <path d="M42,62 L58,62" strokeWidth="3.5" />
          <rect x="18" y="44" width="6" height="14" rx="2" fill="currentColor" stroke="none" />
          <rect x="76" y="44" width="6" height="14" rx="2" fill="currentColor" stroke="none" />
        </g>
      );
    case 'saas programs':
      return (
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="20" y="25" width="60" height="50" rx="8" />
          <line x1="20" y1="38" x2="80" y2="38" />
          <circle cx="29" cy="31" r="2.5" fill="currentColor" stroke="none" />
          <circle cx="36" cy="31" r="2.5" fill="currentColor" stroke="none" />
          <circle cx="43" cy="31" r="2.5" fill="currentColor" stroke="none" />
          <line x1="42" y1="38" x2="42" y2="75" strokeWidth="3.5" />
          <line x1="50" y1="48" x2="72" y2="48" strokeWidth="3.5" />
          <line x1="50" y1="58" x2="66" y2="58" strokeWidth="3.5" />
        </g>
      );
    case 'websites':
      return (
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <circle cx="50" cy="50" r="32" />
          <ellipse cx="50" cy="50" rx="12" ry="32" />
          <line x1="18" y1="50" x2="82" y2="50" />
          <path d="M 22,34 C 32,42 68,42 78,34" />
          <path d="M 22,66 C 32,58 68,58 78,66" />
        </g>
      );
    case 'mobile apps':
      return (
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="28" y="18" width="44" height="64" rx="8" />
          <line x1="44" y1="24" x2="56" y2="24" strokeWidth="3" />
          <line x1="46" y1="75" x2="54" y2="75" strokeWidth="3.5" />
          <rect x="34" y="30" width="32" height="38" rx="2" strokeWidth="3" />
        </g>
      );
    case 'api platforms':
      return (
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <circle cx="50" cy="50" r="10" fill="currentColor" />
          <path d="M 50,50 L 25,25" />
          <path d="M 50,50 L 25,75" />
          <path d="M 50,50 L 78,50" />
          <circle cx="25" cy="25" r="6" fill="#ffffff" strokeWidth="3.5" />
          <circle cx="25" cy="75" r="6" fill="#ffffff" strokeWidth="3.5" />
          <circle cx="78" cy="50" r="6" fill="#ffffff" strokeWidth="3.5" />
        </g>
      );
    case 'automations':
    default:
      return (
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <circle cx="42" cy="42" r="13" />
          <path d="M42,24 L42,28 M42,56 L42,60 M24,42 L28,42 M56,42 L60,42 M29,29 L32,32 M52,52 L55,55 M29,55 L32,52 M52,29 L55,32" strokeWidth="4" />
          <circle cx="62" cy="62" r="9" />
          <path d="M62,49 L62,53 M62,71 L62,75 M49,62 L53,62 M71,62 L75,62" strokeWidth="3.5" />
        </g>
      );
  }
};

const getTechIcons = (text) => {
  const normalizedText = text.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim().toLowerCase();
  switch (normalizedText) {
    case 'ai agents':
      return [
        {
          name: 'OpenAI',
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" style={{color: '#10a37f'}}>
              <path d="M21.3 10.3a3.3 3.3 0 0 0-.6-2.1c-.5-.7-1.3-1.2-2.2-1.4a3.3 3.3 0 0 0-.5-1.8c-.5-.8-1.2-1.3-2.1-1.5a3.3 3.3 0 0 0-1.7-.5 3.3 3.3 0 0 0-2 .6 3.3 3.3 0 0 0-1.9-.6c-.9 0-1.7.3-2.3.9A3.3 3.3 0 0 0 6 5.3c-.8.5-1.3 1.2-1.5 2.1a3.3 3.3 0 0 0-1.8.5c-.8.5-1.3 1.2-1.5 2.1A3.3 3.3 0 0 0 .6 12a3.3 3.3 0 0 0 .6 2.1c.5.7 1.3 1.2 2.2 1.4a3.3 3.3 0 0 0 .5 1.8c.5.8 1.2 1.3 2.1 1.5a3.3 3.3 0 0 0 1.7.5c.8 0 1.5-.2 2.1-.6a3.3 3.3 0 0 0 1.9.6c.9 0 1.7-.3 2.3-.9a3.3 3.3 0 0 0 2-1.4c.8-.5 1.3-1.2 1.5-2.1a3.3 3.3 0 0 0 1.8-.5c.8-.5 1.3-1.2 1.5-2.1a3.3 3.3 0 0 0 .5-1.7c0-.8-.2-1.5-.6-2.1zM12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
          )
        },
        {
          name: 'Claude AI',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#d97753" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 20L12 4L20 20" />
              <path d="M8 14H16" />
            </svg>
          )
        },
        {
          name: 'Python',
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" style={{color: '#3776ab'}}>
              <path d="M11.9 2c-2.8 0-4.8.2-5.7 1-.9.7-1 1.8-1 4h2.2v.6H4.2c-2.2 0-3.2.3-3.9 1.2S-.1 11.2-.1 14s.3 4.2 1 5c.8.9 1.8 1 4 1h1.5v-2.2c0-1.8.8-3.4 2.2-3.4h4.3c1.5 0 2.2-.6 2.2-2.2V9.8c0-1.8-.8-3.4-2.2-3.4H9.7v2.2c0 1.2-.7 2.2-2.2 2.2H5.3c-.9 0-1.5-.6-1.5-1.5V4.7c0-.9.6-1.7 1.5-1.7h6.6c2.8 0 4.8.2 5.7 1 .9.7 1 1.8 1 4h-2.2v-.6h3.2c2.2 0 3.2-.3 3.9-1.2s.4-2.4.4-5.2-.3-4.2-1-5c-.8-.9-1.8-1-4-1H11.9z"/>
            </svg>
          )
        },
        {
          name: 'PyTorch',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#ee4c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          )
        }
      ];
    case 'saas programs':
      return [
        {
          name: 'React',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="2">
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
              <circle cx="12" cy="12" r="1.5" fill="#61dafb" />
            </svg>
          )
        },
        {
          name: 'Node.js',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#339933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
              <path d="M12 22V12" />
              <path d="M2 7l10 5 10-5" />
            </svg>
          )
        },
        {
          name: 'Database',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#4479a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
            </svg>
          )
        },
        {
          name: 'TypeScript',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#3178c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 8H16M12 8V18M17 10c1-1 2-1 2 1s-1 2-2 2-2 1-2 2 1 1 2 1" />
            </svg>
          )
        }
      ];
    case 'websites':
      return [
        {
          name: 'HTML5',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#e34f26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 2l1.5 17L12 22l6.5-3L20 2H4z" />
              <path d="M12 6H8.5l.5 4h3m0 0H15.5l-.5 4.5-3 1-3-1" />
            </svg>
          )
        },
        {
          name: 'CSS3',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#1572b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 2l1.5 17L12 22l6.5-3L20 2H4z" />
              <path d="M12 6H8.5l1 8 2.5 1 2.5-1 .5-4.5H9" />
            </svg>
          )
        },
        {
          name: 'Tailwind CSS',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3c-1.2 0-2.4.6-3.2 1.5C7 6.2 7 8.5 8.5 10c1.5 1.5 3.8 1.5 5 0 1.2-1.2 1.2-3.5 0-5C12.7 4.2 12.3 3 12 3z" />
              <path d="M12 21c1.2 0 2.4-.6 3.2-1.5 1.8-1.7 1.8-4 0-5.5-1.5-1.5-3.8-1.5-5 0-1.2 1.2-1.2 3.5 0 5 .8.8 1.2 2 1.8 2z" />
            </svg>
          )
        },
        {
          name: 'Vite',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#646cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L3 9h9l-1 13 10-11h-9l1-10z" />
            </svg>
          )
        }
      ];
    case 'mobile apps':
      return [
        {
          name: 'iOS App',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c-3.5 0-6.5-2.5-6.5-6.5S8.5 9 12 9s6.5 2.5 6.5 6.5S15.5 22 12 22z" />
              <path d="M12 9c.5-2 2-3.5 4-3.5" />
            </svg>
          )
        },
        {
          name: 'Android',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#3ddc84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10h16M7 10V5a2 2 0 0 1 4 0v5M13 10V5a2 2 0 0 1 4 0v5" />
              <rect x="4" y="10" width="16" height="10" rx="2" />
            </svg>
          )
        },
        {
          name: 'Flutter',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#02569b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2L6 10l8 8" />
              <path d="M19 7l-5 5 5 5" />
            </svg>
          )
        },
        {
          name: 'Swift',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#f05138" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 17l6-6-6-6M20 19h-8" />
            </svg>
          )
        }
      ];
    case 'api platforms':
      return [
        {
          name: 'GraphQL',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#e10098" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" />
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="8" x2="22" y2="16" />
              <line x1="2" y1="16" x2="22" y2="8" />
            </svg>
          )
        },
        {
          name: 'Postman',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#ff6c37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5L12 22l7.5-5.5V7.5L12 2 4.5 7.5z" />
              <path d="M12 2v20" />
            </svg>
          )
        },
        {
          name: 'FastAPI',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          )
        },
        {
          name: 'REST API',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#fcb900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="8" width="6" height="8" rx="1" />
              <path d="M9 10h6M11 4v4M13 4v4M12 16v4" />
            </svg>
          )
        }
      ];
    case 'automations':
    default:
      return [
        {
          name: 'Zapier',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#ff4f00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" />
            </svg>
          )
        },
        {
          name: 'Make.com',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#730df8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="18" cy="18" r="3" />
              <path d="M9 12h3M12 12l3-3M12 12l3 3" />
            </svg>
          )
        },
        {
          name: 'GitHub Actions',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#24292e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <path d="M6 9v9a3 3 0 0 0 3 3h6" />
            </svg>
          )
        },
        {
          name: 'CRON Job',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#00b0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          )
        }
      ];
  }
};

const SketchCube = ({
  text,
  className = '',
  isFocal = false,
  isOpen = false,
  onClick,
}) => {
  const badges = getTechIcons(text);

  return (
    <div
      className={`sketch-cube-node ${className} ${
        isFocal ? 'focal-cube' : ''
      } ${isOpen ? 'open-cube' : ''}`}
      onClick={onClick}
    >
      <div className="box-scene">
        <div className="box-core">
          {/* Main Sides */}
          <div className="side front"></div>
          <div className="side left">
            <svg className="side-icon-svg" viewBox="0 0 100 100" fill="none">
              {renderIcon(text)}
            </svg>
          </div>
          <div className="side back"></div>
          <div className="side right"></div>
          <div className="side bottom"></div>
          
          {/* Cardboard Top Flaps (4 Flaps Opening Outwards) */}
          <div className="flap front"></div>
          <div className="flap back"></div>
          <div className="flap left"></div>
          <div className="flap right"></div>
        </div>
      </div>

      {/* Surprise Floating Tech Badges */}
      <div className="surprise-badges">
        {badges.map((badge, idx) => (
          <div key={idx} className={`surprise-badge badge-${idx}`}>
            {badge.icon}
            <span className="badge-tooltip">{badge.name}</span>
          </div>
        ))}
      </div>

      <div className="cube-label">
        <span className="status-dot"></span>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default SketchCube;