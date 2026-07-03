import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Compass,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  HeartHandshake
} from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glowColor: string;
  borderColor: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Consultation",
    description: "We understand your business goals, users, and technical requirements.",
    icon: MessageSquare,
    color: "#06B6D4", // Cyan
    glowColor: "rgba(6, 182, 212, 0.25)",
    borderColor: "rgba(6, 182, 212, 0.4)",
  },
  {
    number: "02",
    title: "Planning & Architecture",
    description: "Project roadmap, timelines, system architecture, and technical planning.",
    icon: Compass,
    color: "#8B5CF6", // Purple/Indigo
    glowColor: "rgba(139, 92, 246, 0.25)",
    borderColor: "rgba(139, 92, 246, 0.4)",
  },
  {
    number: "03",
    title: "UI/UX Design",
    description: "Wireframes, prototypes, and user-centered design.",
    icon: Palette,
    color: "#EC4899", // Pink
    glowColor: "rgba(236, 72, 153, 0.25)",
    borderColor: "rgba(236, 72, 153, 0.4)",
  },
  {
    number: "04",
    title: "Development",
    description: "Agile software development with regular demos and sprint reviews.",
    icon: Code2,
    color: "#3B82F6", // Blue
    glowColor: "rgba(59, 130, 246, 0.25)",
    borderColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    number: "05",
    title: "Quality Assurance",
    description: "Comprehensive testing for functionality, performance, usability, and security.",
    icon: ShieldCheck,
    color: "#10B981", // Emerald
    glowColor: "rgba(16, 185, 129, 0.25)",
    borderColor: "rgba(16, 185, 129, 0.4)",
  },
  {
    number: "06",
    title: "Deployment",
    description: "Cloud deployment, CI/CD, monitoring, and launch support.",
    icon: Rocket,
    color: "#F59E0B", // Amber
    glowColor: "rgba(245, 158, 11, 0.25)",
    borderColor: "rgba(245, 158, 11, 0.4)",
  },
  {
    number: "07",
    title: "Continuous Support",
    description: "Maintenance, feature enhancements, optimization, and scaling.",
    icon: HeartHandshake,
    color: "#EF4444", // Red/Rose
    glowColor: "rgba(239, 68, 68, 0.25)",
    borderColor: "rgba(239, 68, 68, 0.4)",
  },
];

