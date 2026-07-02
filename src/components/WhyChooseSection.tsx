import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Target,
  Terminal,
  IterationCw,
  Layers,
  ShieldCheck,
  Clock
} from "lucide-react";

interface ReasonItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  shadowColor: string;
  iconBg: string;
}

const REASONS: ReasonItem[] = [
  {
    title: "Business-first approach",
    description: "We align tech choices with your commercial goals to guarantee concrete business value and strong ROI.",
    icon: Target,
    gradient: "linear-gradient(145deg, #ffffff 0%, #f0f9ff 100%)",
    shadowColor: "rgba(14, 165, 233, 0.15)",
    iconBg: "bg-sky-50 text-sky-600 border border-sky-100/70",
  },
  {
    title: "Experienced software engineers",
    description: "Our senior-heavy engineering team builds clean, maintainable, and high-performance applications.",
    icon: Terminal,
    gradient: "linear-gradient(145deg, #ffffff 0%, #f5f3ff 100%)",
    shadowColor: "rgba(168, 85, 247, 0.15)",
    iconBg: "bg-purple-50 text-purple-600 border border-purple-100/70",
  },
  {
    title: "Agile development methodology",
    description: "Benefit from continuous updates, rapid iterations, and responsive feedback cycles.",
    icon: IterationCw,
    gradient: "linear-gradient(145deg, #ffffff 0%, #ecfdf5 100%)",
    shadowColor: "rgba(16, 185, 129, 0.15)",
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100/70",
  },
  {
    title: "Scalable architecture",
    description: "We design cloud-ready, modular systems built to handle heavy user growth and traffic seamlessly.",
    icon: Layers,
    gradient: "linear-gradient(145deg, #ffffff 0%, #eef2ff 100%)",
    shadowColor: "rgba(99, 102, 241, 0.15)",
    iconBg: "bg-indigo-50 text-indigo-600 border border-indigo-100/70",
  },
  {
    title: "Enterprise-grade security",
    description: "We enforce industry security standards, secure APIs, and robust encryption to protect your data.",
    icon: ShieldCheck,
    gradient: "linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)",
    shadowColor: "rgba(34, 197, 94, 0.15)",
    iconBg: "bg-green-50 text-green-600 border border-green-100/70",
  },
  {
    title: "On-time project delivery",
    description: "We set realistic timelines and adhere to structured milestones to launch on schedule.",
    icon: Clock,
    gradient: "linear-gradient(145deg, #ffffff 0%, #fffbeb 100%)",
    shadowColor: "rgba(245, 158, 11, 0.15)",
    iconBg: "bg-amber-50 text-amber-600 border border-amber-100/70",
  }
];

export const WhyChooseSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-scrolling effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;

      setActiveIndex((prev) => {
        const next = (prev + 1) % REASONS.length;
        // Scroll horizontally to the next item
        const cardWidth = container.querySelector(".why-choose-card")?.clientWidth || 280;
        const gap = 24; // gap-6
        container.scrollTo({
          left: next * (cardWidth + gap),
          behavior: "smooth"
        });
        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle manual scroll mapping
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cardWidth = container.querySelector(".why-choose-card")?.clientWidth || 280;
    const gap = 24; // gap-6
    const calculatedIndex = Math.round(scrollLeft / (cardWidth + gap));
    
    if (calculatedIndex !== activeIndex && calculatedIndex >= 0 && calculatedIndex < REASONS.length) {
      setActiveIndex(calculatedIndex);
    }
  };

  // Pause auto-sliding on manual touch interaction
  const handleTouchStart = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    // Resume auto-sliding after 10 seconds of no touch
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="relative w-full max-w-[1400px] mx-auto py-16 px-6 md:px-12 flex flex-col items-center justify-center mt-6">
      {/* Decorative background grid (light theme) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Header Container */}
      <div className="text-center mb-10 max-w-2xl mx-auto z-10 relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-800 mb-4 font-sans shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse" />
          Our Value Proposition
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0a1b33] font-display">
          Why Choose Dev Next Door?
        </h2>
        <p className="mt-3 text-sm md:text-base text-slate-500 font-sans leading-relaxed">
          We combine enterprise-grade execution with the agility of a startup to build custom software that accelerates business growth.
        </p>
      </div>

      {/* Grid of Cards (3 Columns on Large/Medium screens - Hidden on Mobile) */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl z-10 relative">
        {REASONS.map((item, index) => {
          const Icon = item.icon;
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(index)}
              onTouchEnd={() => setHoveredIndex(null)}
              className="why-choose-card flex flex-col rounded-2xl p-6 cursor-default h-full"
              style={{
                background: item.gradient,
                transform: isHovered ? "translateY(-6px)" : "translateY(0px)",
                boxShadow: isHovered
                  ? `rgba(0, 0, 0, 0.03) 2px 4px 8px, rgba(0, 0, 0, 0.04) 8px 16px 24px, rgba(0, 0, 0, 0.08) 16px 24px 32px, ${item.shadowColor} 0px 24px 48px, rgb(255, 255, 255) 0px 1px 1px inset, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px`
                  : `rgba(0, 0, 0, 0.01) 2px 4px 8px, rgba(0, 0, 0, 0.02) 8px 16px 24px, rgb(255, 255, 255) 0px 1px 1px inset, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px`,
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Icon Container */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs mb-4 transition-all duration-300 ${
                  isHovered ? "scale-110 rotate-3" : "scale-100 rotate-0"
                } ${item.iconBg}`}
              >
                <Icon className="w-5.5 h-5.5" />
              </div>

              {/* Card Title */}
              <h3 className="text-base font-semibold tracking-tight text-[#0a1b33] font-sans leading-snug">
                {item.title}
              </h3>

              {/* Card Description */}
              <p className="text-[13px] text-slate-500 font-sans leading-relaxed mt-2">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Carousel of Cards (Visible only on Mobile/Smaller viewports) */}
      <div className="flex sm:hidden flex-col items-center w-full z-10 relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          className="flex flex-row overflow-x-auto scrollbar-none snap-x snap-mandatory gap-6 px-6 pb-6 w-full scroll-smooth"
        >
          {REASONS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`mobile-${index}`}
                className="why-choose-card shrink-0 w-[280px] snap-center flex flex-col rounded-2xl p-6 cursor-default"
                style={{
                  background: item.gradient,
                  boxShadow: `rgba(0, 0, 0, 0.01) 2px 4px 8px, rgba(0, 0, 0, 0.02) 8px 16px 24px, rgb(255, 255, 255) 0px 1px 1px inset, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px`,
                }}
              >
                {/* Icon Container */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs mb-4 ${item.iconBg}`}>
                  <Icon className="w-5.5 h-5.5" />
                </div>

                {/* Card Title */}
                <h3 className="text-base font-semibold tracking-tight text-[#0a1b33] font-sans leading-snug">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-[13px] text-slate-500 font-sans leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex gap-2 mt-4">
          {REASONS.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              onClick={() => {
                const container = scrollRef.current;
                if (!container) return;
                const cardWidth = container.querySelector(".why-choose-card")?.clientWidth || 280;
                const gap = 24;
                container.scrollTo({
                  left: idx * (cardWidth + gap),
                  behavior: "smooth"
                });
                setActiveIndex(idx);
                handleTouchStart(); // Pause auto cycle
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-6 bg-indigo-500" : "w-1.5 bg-slate-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
