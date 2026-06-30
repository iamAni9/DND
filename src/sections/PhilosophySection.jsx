import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import '@/styles/philosophy.css';

/* ───────── SVG illustrations (clean vector line-art) ───────── */
const EyeLens = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="philosophy-svg">
    <circle cx="50" cy="50" r="32" fill="var(--accent-bg)" />
    <circle cx="50" cy="50" r="14" />
    <path d="M50 18 L36 32" /><path d="M82 50 L68 36" />
    <path d="M50 82 L64 68" /><path d="M18 50 L32 64" />
    <circle cx="50" cy="50" r="6" fill="var(--accent)" stroke="none" />
  </svg>
);

const RisingShield = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="philosophy-svg">
    <path d="M50 18 C30 18, 26 28, 26 48 C26 68, 50 82, 50 82 C50 82, 74 68, 74 48 C74 28, 70 18, 50 18 Z" fill="var(--accent-bg)" />
    <path d="M38 52 L46 60 L62 44" strokeWidth="3.5" />
  </svg>
);

const GrowthNodes = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="philosophy-svg">
    <path d="M30 65 L45 42 L62 58 L78 30" strokeWidth="3" />
    <circle cx="30" cy="65" r="7" fill="#ffffff" strokeWidth="3.5" />
    <circle cx="45" cy="42" r="7" fill="#ffffff" strokeWidth="3.5" />
    <circle cx="62" cy="58" r="7" fill="#ffffff" strokeWidth="3.5" />
    <circle cx="78" cy="30" r="7" fill="var(--accent)" stroke="none" />
    <path d="M74 24 L82 24 L82 32" strokeWidth="3" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drawer-check-icon">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PHILOSOPHY_CARDS = [
  {
    title: 'Modern Engineering Foundations',
    desc: 'We build from clean, modern codebases free from legacy constraints and template bloat. Every project is custom-engineered for maximum speed, security, and long-term architectural scalability.',
    Icon: EyeLens,
    drawerTitle: 'Vetted Project Tech Stack',
    type: 'tech',
    hudTag: 'DND.SYS_ARCH'
  },
  {
    title: 'Value-Driven Digital Assets',
    desc: 'Your digital presence is an appreciating asset, not an operational expense. We design high-converting, premium interfaces that establish authority and drive measurable customer acquisition.',
    Icon: RisingShield,
    drawerTitle: 'Value & Speed Blueprint',
    type: 'roi',
    hudTag: 'DND.ROI_METRIC'
  },
  {
    title: 'Direct Creator Alignment',
    desc: 'We eliminate agency layers, corporate overhead, and communication decay. You partner directly with lead engineers and design heads to deliver rapid, high-fidelity sprint milestones.',
    Icon: GrowthNodes,
    drawerTitle: 'Communication Workflow Compare',
    type: 'pipeline',
    hudTag: 'DND.COMM_FLOW'
  }
];

const TECH_DATA = {
  frontend: [
    { name: 'React / Next.js', desc: 'Modern UI & SSR SaaS Frontends' },
    { name: 'Vue / Nuxt.js', desc: 'Reactive Single Page Applications' },
    { name: 'Tailwind CSS', desc: 'Highly optimized fluid design systems' },
    { name: 'Svelte / SvelteKit', desc: 'Lightweight high-performance UI engines' }
  ],
  backend: [
    { name: 'Node.js / Express', desc: 'High-throughput scalable server logic' },
    { name: 'Go (Golang)', desc: 'Microservices & concurrent cloud engines' },
    { name: 'Python / FastAPI', desc: 'Robust data backends & API layers' },
    { name: 'GraphQL / gRPC / REST', desc: 'Modern performant protocol engineering' }
  ],
  databases: [
    { name: 'PostgreSQL', desc: 'Relational SQL & JSONB document stores' },
    { name: 'MongoDB', desc: 'Flexible JSON-like NoSQL document storage' },
    { name: 'Redis', desc: 'Ultra-fast in-memory caching & session stores' },
    { name: 'MySQL / SQLite', desc: 'Reliable transactional relational databases' }
  ],
  mobile: [
    { name: 'Flutter / Dart', desc: 'Cross-platform iOS & Android deployment' },
    { name: 'React Native', desc: 'Native hybrid application framework' },
    { name: 'Swift / SwiftUI', desc: 'Native Apple ecosystem development' },
    { name: 'Kotlin', desc: 'Native Android core application development' }
  ],
  aiInfra: [
    { name: 'OpenAI / Gemini / Claude', desc: 'LLM APIs, completions & agent fine-tuning' },
    { name: 'LangChain / AutoGen', desc: 'Autonomous AI agent workflow builders' },
    { name: 'Docker / Kubernetes', desc: 'Containerized deployment & scaling' },
    { name: 'AWS / Vercel / GCP', desc: 'Serverless architecture & hosting pipelines' }
  ]
};

