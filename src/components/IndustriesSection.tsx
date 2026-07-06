import React, { useState, useEffect, useRef } from "react";
import {
  HeartPulse,
  Coins,
  GraduationCap,
  Truck,
  Brain,
  Briefcase,
  Check
} from "lucide-react";

interface Industry {
  name: string;
  badge: string;
  description: string;
  technologies: string;
  icon: React.ComponentType<{ className?: string }>;
  dotShadow: string;
}

const INDUSTRIES: Industry[] = [
  {
    name: "Healthcare & Life Sciences",
    badge: "HIPAA Compliant",
    description: "Building secure, HIPAA-compliant patient portals, EHR systems, and real-time telemedicine platforms for clinics and health providers.",
    technologies: "HL7/FHIR • WebRTC • HIPAA Shield",
    icon: HeartPulse,
    dotShadow: "rgba(251, 113, 133, 0.8) 0px 0px 10px"
  },
  {
    name: "FinTech & E-Commerce",
    badge: "PCI-DSS Secure",
    description: "Engineering secure online transactions, high-converting checkout engines, financial ledger systems, and automated billing software.",
    technologies: "PCI-DSS • Stripe API • Ledger DB",
    icon: Coins,
    dotShadow: "rgba(52, 211, 153, 0.8) 0px 0px 10px"
  },
  {
    name: "EdTech & Learning Labs",
    badge: "Active Scale",
    description: "Creating virtual learning portals, course databases, progress-tracking systems, and interactive video classrooms.",
    technologies: "WebSockets • Video SDKs • Redis",
    icon: GraduationCap,
    dotShadow: "rgba(56, 189, 248, 0.8) 0px 0px 10px"
  },
  {
    name: "Logistics & Smart Mobility",
    badge: "Real-Time Tracking",
    description: "Developing intelligent route planners, dispatch consoles, real-time GPS fleet tracking systems, and delivery monitors.",
    technologies: "Mapbox API • Go • GeoJSON",
    icon: Truck,
    dotShadow: "rgba(251, 146, 60, 0.8) 0px 0px 10px"
  },
  {
    name: "AI & Intelligent Systems",
    badge: "Next Gen",
    description: "Integrating custom LLMs, retrieval-augmented generation (RAG) knowledge search, predictive modeling, and analytics pipelines.",
    technologies: "OpenAI API • LangChain • Pinecone",
    icon: Brain,
    dotShadow: "rgba(192, 132, 252, 0.8) 0px 0px 10px"
  },
  {
    name: "Enterprise & Scale",
    badge: "High Availability",
    description: "Modernizing legacy monolith databases, architecting cloud setups, and orchestrating server pipelines for reliability.",
    technologies: "Docker • Kubernetes • Terraform",
    icon: Briefcase,
    dotShadow: "rgba(161, 161, 170, 0.8) 0px 0px 10px"
  }
];

