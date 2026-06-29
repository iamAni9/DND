import React, { useState } from 'react';
import RoughAnnotation from '@/components/RoughAnnotation';
import ScrollReveal from '@/components/ScrollReveal';
import '@/styles/work.css';

/* ───────── Custom Magical SVGs ───────── */
const AetherIcon = () => (
  <svg viewBox="0 0 50 50" className="work-card-icon" fill="none" stroke="#6366f1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="25" cy="25" r="14" strokeDasharray="3 3" />
    <path d="M17,25 L33,25 M25,17 L25,33" />
    <circle cx="25" cy="25" r="6" fill="rgba(99, 102, 241, 0.15)" />
    <path d="M19,19 Q25,13 31,19 T31,31 T19,31 Z" />
  </svg>
);

const ScribeIcon = () => (
  <svg viewBox="0 0 50 50" className="work-card-icon" fill="none" stroke="#a855f7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15,35 Q30,35 35,20 C38,12 42,10 40,8 C38,6 36,10 28,13 C13,20 15,30 15,35" fill="rgba(168, 85, 247, 0.15)" />
    <line x1="15" y1="35" x2="35" y2="15" />
    <path d="M22,28 Q30,22 33,20" strokeWidth="1.5" />
    <circle cx="15" cy="35" r="2" fill="#a855f7" />
  </svg>
);

const ChronoIcon = () => (
  <svg viewBox="0 0 50 50" className="work-card-icon" fill="none" stroke="#eab308" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18,12 L32,12 M18,38 L32,38" />
    <path d="M20,12 C20,22 30,22 30,12" />
    <path d="M20,38 C20,28 30,28 30,38" />
    <line x1="25" y1="20" x2="25" y2="30" strokeDasharray="2 2" />
    <path d="M22,34 L28,34" fill="#eab308" />
    <circle cx="25" cy="25" r="17" stroke="rgba(234, 179, 8, 0.15)" />
  </svg>
);

const PROJECTS = [
  {
    title: 'AetherAI',
    type: 'ai',
    category: 'AI Agents & Chat companions',
    description: 'An autonomous engine powered by custom LLM agents that auto-generates storylines, character stats, and custom lore on the fly.',
    link: '#',
    highlightColor: 'rgba(99, 102, 241, 0.3)',
    fontClass: 'font-solid',
    Icon: AetherIcon,
  },
  {
    title: 'ScribeSaaS',
    type: 'saas',
    category: 'Workflow & Collaboration Platforms',
    description: 'A real-time workspace for remote writers and gaming guilds with character template integrations and document pipelines.',
    link: '#',
    highlightColor: 'rgba(168, 85, 247, 0.3)',
    fontClass: 'font-solid',
    Icon: ScribeIcon,
  },
  {
    title: 'ChronoWeb',
    type: 'web',
    category: 'High-Performance Marketing Hubs',
    description: 'A landing platform built with Next.js featuring fully customized interactive SVG timelines and physics animations.',
    link: '#',
    highlightColor: 'rgba(234, 179, 8, 0.3)',
    fontClass: 'font-solid',
    Icon: ChronoIcon,
  },
];

const TABS = [
  { label: 'All Projects', type: 'all' },
  { label: 'AI Systems', type: 'ai' },
  { label: 'SaaS Platforms', type: 'saas' },
  { label: 'Web Systems', type: 'web' }
];

const ProjectCard = ({ title, category, description, link, highlightColor, fontClass, Icon, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal delay={delay}>
      <div
        className="work-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Custom icon container */}
        <div className="work-card__header-row">
          <div className="work-card__category font-marker">{category}</div>
          <div className="work-card__icon-wrapper"><Icon /></div>
        </div>

        <h3 className={`work-card__title ${fontClass}`}>
          <RoughAnnotation
            type="underline"
            color={highlightColor}
            strokeWidth={3}
            show={hovered}
          >
            {title}
          </RoughAnnotation>
        </h3>
        <p className="work-card__desc">{description}</p>
        <a href={link} className="work-card__btn font-sketch">
          View Project →
        </a>
      </div>
    </ScrollReveal>
  );
};

const WorkSection = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProjects = activeTab === 'all'
    ? PROJECTS
    : PROJECTS.filter(proj => proj.type === activeTab);

  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="work-section__header">
        <ScrollReveal delay={50}>
          <h2 id="work-title" className="work-section__title font-solid">
            Recent Creations
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="work-section__subtitle">
            A preview of custom digital products, platforms, and applications we squeezed from clean code.
          </p>
        </ScrollReveal>
      </div>

      {/* Category filter tabs */}
      <div className="work-filters">
        {TABS.map((tab, idx) => (
          <ScrollReveal key={tab.type} delay={idx * 50} display="inline-block">
            <button
              onClick={() => setActiveTab(tab.type)}
              className={`work-filter-btn ${activeTab === tab.type ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          </ScrollReveal>
        ))}
      </div>

      <div className="work-grid">
        {filteredProjects.map((proj, idx) => (
          <ProjectCard key={proj.title} {...proj} delay={idx * 100} />
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
