import React from "react";
import { motion } from "motion/react";
import { Sparkles, Zap } from "lucide-react";
import { Creature } from "./Creature";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative w-full max-w-[1400px] mx-auto rounded-3xl md:rounded-[48px] bg-[#0A0A0B] border border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] overflow-hidden py-10 px-4 md:py-16 md:px-16 flex flex-col items-center justify-center mt-6">
      {/* Decorative background grid and glowing patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Glowing background auroras */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF3D77]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#06B6D4]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Single Card Wrapper */}
      <div className="relative flex flex-col justify-start items-start w-full max-w-[936px] group mx-auto z-10">
        
        {/* Glow Background behind the card (Crucial) */}
        <div 
          className="absolute inset-0 opacity-40 rounded-2xl md:rounded-[40px] pointer-events-none z-0 filter blur-[50px] transition-opacity duration-700 group-hover:opacity-65 animate-spin-border"
          style={{
            background: "conic-gradient(from var(--border-angle), #FF3D77 0%, #7DD3FC 33%, #F72585 66%, #FF3D77 100%)",
          }}
        />

        {/* Foreground Card with Gradient Border (Crucial) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative z-10 w-full rounded-2xl md:rounded-[40px] overflow-hidden border-4 md:border-8 border-transparent animate-spin-border self-stretch"
          style={{
            background: "linear-gradient(#121214, #121214) padding-box, conic-gradient(from var(--border-angle), #FF3D77 0%, #7DD3FC 33%, #F72585 66%, #FF3D77 100%) border-box",
          }}
        >
          {/* Mobile Background Creature (reduced size, low opacity, behind text) */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-25 scale-[0.65] md:hidden [&_*]:pointer-events-none">
            <Creature />
          </div>

          {/* Card Inner Content Layout */}
          <div className="w-full h-full p-5 md:p-12 lg:p-16 flex flex-col justify-between bg-transparent relative z-10">
            
            {/* Header: Badge & Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 w-full">
              
              {/* Left Column: Badge and Headline */}
              <div className="lg:col-span-5 flex flex-col justify-start items-start">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-sky-400 tracking-wider uppercase mb-4 md:mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#7DD3FC] animate-pulse" />
                  About Dev Next Door
                </div>

                {/* Headline */}
                <h2 className="text-white font-medium text-2.5xl md:text-4xl lg:text-4.5xl leading-[1.15] tracking-tight text-left">
                  We Build Software That{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3D77] via-[#7DD3FC] to-[#F72585] font-semibold">
                    Solves Real Business Problems
                  </span>
                </h2>

                {/* Interactive Swarm Feature */}
                <div className="hidden md:block w-full">
                  <Creature />
                </div>
              </div>

              {/* Right Column: Paragraph Descriptions & Mission statement */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Paragraphs */}
                <div className="flex flex-col gap-4 text-gray-400 text-[14px] md:text-[16px] leading-[1.7] font-normal selection:bg-white/20">
                  <p>
                    Dev Next Door is more than a software development agency—we are your{" "}
                    <span className="text-white font-medium">technology partner</span>.
                  </p>
                  <p className="hidden md:block">
                    Our experienced developers, designers, architects, and AI engineers collaborate closely with clients to create software that improves operational efficiency, enhances customer experiences, and unlocks new revenue opportunities.
                  </p>
                  <p>
                    From concept and strategy to deployment and long-term support, we help businesses confidently navigate digital transformation.
                  </p>
                </div>

                {/* Subtle Divider */}
                <div className="h-px w-full bg-white/10 mt-2" />

                {/* Mission Callout */}
                <div className="flex flex-col gap-2.5 mt-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[#FF3D77] uppercase">
                    <Zap className="w-3.5 h-3.5 text-[#FF3D77] animate-pulse fill-[#FF3D77]/20" />
                    Our Mission
                  </div>
                  <div className="text-white text-base md:text-lg font-medium tracking-tight leading-snug">
                    Deliver exceptional software that creates{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3D77] via-[#7DD3FC] to-[#F72585] font-semibold">
                      measurable business impact.
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