export const DevelopmentProcessSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [isAutoCyclePaused, setIsAutoCyclePaused] = useState(false);
  const autoCycleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isAutoCyclePaused) return;

    const interval = setInterval(() => {
      setActiveMobileIndex((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoCyclePaused]);

  const handleMobileNodeClick = (index: number) => {
    setActiveMobileIndex(index);
    setIsAutoCyclePaused(true);

    if (autoCycleTimeoutRef.current) {
      clearTimeout(autoCycleTimeoutRef.current);
    }

    autoCycleTimeoutRef.current = setTimeout(() => {
      setIsAutoCyclePaused(false);
    }, 12000); // Resume auto-cycling after 12 seconds of inactivity
  };

  useEffect(() => {
    return () => {
      if (autoCycleTimeoutRef.current) {
        clearTimeout(autoCycleTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="process" className="relative w-full max-w-[1400px] mx-auto rounded-3xl md:rounded-[48px] bg-[#0A0A0B] border border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] overflow-hidden py-10 px-4 md:py-20 md:px-12 flex flex-col items-center justify-center mt-6 scroll-mt-24 md:scroll-mt-32">
      
      {/* CSS Keyframes styles scoped to this component */}
      <style>{`
        /* Desktop Flow Pulse Animation */
        .signal-path-neon {
          stroke-dasharray: 80 1000;
          stroke-dashoffset: 80;
          animation: neon-flow-timeline 12s linear infinite;
          stroke-linecap: round;
        }
        @keyframes neon-flow-timeline {
          0% {
            stroke-dashoffset: 80;
          }
          90% {
            stroke-dashoffset: -1100;
          }
          100% {
            stroke-dashoffset: -1100;
          }
        }
        
        /* Node pulsing animation sequences */
        .node-pulse-ring {
          animation-duration: 12s;
          animation-iteration-count: infinite;
          animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
        }
        
        .pulse-ring-0 { animation-name: pulse-glow-0; }
        .pulse-ring-1 { animation-name: pulse-glow-1; }
        .pulse-ring-2 { animation-name: pulse-glow-2; }
        .pulse-ring-3 { animation-name: pulse-glow-3; }
        .pulse-ring-4 { animation-name: pulse-glow-4; }
        .pulse-ring-5 { animation-name: pulse-glow-5; }
        .pulse-ring-6 { animation-name: pulse-glow-6; }

        @keyframes pulse-glow-0 {
          0%, 100% { opacity: 0.15; stroke-width: 1px; }
          0%, 6% { opacity: 0.9; stroke-width: 2.5px; }
          12%, 99% { opacity: 0.15; stroke-width: 1px; }
        }
        @keyframes pulse-glow-1 {
          0%, 12% { opacity: 0.15; stroke-width: 1px; }
          13%, 19% { opacity: 0.9; stroke-width: 2.5px; }
          25%, 100% { opacity: 0.15; stroke-width: 1px; }
        }
        @keyframes pulse-glow-2 {
          0%, 25% { opacity: 0.15; stroke-width: 1px; }
          26%, 32% { opacity: 0.9; stroke-width: 2.5px; }
          38%, 100% { opacity: 0.15; stroke-width: 1px; }
        }
        @keyframes pulse-glow-3 {
          0%, 38% { opacity: 0.15; stroke-width: 1px; }
          39%, 45% { opacity: 0.9; stroke-width: 2.5px; }
          51%, 100% { opacity: 0.15; stroke-width: 1px; }
        }
        @keyframes pulse-glow-4 {
          0%, 51% { opacity: 0.15; stroke-width: 1px; }
          52%, 58% { opacity: 0.9; stroke-width: 2.5px; }
          64%, 100% { opacity: 0.15; stroke-width: 1px; }
        }
        @keyframes pulse-glow-5 {
          0%, 64% { opacity: 0.15; stroke-width: 1px; }
          65%, 71% { opacity: 0.9; stroke-width: 2.5px; }
          77%, 100% { opacity: 0.15; stroke-width: 1px; }
        }
        @keyframes pulse-glow-6 {
          0%, 77% { opacity: 0.15; stroke-width: 1px; }
          78%, 84% { opacity: 0.9; stroke-width: 2.5px; }
          90%, 100% { opacity: 0.15; stroke-width: 1px; }
        }

        /* Mobile Timeline Pulsing Dot Animation */
        @keyframes mobile-glow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        .mobile-dot-active {
          animation: mobile-glow 2s infinite ease-in-out;
        }

        /* Mobile Timeline Flow Path */
        .mobile-signal-path-neon {
          stroke-dasharray: 40 400;
          stroke-dashoffset: 40;
          animation: signal-flow-mobile 8s linear infinite;
          stroke-linecap: round;
        }
        @keyframes signal-flow-mobile {
          0% {
            stroke-dashoffset: 40;
          }
          100% {
            stroke-dashoffset: -760;
          }
        }
      `}</style>

      {/* Decorative Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Glowing background auroras */}
      <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-[#06B6D4]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[45%] bg-[#EC4899]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Header Container */}
      <div className="text-center mb-5 md:mb-16 max-w-2xl mx-auto z-10 relative">
        <h2 className="text-3xl md:text-4xl lg:text-4.5xl font-semibold tracking-tight text-white font-display leading-[1.15]">
          Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3D77] via-[#7DD3FC] to-[#F72585] font-semibold">
            Development Process
          </span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-400 font-sans leading-relaxed">
          How we transform complex concepts into robust, high-performance digital solutions.
        </p>
      </div>

      {/* Desktop Wavy Timeline (lg and up) */}
      <div className="relative w-full max-w-[1100px] aspect-[1100/500] hidden lg:block z-10">
        
        {/* SVG Flow Pipeline */}
        <svg
          viewBox="0 0 1100 500"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        >
          {/* Neon Filters */}
          <defs>
            <linearGradient id="neon-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="16%" stopColor="#8B5CF6" />
              <stop offset="33%" stopColor="#EC4899" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="66%" stopColor="#10B981" />
              <stop offset="83%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>

            <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dotted Leader Lines from Nodes to Cards */}
          {PROCESS_STEPS.map((step, idx) => {
            const isTop = idx % 2 === 0;
            const x = 100 + idx * 150;
            const y1 = isTop ? 150 : 350;
            const y2 = isTop ? 180 : 320;
            const isHovered = hoveredIndex === idx;

            return (
              <line
                key={`leader-${idx}`}
                x1={x}
                y1={y1}
                x2={x}
                y2={y2}
                stroke={isHovered ? step.color : "rgba(255, 255, 255, 0.1)"}
                strokeWidth={isHovered ? 2 : 1.5}
                strokeDasharray="4 4"
                filter={isHovered ? "url(#neon-glow)" : ""}
                className="transition-all duration-500"
              />
            );
          })}

          {/* Background Inactive Main Path */}
          <path
            d="M 100,180 C 175,180 175,320 250,320 C 325,320 325,180 400,180 C 475,180 475,320 550,320 C 625,320 625,180 700,180 C 775,180 775,320 850,320 C 925,320 925,180 1000,180"
            fill="none"
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth="4"
          />

          {/* Active Animated Pulse Path */}
          <path
            d="M 100,180 C 175,180 175,320 250,320 C 325,320 325,180 400,180 C 475,180 475,320 550,320 C 625,320 625,180 700,180 C 775,180 775,320 850,320 C 925,320 925,180 1000,180"
            fill="none"
            stroke="url(#neon-flow-grad)"
            strokeWidth="3"
            filter="url(#neon-glow)"
            className={`signal-path-neon ${hoveredIndex !== null ? "paused" : ""}`}
            style={{
              opacity: hoveredIndex !== null ? 0.15 : 0.85,
              transition: "opacity 0.5s ease",
            }}
          />

          {/* Individual Hover Path Segments to dynamically trace lines */}
          {PROCESS_STEPS.map((_step, idx) => {
            if (idx === PROCESS_STEPS.length - 1) return null;
            const startX = 100 + idx * 150;
            const startY = idx % 2 === 0 ? 180 : 320;
            const endX = startX + 150;
            const endY = idx % 2 === 0 ? 320 : 180;
            
            // Highlight this segment if either of its connected nodes is hovered
            const isSegmentHighlighted = hoveredIndex === idx || hoveredIndex === idx + 1;
            const color = hoveredIndex === idx ? PROCESS_STEPS[idx].color : (hoveredIndex === idx + 1 ? PROCESS_STEPS[idx + 1].color : "transparent");

            return (
              <path
                key={`segment-${idx}`}
                d={`M ${startX},${startY} C ${startX + 75},${startY} ${startX + 75},${endY} ${endX},${endY}`}
                fill="none"
                stroke={color}
                strokeWidth={3}
                filter="url(#neon-glow)"
                style={{
                  opacity: isSegmentHighlighted ? 0.9 : 0,
                  transition: "opacity 0.4s ease, stroke 0.4s ease",
                }}
              />
            );
          })}

          {/* Nodes along the path */}
          {PROCESS_STEPS.map((step, idx) => {
            const x = 100 + idx * 150;
            const y = idx % 2 === 0 ? 180 : 320;
            const isHovered = hoveredIndex === idx;

            return (
              <g key={`node-${idx}`} className="cursor-pointer">
                {/* Looping outer pulse ring */}
                <circle
                  cx={x}
                  cy={y}
                  r="12"
                  fill="none"
                  stroke={step.color}
                  className={`node-pulse-ring pulse-ring-${idx} ${hoveredIndex !== null ? "paused-anim" : ""}`}
                  style={{
                    opacity: isHovered ? 0.9 : undefined,
                    strokeWidth: isHovered ? "2.5px" : undefined,
                  }}
                />

                {/* Glow aura on hover */}
                {isHovered && (
                  <circle
                    cx={x}
                    cy={y}
                    r="18"
                    fill="none"
                    stroke={step.color}
                    strokeWidth="1"
                    opacity="0.5"
                    filter="url(#neon-glow)"
                  />
                )}

                {/* Inner active node */}
                <circle
                  cx={x}
                  cy={y}
                  r="5.5"
                  fill={isHovered ? "#FFFFFF" : step.color}
                  className="transition-colors duration-300"
                  filter={isHovered ? "url(#neon-glow)" : ""}
                />
              </g>
            );
          })}
        </svg>

        {/* HTML Card Components placed overlaying the nodes */}
        {PROCESS_STEPS.map((step, idx) => {
          const isTop = idx % 2 === 0;
          const Icon = step.icon;
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={`card-${idx}`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="absolute w-[180px] transition-all duration-500 ease-out z-20 group"
              style={{
                left: `calc(100px + ${idx * 150}px)`,
                transform: "translateX(-50%)",
                bottom: isTop ? "350px" : "auto",
                top: !isTop ? "350px" : "auto",
              }}
            >
              {/* Glassmorphism Card Wrapper */}
              <div
                className={`relative flex flex-col p-4 rounded-2xl bg-[#121214]/40 border backdrop-blur-md transition-all duration-500 cursor-default select-none ${
                  isHovered
                    ? "scale-[1.05] bg-[#121214]/80 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)]"
                    : "border-white/5"
                }`}
                style={{
                  borderColor: isHovered ? step.color : undefined,
                  boxShadow: isHovered ? `0 0 25px ${step.glowColor}` : undefined,
                }}
              >
                {/* Card Glow Backplate */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${step.color} 0%, transparent 70%)`,
                  }}
                />

                {/* Badge Header: Number and Icon */}
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <span
                    className="text-xs font-bold font-mono tracking-widest transition-colors duration-300"
                    style={{ color: isHovered ? step.color : "rgba(255,255,255,0.3)" }}
                  >
                    {step.number}
                  </span>
                  
                  <div
                    className="w-7.5 h-7.5 rounded-lg flex items-center justify-center border transition-all duration-500"
                    style={{
                      backgroundColor: isHovered ? step.glowColor : "rgba(255, 255, 255, 0.02)",
                      borderColor: isHovered ? step.color : "rgba(255, 255, 255, 0.05)",
                      color: isHovered ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                      boxShadow: isHovered ? `0 0 10px ${step.glowColor}` : "none",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Step Title */}
                <h3
                  className="text-sm font-semibold tracking-tight text-white leading-tight mb-1.5 transition-colors duration-300 relative z-10"
                  style={{ color: isHovered ? "#FFFFFF" : "rgba(255,255,255,0.9)" }}
                >
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[11px] text-gray-400 leading-relaxed font-normal relative z-10">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Wavy Landscape Timeline (lg and down) */}
      <div className="lg:hidden flex flex-col items-center w-full z-10 px-2 mt-1 gap-2">
        
        {/* SVG Landscape Flow Map */}
        <div className="relative w-full max-w-[380px] aspect-[380/210] bg-[#121214]/30 border border-white/5 rounded-3xl p-3 backdrop-blur-md overflow-hidden flex items-center justify-center">
          {/* Subtle glow behind the map */}
          <div className="absolute w-[180px] h-[180px] rounded-full bg-[#06B6D4]/5 blur-[50px] pointer-events-none" />

          <svg
            viewBox="0 0 380 210"
            className="w-full h-full overflow-visible"
          >
            {/* Definitions for Glow Filter */}
            <defs>
              <linearGradient id="mobile-flow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>

              <filter id="mobile-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Static Grey Path */}
            <path
              d="M 50,50 L 270,50 C 340,50 340,160 270,160 L 50,160"
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Animated Flowing Signal Line */}
            <path
              d="M 50,50 L 270,50 C 340,50 340,160 270,160 L 50,160"
              fill="none"
              stroke="url(#mobile-flow-grad)"
              strokeWidth="2.5"
              filter="url(#mobile-glow)"
              className="mobile-signal-path-neon"
            />

            {/* 7 Flow Nodes */}
            {PROCESS_STEPS.map((step, idx) => {
              let x = 0;
              let y = 0;
              let textAnchor: "inherit" | "end" | "start" | "middle" = "middle";
              let textX = 0;
              let textY = 0;

              if (idx === 0) { x = 50; y = 50; textX = 50; textY = 32; }
              else if (idx === 1) { x = 160; y = 50; textX = 160; textY = 32; }
              else if (idx === 2) { x = 270; y = 50; textX = 270; textY = 32; }
              else if (idx === 3) { x = 322; y = 105; textX = 340; textY = 108; textAnchor = "start"; }
              else if (idx === 4) { x = 270; y = 160; textX = 270; textY = 182; }
              else if (idx === 5) { x = 160; y = 160; textX = 160; textY = 182; }
              else if (idx === 6) { x = 50; y = 160; textX = 50; textY = 182; }

              const isActive = activeMobileIndex === idx;
              const shortLabels = ["Discovery", "Planning", "UI/UX", "Build", "QA/Test", "Launch", "Support"];
              const shortLabel = shortLabels[idx];

              return (
                <g
                  key={`mobile-node-${idx}`}
                  className="cursor-pointer select-none"
                  onClick={() => handleMobileNodeClick(idx)}
                >
                  {/* Ping Ring for active node */}
                  {isActive && (
                    <circle
                      cx={x}
                      cy={y}
                      r="16"
                      fill="none"
                      stroke={step.color}
                      strokeWidth="1.5"
                      className="animate-pulse"
                      style={{ opacity: 0.8 }}
                    />
                  )}

                  {/* Outer circle shape */}
                  <circle
                    cx={x}
                    cy={y}
                    r="11.5"
                    fill="#121214"
                    stroke={isActive ? step.color : "rgba(255, 255, 255, 0.15)"}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    style={{
                      filter: isActive ? `drop-shadow(0 0 4px ${step.color}80)` : "none",
                      transition: "all 0.3s ease",
                    }}
                  />

                  {/* Centered Step Number */}
                  <text
                    x={x}
                    y={y}
                    dy="3"
                    textAnchor="middle"
                    fill={isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.45)"}
                    style={{
                      fontSize: "9px",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {step.number}
                  </text>

                  {/* Label Text */}
                  <text
                    x={textX}
                    y={textY}
                    textAnchor={textAnchor}
                    fill={isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.35)"}
                    style={{
                      fontSize: "8.5px",
                      fontWeight: isActive ? "bold" : "600",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {shortLabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Details Card displaying active process details */}
        {(() => {
          const activeStep = PROCESS_STEPS[activeMobileIndex];
          const Icon = activeStep.icon;

          return (
            <div
              className="w-full max-w-[380px] p-4 rounded-2xl bg-[#121214]/60 border backdrop-blur-md flex flex-col transition-all duration-500 relative"
              style={{
                borderColor: activeStep.color,
                boxShadow: `0 0 25px ${activeStep.color}15`,
              }}
            >
              {/* Card Glow Backplate */}
              <div
                className="absolute inset-0 rounded-2xl opacity-10 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${activeStep.color} 0%, transparent 70%)`,
                }}
              />

              <div className="flex items-center gap-2.5 mb-2.5 relative z-10">
                {/* Step Number */}
                <span
                  className="text-sm font-bold font-mono tracking-wider transition-colors duration-300"
                  style={{ color: activeStep.color }}
                >
                  {activeStep.number}
                </span>

                {/* Icon */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center border transition-all duration-300"
                  style={{
                    backgroundColor: activeStep.glowColor,
                    borderColor: activeStep.color,
                    color: "#FFFFFF",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold tracking-tight text-white leading-tight">
                  {activeStep.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-300 leading-relaxed font-normal relative z-10 pl-1.5 border-l-2 border-white/5">
                {activeStep.description}
              </p>
              
              {/* Manual Indicator / Interaction guide */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5 text-[9px] text-gray-500 relative z-10">
                <span>Tap any node above to inspect</span>
                {isAutoCyclePaused ? (
                  <span className="text-[#06B6D4] animate-pulse">Paused (auto-resuming)</span>
                ) : (
                  <span className="animate-pulse text-zinc-500">Auto-playing...</span>
                )}
              </div>
            </div>
          );
        })()}
      </div>
      
    </section>
  );
};
