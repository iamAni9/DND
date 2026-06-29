import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import '@/styles/faq.css';

const FAQCard = ({ q, a, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`faq-row ${isOpen ? 'is-open' : ''}`} 
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsOpen(!isOpen);
        }
      }}
    >
      <div className="faq-row__header">
        <div className="faq-row__q-wrap">
          <span className="faq-row__number">0{index + 1}</span>
          <h4 className="faq-row__question">{q}</h4>
        </div>
        <div className="faq-row__trigger-container">
          <span className="faq-row__trigger">{isOpen ? '−' : '＋'}</span>
        </div>
      </div>
      <div className="faq-row__body">
        <div className="faq-row__answer-wrapper">
          <p className="faq-row__answer">{a}</p>
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const faqData = [
    {
      q: "What is your typical project timeline?",
      a: "Standard web projects and landing pages are delivered in 1 to 2 weeks. More complex applications, such as custom SaaS portals or deep AI integrations, typically span 4 to 8 weeks.",
    },
    {
      q: "What technologies do you specialize in?",
      a: "We specialize in modern engineering stacks including React, Next.js, Node.js, TypeScript, PostgreSQL, and custom LLM AI integrations.",
    },
    {
      q: "Can we adjust project requirements mid-development?",
      a: "Yes, we work in agile sprint cycles. You can easily adjust specifications and milestones at the end of each sprint.",
    },
  ];

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      {/* Ambient background light glow flare */}
      <div className="faq-radial-glow" />

      <div className="faq-header">
        <ScrollReveal delay={50}>
          <h2 id="faq-title" className="faq-title font-solid">
            Frequently Asked Questions
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="faq-subtitle">
            Answers to common inquiries regarding our workflows, tech stack, and project execution.
          </p>
        </ScrollReveal>
      </div>

      <div className="faq-list">
        {faqData.map((item, idx) => (
          <ScrollReveal key={idx} delay={idx * 100}>
            <FAQCard q={item.q} a={item.a} index={idx} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
