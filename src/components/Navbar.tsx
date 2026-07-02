import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface NavbarProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Navbar({ className, style }: NavbarProps) {
  const { scrollY } = useScroll();
  const [anchorRect, setAnchorRect] = useState<{ top: number } | null>(null);
  const [detached, setDetached] = useState(false);

  useEffect(() => {
    const measure = () => {
      const anchor = document.getElementById("navbar-anchor");
      if (anchor) {
        const rect = anchor.getBoundingClientRect();
        setAnchorRect({
          top: rect.top + window.scrollY,
        });
      }
    };

    measure();
    // Wait a brief moment to ensure layout is fully settled after load
    const timer = setTimeout(measure, 100);

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, []);

  // Update detached state based on scroll position relative to the anchor
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (anchorRect) {
      const currentAnchorTopInViewport = anchorRect.top - latest;
      // Detached threshold: 24px from top of viewport
      setDetached(currentAnchorTopInViewport <= 24);
    }
  });

  // Calculate the y offset. When not detached, it tracks the anchor. When detached, it stays at 24px from the top.
  const y = useTransform(scrollY, (latest) => {
    if (!anchorRect) {
      // Set responsive initial fallback Y
      if (typeof window !== 'undefined') {
        return window.innerWidth < 768 ? 440 : 548;
      }
      return 548;
    }
    return Math.max(24, anchorRect.top - latest);
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Glassmorphic styles copied from the NeoNav sample, with optimized white opacity for text contrast
  const bgClasses = detached
    ? "bg-white/75 backdrop-blur-[20px] border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]"
    : "bg-white/90 backdrop-blur-[20px] border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.2)]";

  return (
    <motion.nav
      style={{
        ...style,
        top: 0,
        y,
        left: "50%",
        x: "-50%",
      }}
      animate={{
        scale: detached ? 0.985 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 28,
        mass: 0.8,
      }}
      className={`fixed z-50 flex flex-col items-center px-1 py-1 sm:px-1.5 sm:py-1.5 rounded-full transition-all duration-300 ease-out ${bgClasses} ${className || ''} w-[96%] min-[400px]:w-auto`}
    >
      {/* Main bar container */}
      <div className="flex items-center justify-between w-full gap-1.5 sm:gap-2">
        {/* Logo in circle container */}
        <button 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-9 h-9 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm select-none cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none shrink-0"
          aria-label="Scroll to top"
        >
          <img src="/dnd_logo.png" alt="DND Logo" className="w-[75%] h-[75%] object-contain" />
        </button>

        {/* Navigation Links */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-[10px] min-[360px]:text-[11px] sm:text-[12px] font-semibold text-slate-600 hover:text-[#FF3D77] px-1.5 py-1 sm:px-3 sm:py-1.5 cursor-pointer transition-colors duration-200 focus:outline-none whitespace-nowrap"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('industries')}
            className="text-[10px] min-[360px]:text-[11px] sm:text-[12px] font-semibold text-slate-600 hover:text-[#FF3D77] px-1.5 py-1 sm:px-3 sm:py-1.5 cursor-pointer transition-colors duration-200 focus:outline-none whitespace-nowrap"
          >
            Solutions
          </button>
          <button 
            onClick={() => scrollToSection('process')}
            className="hidden sm:inline-block text-[10px] min-[360px]:text-[11px] sm:text-[12px] font-semibold text-slate-600 hover:text-[#FF3D77] px-1.5 py-1 sm:px-3 sm:py-1.5 cursor-pointer transition-colors duration-200 focus:outline-none whitespace-nowrap"
          >
            Process
          </button>
          <button 
            onClick={() => scrollToSection('faq')}
            className="hidden sm:inline-block text-[10px] min-[360px]:text-[11px] sm:text-[12px] font-semibold text-slate-600 hover:text-[#FF3D77] px-1.5 py-1 sm:px-3 sm:py-1.5 cursor-pointer transition-colors duration-200 focus:outline-none whitespace-nowrap"
          >
            FAQ
          </button>
        </div>

        {/* Right side controls: Get in touch */}
        <div className="flex items-center shrink-0">
          <button 
            onClick={() => {
              scrollToSection('contact');
            }}
            className="flex items-center gap-0.5 sm:gap-1 bg-white px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-[12px] font-semibold text-[#0a1b33] border border-slate-200/60 shadow-sm hover:border-slate-300 hover:text-[#FF3D77] cursor-pointer transition-all focus:outline-none whitespace-nowrap"
          >
            Get in touch
            <ChevronRight className="w-3.5 h-3.5 hidden sm:inline-block" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