export const IndustriesSection: React.FC = () => {
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
        const next = (prev + 1) % INDUSTRIES.length;
        // Scroll horizontally to the next item
        const cardWidth = 280; // Hardcoded mobile card width to avoid layout thrashing
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
    const cardWidth = 280; // Hardcoded mobile card width to avoid layout thrashing
    const gap = 24; // gap-6
    const calculatedIndex = Math.round(scrollLeft / (cardWidth + gap));
    
    // Only update if it actually changed
    if (calculatedIndex !== activeIndex && calculatedIndex >= 0 && calculatedIndex < INDUSTRIES.length) {
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
    <section className="relative w-full py-20 px-6 md:px-16 mt-6 flex flex-col items-center justify-center bg-[#fafafa] scroll-mt-24 md:scroll-mt-32" id="industries">
      {/* Decorative background grid and patterns (light theme) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Dynamic styles for animated hover border dots traveling exactly along the grid lines */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes moveDot {
          0%, 100% {
            top: 10%;
            right: 10%;
          }
          25% {
            top: 10%;
            right: calc(100% - 10% - 5px);
          }
          50% {
            top: calc(100% - 10% - 5px);
            right: calc(100% - 10% - 5px);
          }
          75% {
            top: calc(100% - 10% - 5px);
            right: 10%;
          }
        }
        .integration-card:hover .animated-dot {
          animation-play-state: running !important;
        }
      `}} />

      {/* Header Container (Light Background theme: Dark text) */}
      <div className="text-center mb-16 max-w-2xl mx-auto z-10 relative">
        <h2 className="sm:text-4xl text-3xl font-semibold text-neutral-900 tracking-tight font-display">
          Industries We Serve
        </h2>
        <p className="mt-3 text-base text-zinc-500 font-sans leading-relaxed">
          Engineering tailor-made software, cloud infrastructure, and AI solutions across key aggregated markets.
        </p>
      </div>

      {/* Grid of Cards (3 Columns - Visible on Desktop/Tablet) */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl z-10 relative">
        {INDUSTRIES.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="integration-card z-10 rounded-2xl p-[1px] relative overflow-hidden transition-all duration-300"
              style={{
                background: "radial-gradient(circle 230px at 0% 0%, rgba(113, 113, 122, 0.4), #0c0d0d)"
              }}
            >
              {/* Traveling Glow Dot on Hover */}
              <div
                className="animated-dot bg-zinc-400 w-[5px] h-[5px] z-[2] rounded-full absolute"
                style={{
                  boxShadow: item.dotShadow,
                  animation: "moveDot 6s linear infinite paused",
                  top: "10%",
                  right: "10%"
                }}
              />

              {/* Card Inner Content */}
              <div
                className="hover:bg-white/10 transition-all duration-300 group z-[1] bg-[#0c0d0d] h-full rounded-2xl px-5 py-6 sm:p-7 md:pt-7 md:pb-7 md:px-9 relative backdrop-blur flex flex-col justify-between"
                style={{
                  background: "radial-gradient(circle 280px at 0% 0%, rgba(68, 68, 68, 0.3), #0c0d0d)",
                  border: "1px solid #202222"
                }}
              >
                {/* Visual Accent Glow */}
                <div
                  className="blur-[10px] opacity-40 w-[220px] h-[45px] rounded-full absolute top-0 left-0 pointer-events-none"
                  style={{
                    backgroundColor: "rgba(113, 113, 122, 0.3)",
                    boxShadow: "0 0 50px rgba(113, 113, 122, 0.5)",
                    transform: "rotate(40deg)",
                    transformOrigin: "10%"
                  }}
                />

                {/* Top Row: Icon + Badge */}
                <div className="flex z-10 relative items-start justify-between">
                  <div className="flex w-12 h-12 rounded-xl items-center justify-center text-slate-400">
                    <Icon className="w-[24px] h-[24px]" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-300 bg-zinc-400/10 ring-zinc-400/20 ring-1 rounded-md px-2 py-1">
                    <Check className="h-3 w-3 text-zinc-400" />
                    {item.badge}
                  </span>
                </div>

                {/* Middle Content */}
                <div className="relative z-10 mt-4 flex-grow">
                  <h3 className="text-lg font-semibold tracking-tight text-white font-sans">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-400 leading-relaxed font-sans min-h-[60px]">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Row: Key Tech Stack Badges */}
                <div className="flex z-10 mt-6 relative items-center justify-between">
                  <span className="text-xs text-zinc-500 font-medium">
                    {item.technologies}
                  </span>
                </div>

                {/* Absolute Grid Lines exactly matching the blueprint style */}
                {/* Top horizontal grid line */}
                <div
                  className="w-full h-[1px] absolute"
                  style={{
                    top: "10%",
                    left: "0%",
                    background: "linear-gradient(90deg, rgba(136, 136, 136, 0.3) 30%, #1d1f1f 70%)",
                    maskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)",
                    WebkitMaskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)"
                  }}
                />

                {/* Left vertical grid line */}
                <div
                  className="w-[1px] h-full absolute"
                  style={{
                    left: "10%",
                    top: "0%",
                    background: "linear-gradient(180deg, rgba(116, 116, 116, 0.3) 30%, #222424 70%)",
                    maskImage: "linear-gradient(180deg, transparent, black 15%, black 85%, transparent)",
                    WebkitMaskImage: "linear-gradient(180deg, transparent, black 15%, black 85%, transparent)"
                  }}
                />

                {/* Bottom horizontal grid line */}
                <div
                  className="w-full h-[1px] absolute"
                  style={{
                    bottom: "10%",
                    left: "0%",
                    background: "linear-gradient(90deg, rgba(136, 136, 136, 0.3) 30%, #1d1f1f 70%)",
                    maskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)",
                    WebkitMaskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)"
                  }}
                />

                {/* Right vertical grid line */}
                <div
                  className="w-[1px] h-full absolute"
                  style={{
                    right: "10%",
                    top: "0%",
                    background: "linear-gradient(180deg, rgba(116, 116, 116, 0.3) 30%, #222424 70%)",
                    maskImage: "linear-gradient(180deg, transparent, black 15%, black 85%, transparent)",
                    WebkitMaskImage: "linear-gradient(180deg, transparent, black 15%, black 85%, transparent)"
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel of Cards (Flex horizontal, visible only on mobile/smaller screens) */}
      <div className="flex md:hidden flex-col items-center w-full z-10 relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          className="flex flex-row overflow-x-auto scrollbar-none snap-x snap-mandatory gap-6 px-6 pb-6 w-full scroll-smooth"
        >
          {INDUSTRIES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`mobile-${index}`}
                className="integration-card z-10 rounded-2xl p-[1px] relative overflow-hidden transition-all duration-300 w-[280px] shrink-0 snap-center"
                style={{
                  background: "radial-gradient(circle 230px at 0% 0%, rgba(113, 113, 122, 0.4), #0c0d0d)"
                }}
              >
                {/* Traveling Glow Dot on Hover */}
                <div
                  className="animated-dot bg-zinc-400 w-[5px] h-[5px] z-[2] rounded-full absolute"
                  style={{
                    boxShadow: item.dotShadow,
                    animation: "moveDot 6s linear infinite paused",
                    top: "10%",
                    right: "10%"
                  }}
                />

                {/* Card Inner Content */}
                <div
                  className="hover:bg-white/10 transition-all duration-300 group z-[1] bg-[#0c0d0d] h-full rounded-2xl px-5 py-6 sm:p-7 relative backdrop-blur flex flex-col justify-between"
                  style={{
                    background: "radial-gradient(circle 280px at 0% 0%, rgba(68, 68, 68, 0.3), #0c0d0d)",
                    border: "1px solid #202222"
                  }}
                >
                  {/* Visual Accent Glow */}
                  <div
                    className="blur-[10px] opacity-40 w-[200px] h-[40px] rounded-full absolute top-0 left-0 pointer-events-none"
                    style={{
                      backgroundColor: "rgba(113, 113, 122, 0.3)",
                      boxShadow: "0 0 50px rgba(113, 113, 122, 0.5)",
                      transform: "rotate(40deg)",
                      transformOrigin: "10%"
                    }}
                  />

                  {/* Top Row: Icon + Badge */}
                  <div className="flex z-10 relative items-start justify-between">
                    <div className="flex w-10 h-10 rounded-lg items-center justify-center text-slate-400">
                      <Icon className="w-[20px] h-[20px]" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] text-zinc-300 bg-zinc-400/10 ring-zinc-400/20 ring-1 rounded-md px-1.5 py-0.5">
                      <Check className="h-2.5 w-2.5 text-zinc-400" />
                      {item.badge}
                    </span>
                  </div>

                  {/* Middle Content */}
                  <div className="relative z-10 mt-3 flex-grow">
                    <h3 className="text-base font-semibold tracking-tight text-white font-sans">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Row: Key Tech Stack Badges */}
                  <div className="flex z-10 mt-4 relative items-center justify-between">
                    <span className="text-[11px] text-zinc-500 font-medium">
                      {item.technologies}
                    </span>
                  </div>

                  {/* Absolute Grid Lines exactly matching the blueprint style */}
                  <div className="absolute top-[10%] left-0 right-0 h-[1px] bg-[linear-gradient(90deg,rgba(113,113,122,0.15),rgba(113,113,122,0.05)_50%,rgba(113,113,122,0.15))] z-0" />
                  <div className="absolute bottom-[10%] left-0 right-0 h-[1px] bg-[linear-gradient(90deg,rgba(113,113,122,0.15),rgba(113,113,122,0.05)_50%,rgba(113,113,122,0.15))] z-0" />
                  <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-[linear-gradient(180deg,rgba(113,113,122,0.15),rgba(113,113,122,0.05)_50%,rgba(113,113,122,0.15))] z-0" />
                  <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-[linear-gradient(180deg,rgba(113,113,122,0.15),rgba(113,113,122,0.05)_50%,rgba(113,113,122,0.15))] z-0" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicator dots for Mobile view */}
        <div className="flex gap-2 mt-4">
          {INDUSTRIES.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              onClick={() => {
                const container = scrollRef.current;
                if (!container) return;
                const cardWidth = container.querySelector(".integration-card")?.clientWidth || 290;
                const gap = 24;
                container.scrollTo({
                  left: idx * (cardWidth + gap),
                  behavior: "smooth"
                });
                setActiveIndex(idx);
                handleTouchStart(); // Pause auto cycle
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-6 bg-zinc-400" : "w-1.5 bg-zinc-600/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
