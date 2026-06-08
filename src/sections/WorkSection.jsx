import React, { useState } from 'react';
import RoughAnnotation from '@/components/RoughAnnotation';
import ScrollReveal from '@/components/ScrollReveal';
import '@/styles/work.css';

const PROJECTS = [
  {
    title: 'AetherAI 🤖',
    category: 'AI Agents & Chat companions',
    description: 'An autonomous engine powered by custom LLM agents that auto-generates storylines, character stats, and custom lore on the fly.',
    link: '#',
    highlightColor: 'rgba(147, 197, 253, 0.45)', // pastel blue
    fontClass: 'font-sketch',
  },
  {
    title: 'ScribeSaaS 🚀',
    category: 'Workflow & Collaboration Platforms',
    description: 'A real-time workspace for remote writers and gaming guilds with character template integrations and document pipelines.',
    link: '#',
    highlightColor: 'rgba(244, 114, 182, 0.45)', // pastel pink
    fontClass: 'font-outline',
  },
  {
    title: 'ChronoWeb 🌐',
    category: 'High-Performance Marketing Hubs',
    description: 'A landing platform built with Next.js featuring fully customized interactive SVG timelines and physics animations.',
    link: '#',
    highlightColor: 'rgba(253, 224, 71, 0.45)', // pastel yellow
    fontClass: 'font-solid',
  },
];

const ProjectCard = ({ title, category, description, link, highlightColor, fontClass, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal delay={delay}>
      <div
        className="work-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="work-card__category font-marker">{category}</div>
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