const RealTechStack = () => {
  const [activeTab, setActiveTab] = useState('frontend');

  return (
    <div className="drawer-tech-explorer">
      {/* Category Tabs */}
      <div className="drawer-tech-tabs">
        <button 
          onClick={() => setActiveTab('frontend')} 
          className={`tech-tab-btn ${activeTab === 'frontend' ? 'active' : ''}`}
        >
          Frontend
        </button>
        <button 
          onClick={() => setActiveTab('backend')} 
          className={`tech-tab-btn ${activeTab === 'backend' ? 'active' : ''}`}
        >
          Backend
        </button>
        <button 
          onClick={() => setActiveTab('databases')} 
          className={`tech-tab-btn ${activeTab === 'databases' ? 'active' : ''}`}
        >
          Databases
        </button>
        <button 
          onClick={() => setActiveTab('mobile')} 
          className={`tech-tab-btn ${activeTab === 'mobile' ? 'active' : ''}`}
        >
          Mobile
        </button>
        <button 
          onClick={() => setActiveTab('aiInfra')} 
          className={`tech-tab-btn ${activeTab === 'aiInfra' ? 'active' : ''}`}
        >
          AI & Infra
        </button>
      </div>

      {/* Tech grid keyed by activeTab to trigger stagger entry animations on switch */}
      <div className="drawer-tech-grid" key={activeTab}>
        {TECH_DATA[activeTab].map((tech, idx) => (
          <div className="drawer-tech-capsule" key={idx}>
            <span className="tech-capsule-name">{tech.name}</span>
            <span className="tech-capsule-role">{tech.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const RoiBlueprint = () => (
  <ul className="drawer-checklist">
    <li className="drawer-checklist-item">
      <CheckIcon />
      <span>Engineered for optimal Core Web Vitals and load speeds</span>
    </li>
    <li className="drawer-checklist-item">
      <CheckIcon />
      <span>SEO structured semantic headers</span>
    </li>
    <li className="drawer-checklist-item">
      <CheckIcon />
      <span>Mobile-first fluid layout scaling</span>
    </li>
  </ul>
);

const PipelineWorkflow = () => (
  <div className="drawer-workflow">
    <div className="workflow-branch good">
      <span className="workflow-branch-label">DND Guild Model (Direct)</span>
      <div className="workflow-nodes">
        <span className="workflow-node">Client</span>
        <span className="workflow-arrow">⇄</span>
        <span className="workflow-node highlight">Makers</span>
      </div>
      <span className="workflow-benefit">Same-day response, zero delays</span>
    </div>
    <div className="workflow-divider" />
    <div className="workflow-branch bad">
      <span className="workflow-branch-label">Traditional Corporate Agency</span>
      <div className="workflow-nodes">
        <span className="workflow-node">Client</span>
        <span className="workflow-arrow">➜</span>
        <span className="workflow-node muted">PM</span>
        <span className="workflow-arrow">➜</span>
        <span className="workflow-node muted">Dev Lead</span>
        <span className="workflow-arrow">➜</span>
        <span className="workflow-node">Dev</span>
      </div>
      <span className="workflow-benefit">5-layer delay, info leakage</span>
    </div>
  </div>
);

const PhilosophyCard = ({ card, idx, delay, isExpanded, onToggle }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate rotation angle (max 5 degrees tilt)
    const rotX = -((y - centerY) / centerY) * 5;
    const rotY = ((x - centerX) / centerX) * 5;
    setRotation({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const cardStyle = {
    '--mouse-x': `${coords.x}px`,
    '--mouse-y': `${coords.y}px`,
    '--rotate-x': `${rotation.x}deg`,
    '--rotate-y': `${rotation.y}deg`,
  };

  return (
    <ScrollReveal delay={delay}>
      <div
        className={`service-card ${isHovered ? 'is-hovered' : ''} ${isExpanded ? 'is-expanded' : ''}`}
        style={cardStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* HUD Decorative Corner Brackets */}
        <div className="service-card__hud-bracket top-left" />
        <div className="service-card__hud-bracket top-right" />
        <div className="service-card__hud-bracket bottom-left" />
        <div className="service-card__hud-bracket bottom-right" />

        {/* Subtle grid mesh background */}
        <div className="service-card__grid-bg" />

        {/* Top colored accent line */}
        <div className="service-card__top-bar" />

        {/* Dynamic radial glow overlay */}
        <div className="service-card__cursor-glow" />

        {/* HUD Top Metadata tag */}
        <span className="service-card__hud-tag font-mono">[ {card.hudTag} // LOC.0{idx + 1} ]</span>

        {/* Floating outlined watermark number */}
        <div className="service-card__watermark-outline">0{idx + 1}</div>

        {/* Floating Icon */}
        <div className="service-card__icon-container float-3d">
          <card.Icon />
        </div>

        {/* Header content */}
        <h3 className="service-card__title font-solid float-3d">{card.title}</h3>
        <p className="service-card__text float-3d">{card.desc}</p>

        {/* Interactive toggle button */}
        <div className="service-card__action float-3d">
          <button 
            onClick={onToggle}
            className={`service-card__toggle-pill ${isExpanded ? 'active' : ''}`}
            aria-expanded={isExpanded}
          >
            <span className="pill-status-dot" />
            <span className="pill-text">{isExpanded ? 'Close Sandbox' : 'Interactive Sandbox'}</span>
            <span className="pill-arrow">{isExpanded ? '▲' : '▼'}</span>
          </button>
        </div>

        {/* Expandable Details Drawer */}
        <div className={`service-card__drawer ${isExpanded ? 'open' : ''}`}>
          <div className="service-card__drawer-inner">
            <span className="drawer-heading font-marker">{card.drawerTitle}</span>
            {card.type === 'tech' && <RealTechStack />}
            {card.type === 'roi' && <RoiBlueprint />}
            {card.type === 'pipeline' && <PipelineWorkflow />}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

const PhilosophySection = () => {
  const [activeExpanded, setActiveExpanded] = useState(null);

  return (
    <section className="philosophy" id="about" aria-labelledby="phil-title">
      <div className="philosophy-radial-glow" />

      {/* Header */}
      <div className="philosophy__header">
        <ScrollReveal delay={50}>
          <h2 id="phil-title" className="philosophy__title font-solid">
            No Tech Drama. Just Results.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <div className="philosophy__subtitle">
            <span className="philosophy__subtitle-text">
              We Handle the Tech. You Focus on What You Do Best.
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* Main 3-Column Card Grid */}
      <div className={`services-grid ${activeExpanded !== null ? 'has-expanded' : ''}`}>
        {PHILOSOPHY_CARDS.map((card, idx) => (
          <PhilosophyCard 
            key={idx} 
            card={card} 
            idx={idx} 
            delay={idx * 150} 
            isExpanded={activeExpanded === idx}
            onToggle={() => setActiveExpanded(activeExpanded === idx ? null : idx)}
          />
        ))}
      </div>
    </section>
  );
};

export default PhilosophySection;