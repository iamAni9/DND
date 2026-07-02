import { motion } from "motion/react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full max-w-[1400px] mx-auto rounded-[48px] bg-white border border-slate-200/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] overflow-hidden min-h-[500px] md:h-[600px] pb-16 md:pb-0 flex flex-col">
      {/* Video Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <video
          src="https://cnd.devnextdoor.com/videos/dnd_animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 transition-transform duration-1000"
        />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-20 flex-1 px-8 md:px-16 pt-12 md:pt-16 flex flex-col items-start justify-start">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[850px] flex flex-col items-start"
        >
          {/* Headline */}
          <h1 className="font-display text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-medium tracking-tight text-[#0a1b33] leading-[1.15] text-left">
            Custom Software, AI &<br />
            Digital Solutions That Drive Business Growth
          </h1>

          {/* Subheadline */}
          <p className="font-sans text-[14px] md:text-[15px] text-[#64748b] text-left mt-6 leading-relaxed max-w-[700px]">
            <span className="font-semibold text-slate-700 block mb-1">
              Build faster, scale smarter, and innovate<br />with confidence.
            </span>
            <span className="hidden md:inline">
              From strategy to deployment, Dev Next Door builds custom software, AI-powered applications, SaaS platforms, and cloud solutions that help businesses innovate faster, streamline operations, and achieve sustainable growth.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#0a152d] text-white rounded-full px-6 py-3 text-[14px] font-semibold shadow-sm hover:shadow-md cursor-pointer transition-shadow duration-200 focus:outline-none"
            >
              Book a Free Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/70 backdrop-blur-md text-[#0a1b33] border border-slate-200/80 rounded-full px-6 py-3 text-[14px] font-semibold shadow-sm hover:bg-slate-50 cursor-pointer transition-all duration-200 focus:outline-none"
            >
              View Our Work
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Bottom Navbar Anchor */}
      <div
        id="navbar-anchor"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-max max-w-[92%] h-[52px] pointer-events-none opacity-0 z-30"
      />
    </section>
  );
};
