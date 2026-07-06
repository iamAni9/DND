import { motion } from "motion/react";

interface HeroSectionProps {
  onBookConsultation?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookConsultation }) => {
  return (
    <section className="relative w-full max-w-[1400px] mx-auto mt-[48px] md:mt-0 rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] bg-white border border-slate-200/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col lg:min-h-[600px]">
      {/* Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <video
          src="https://cnd.devnextdoor.com/videos/dnd_animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="https://cnd.devnextdoor.com/videos/dnd_animation_poster.jpg"
          className="w-full h-full object-cover object-[75%_center] sm:object-[70%_center] md:object-right lg:object-center scale-105 opacity-60 sm:opacity-75 md:opacity-100 transition-opacity duration-1000"
        />

        {/* Legibility scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent sm:hidden" />
      </div>

      {/* Content Wrapper — Symmetrical internal padding fixed for mobile/tablet grids */}
      <div className="relative z-20 flex-1 px-6 sm:px-12 md:px-16 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 md:pb-36 flex flex-col items-start justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[1000px] w-full flex flex-col items-start"
        >
          {/* Headline */}
          <h1 className="font-display text-[30px] sm:text-[42px] md:text-[50px] lg:text-[56px] font-medium tracking-tight text-[#0a1b33] leading-[1.18] sm:leading-[1.15] text-left max-w-full lg:max-w-[750px]">
            Custom Software, AI &amp; Digital Solutions That Drive Business
            Growth
          </h1>

          {/* Subheadline */}
          <p className="font-sans text-[15px] sm:text-[18px] md:text-[19px] text-[#475569] text-left mt-4 sm:mt-5 leading-relaxed max-w-full md:max-w-[540px]">
            From strategy to deployment, DevNextDoor builds high-performing
            software and AI-powered applications engineered to scale your
            business.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookConsultation}
              className="bg-[#0a152d] text-white rounded-full px-6 py-3.5 text-[14px] font-semibold shadow-sm hover:shadow-md cursor-pointer text-center justify-center transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a152d]/40 focus-visible:ring-offset-2 w-full sm:w-auto"
            >
              Book a Free Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/90 sm:bg-white/80 backdrop-blur-md text-[#0a1b33] border border-slate-200/80 rounded-full px-6 py-3.5 text-[14px] font-semibold shadow-sm hover:bg-slate-50 cursor-pointer text-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 w-full sm:w-auto"
            >
              View Our Work
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Bottom Navbar Anchor */}
      <div
        id="navbar-anchor"
        className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-max max-w-[92%] h-[52px] pointer-events-none opacity-0 z-30"
      />
    </section>
  );
};