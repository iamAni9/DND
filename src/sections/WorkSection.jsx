import React, { useState } from 'react';
import RoughAnnotation from '@/components/RoughAnnotation';
import ScrollReveal from '@/components/ScrollReveal';
import '@/styles/work.css';

/* ───────── Decorative Brass Rivet ───────── */
const CardRivet = ({ style }) => (
  <div className="card-rivet" style={style} />
);

/* ───────── Custom Magical SVGs ───────── */
const AetherIcon = () => (
  <svg viewBox="0 0 50 50" className="work-card-icon" fill="none" stroke="#aa3bff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="25" cy="25" r="14" strokeDasharray="3 3" />
    <path d="M17,25 L33,25 M25,17 L25,33" />
    <circle cx="25" cy="25" r="6" fill="rgba(170, 59, 255, 0.15)" />
    <path d="M19,19 Q25,13 31,19 T31,31 T19,31 Z" />
  </svg>
);

const ScribeIcon = () => (
  <svg viewBox="0 0 50 50" className="work-card-icon" fill="none" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15,35 Q30,35 35,20 C38,12 42,10 40,8 C38,6 36,10 28,13 C13,20 15,30 15,35" fill="rgba(244, 114, 182, 0.15)" />
    <line x1="15" y1="35" x2="35" y2="15" />
    <path d="M22,28 Q30,22 33,20" strokeWidth="1.5" />
    <circle cx="15" cy="35" r="2" fill="#f472b6" />
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
    title: 'AetherAI 🤖',
    category: 'AI Agents & Chat companions',
    description: 'An autonomous engine powered by custom LLM agents that auto-generates storylines, character stats, and custom lore on the fly.',
    link: '#',
    highlightColor: 'rgba(170, 59, 255, 0.45)',
    fontClass: 'font-sketch',
    Icon: AetherIcon,
  },
  {
    title: 'ScribeSaaS 🚀',
    category: 'Workflow & Collaboration Platforms',
    description: 'A real-time workspace for remote writers and gaming guilds with character template integrations and document pipelines.',
    link: '#',
    highlightColor: 'rgba(244, 114, 182, 0.45)',
    fontClass: 'font-outline',
    Icon: ScribeIcon,
  },
  {
    title: 'ChronoWeb 🌐',
    category: 'High-Performance Marketing Hubs',
    description: 'A landing platform built with Next.js featuring fully customized interactive SVG timelines and physics animations.',
    link: '#',
    highlightColor: 'rgba(234, 179, 8, 0.45)',
    fontClass: 'font-solid',
    Icon: ChronoIcon,
  },
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
        {/* Brass rivets in card corners */}
        <CardRivet style={{ top: '8px', left: '8px' }} />
        <CardRivet style={{ top: '8px', right: '8px' }} />
        <CardRivet style={{ bottom: '8px', right: '8px' }} />
        <CardRivet style={{ bottom: '8px', left: '8px' }} />

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
          Take a Peak →
        </a>
      </div>
    </ScrollReveal>
  );
};

const WorkSection = () => {
  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="work-section__header">
        <ScrollReveal delay={50}>
          <h2 id="work-title" className="work-section__title font-solid">
            RECENT CREATIONS
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="work-section__subtitle">
            A preview of custom digital products, platforms, and applications we squeezed from clean code.
          </p>
        </ScrollReveal>
      </div>

      <div className="work-grid">
        {PROJECTS.map((proj, idx) => (
          <ProjectCard key={idx} {...proj} delay={idx * 150} />
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
