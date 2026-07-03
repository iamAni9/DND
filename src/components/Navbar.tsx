import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { ChevronRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  className?: string;
  style?: React.CSSProperties;
}

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'industries', label: 'Solutions' },
  { id: 'process', label: 'Process' },
  { id: 'faq', label: 'FAQ' },
];

export function Navbar({ className, style }: NavbarProps) {
  const { scrollY } = useScroll();
  const [anchorRect, setAnchorRect] = useState<{ top: number } | null>(null);
  const [detached, setDetached] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Track breakpoint — below 768px we switch to the fixed-top hamburger layout
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const measure = () => {
      const anchor = document.getElementById('navbar-anchor');
      if (anchor) {
        const rect = anchor.getBoundingClientRect();
        setAnchorRect({
          top: rect.top + window.scrollY,
        });
      }
    };

    measure();
    const timer = setTimeout(measure, 100);

    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
    };
  }, []);

  // Desktop: detach once the anchor scrolls within 24px of the top.
  // Mobile: detach once user scrolls down past 40px, matching saysskinn reference.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (isMobile) {
      setDetached(latest > 40);
      return;
    }
    if (anchorRect) {
      const currentAnchorTopInViewport = anchorRect.top - latest;
      setDetached(currentAnchorTopInViewport <= 24);
    }
  });

  // Desktop: track the anchor, then hold at 24px once scrolled past.
  // Mobile: handled by the animate prop directly (switches between 0 and 12).
  const desktopY = useTransform(scrollY, (latest) => {
    if (!anchorRect) {
      if (typeof window !== 'undefined') {
        return window.innerWidth < 768 ? 440 : 548;
      }
      return 548;
    }
    return Math.max(24, anchorRect.top - latest);
  });

  // Sync mobile detached state on mount / media query changes
  useEffect(() => {
    if (isMobile) {
      setDetached(scrollY.get() > 40);
    }
  }, [isMobile, scrollY]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -90;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 120);
  };

  // Close the mobile menu automatically if the viewport grows past the breakpoint
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const bgClasses = detached
    ? 'bg-white/75 backdrop-blur-[20px] border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]'
    : 'bg-white/90 backdrop-blur-[20px] border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.2)]';

  return (
    <motion.nav
      style={{
        ...style,
        top: 0,
        left: '50%',
        x: '-50%',
        zIndex: 99999,
        ...(isMobile ? {} : { y: desktopY }),
      }}
      animate={isMobile ? {
        y: detached ? 32 : 16,
        width: detached ? '75%' : '92%',
        borderRadius: '28px',
        scale: detached ? 0.97 : 1,
      } : {
        scale: detached ? 0.985 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 28,
        mass: 0.8,
      }}
      className={`fixed z-50 flex flex-col items-center px-1 py-1 sm:px-1.5 sm:py-1.5 transition-[background-color,border-color,box-shadow,padding,border-radius] duration-300 ease-out ${bgClasses} ${className || ''} ${
        isMobile
          ? ''
          : `rounded-[28px] w-[92%] md:w-auto ${menuOpen ? '!rounded-[28px]' : ''}`
      }`}
    >
      {/* Main bar container */}
      <div className="flex items-center justify-between w-full gap-1.5 sm:gap-2">
        {/* Logo in circle container */}
        <button
          onClick={() => {
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-9 h-9 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm select-none cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none shrink-0"
          aria-label="Scroll to top"
        >
          <img src="/dnd_logo.png" alt="DND Logo" className="w-[75%] h-[75%] object-contain" />
        </button>

        {/* Desktop nav links — hidden below md, replaced by hamburger */}
        <div className="hidden md:flex items-center gap-0.5 sm:gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-[11px] sm:text-[12px] font-semibold text-slate-600 hover:text-[#FF3D77] px-1.5 py-1 sm:px-3 sm:py-1.5 cursor-pointer transition-colors duration-200 focus:outline-none whitespace-nowrap"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile center brand text */}
        <div className="md:hidden flex items-center justify-center font-display font-semibold text-[15px] tracking-tight select-none">
          <span className="text-[#0a1b33]">Dev</span>
          <span className="text-[#3b82f6]">Next</span>
          <span className="text-[#0a1b33]">Door</span>
        </div>

        {/* Right side: Get in touch on desktop, hamburger toggle on mobile */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden md:flex items-center gap-0.5 sm:gap-1 bg-white px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-[12px] font-semibold text-[#0a1b33] border border-slate-200/60 shadow-sm hover:border-slate-300 hover:text-[#FF3D77] cursor-pointer transition-all focus:outline-none whitespace-nowrap"
          >
            Get in touch
            <ChevronRight className="w-3.5 h-3.5 hidden sm:inline-block" />
          </button>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-[#0a1b33] hover:bg-slate-100/70 cursor-pointer transition-colors duration-200 focus:outline-none"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full overflow-hidden md:hidden"
          >
            <div className="flex flex-col items-stretch gap-1 px-2 pt-2 pb-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-[14px] font-semibold text-slate-700 hover:text-[#FF3D77] px-3 py-2.5 rounded-2xl hover:bg-slate-100/70 cursor-pointer transition-colors duration-200 focus:outline-none"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center justify-center gap-1 mt-1 bg-[#0a152d] text-white px-4 py-3 rounded-2xl text-[14px] font-semibold shadow-sm cursor-pointer transition-colors focus:outline-none"
              >
                Get in touch
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}