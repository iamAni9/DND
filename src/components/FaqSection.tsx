import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle, MessageSquare, Aperture } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How much does software development cost?",
    answer:
      "Pricing depends on project scope, complexity, integrations, and timelines. Contact us for a customized estimate.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Most MVPs take 8–16 weeks. Enterprise projects vary depending on requirements.",
  },
  {
    question: "Do you provide maintenance?",
    answer:
      "Yes. We offer long-term support, monitoring, optimization, and feature development.",
  },
  {
    question: "Can you modernize legacy applications?",
    answer:
      "Yes. We upgrade existing systems, migrate applications to the cloud, improve performance, and integrate AI capabilities.",
  },
];

export const FaqSection: React.FC = () => {
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({
    0: true, // Open the first FAQ by default
  });

  const toggleItem = (index: number) => {
    setOpenStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section id="faq" className="relative w-full max-w-6xl mx-auto py-1 md:py-12 px-4 md:px-6 flex flex-col mt-6 gap-8 scroll-mt-24 md:scroll-mt-32">
      {/* Scoped CSS for the special custom Ask a Question button */}
      <style>{`
        .button {
          cursor: pointer;
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: all 0.25s ease;
          background: radial-gradient(65.28% 65.28% at 50% 100%,
              rgba(99, 102, 241, 0.8) 0%,
              rgba(99, 102, 241, 0) 100%),
            linear-gradient(0deg, #4f46e5, #4f46e5);
          border-radius: 9999px;
          border: none;
          outline: none;
          padding: 8px 18px;
          min-height: 36px;
          min-width: 90px;
        }

        .button::before,
        .button::after {
          content: "";
          position: absolute;
          transition: all 0.5s ease-in-out;
          z-index: 0;
        }

        .button::before {
          inset: 1px;
          background: linear-gradient(177.95deg,
              rgba(255, 255, 255, 0.19) 0%,
              rgba(255, 255, 255, 0) 100%);
          border-radius: 9999px;
        }

        .button::after {
          inset: 2px;
          background: radial-gradient(65.28% 65.28% at 50% 100%,
              rgba(99, 102, 241, 0.8) 0%,
              rgba(99, 102, 241, 0) 100%),
            linear-gradient(0deg, #4f46e5, #4f46e5);
          border-radius: 9999px;
        }

        .button:active {
          transform: scale(0.95);
        }

        .button .points_wrapper {
          overflow: hidden;
          width: 100%;
          height: 100%;
          pointer-events: none;
          position: absolute;
          z-index: 1;
        }

        .button .points_wrapper .point {
          bottom: -8px;
          position: absolute;
          animation: floating-points infinite ease-in-out;
          pointer-events: none;
          width: 1.5px;
          height: 1.5px;
          background-color: #fff;
          border-radius: 9999px;
        }

        @keyframes floating-points {
          0% {
            transform: translateY(0);
          }

          85% {
            opacity: 0;
          }

          100% {
            transform: translateY(-40px);
            opacity: 0;
          }
        }

        .button .points_wrapper .point:nth-child(1) {
          left: 10%;
          opacity: 1;
          animation-duration: 2.35s;
          animation-delay: 0.2s;
        }

        .button .points_wrapper .point:nth-child(2) {
          left: 30%;
          opacity: 0.7;
          animation-duration: 2.5s;
          animation-delay: 0.5s;
        }

        .button .points_wrapper .point:nth-child(3) {
          left: 25%;
          opacity: 0.8;
          animation-duration: 2.2s;
          animation-delay: 0.1s;
        }

        .button .points_wrapper .point:nth-child(4) {
          left: 44%;
          opacity: 0.6;
          animation-duration: 2.05s;
        }

        .button .points_wrapper .point:nth-child(5) {
          left: 50%;
          opacity: 1;
          animation-duration: 1.9s;
        }

        .button .points_wrapper .point:nth-child(6) {
          left: 75%;
          opacity: 0.5;
          animation-duration: 1.5s;
          animation-delay: 1.5s;
        }

        .button .points_wrapper .point:nth-child(7) {
          left: 88%;
          opacity: 0.9;
          animation-duration: 2.2s;
          animation-delay: 0.2s;
        }

        .button .points_wrapper .point:nth-child(8) {
          left: 58%;
          opacity: 0.8;
          animation-duration: 2.25s;
          animation-delay: 0.2s;
        }

        .button .points_wrapper .point:nth-child(9) {
          left: 98%;
          opacity: 0.6;
          animation-duration: 2.6s;
          animation-delay: 0.1s;
        }

        .button .points_wrapper .point:nth-child(10) {
          left: 65%;
          opacity: 1;
          animation-duration: 2.5s;
          animation-delay: 0.2s;
        }

        .button .inner {
          z-index: 2;
          gap: 5px;
          position: relative;
          width: 100%;
          color: white;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.5;
          transition: color 0.2s ease-in-out;
        }

        .button .inner svg.icon {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
          stroke: white;
          fill: none;
        }

        .button:hover svg.icon {
          transform: translateX(2px);
        }

        .button:hover svg.icon path {
          animation: dash 0.8s linear forwards;
        }

        @keyframes dash {
          0% {
            stroke-dasharray: 0, 20;
            stroke-dashoffset: 0;
          }

          50% {
            stroke-dasharray: 10, 10;
            stroke-dashoffset: -5;
          }

          100% {
            stroke-dasharray: 20, 0;
            stroke-dashoffset: -10;
          }
        }
      `}</style>

      {/* Background blobs to enhance glassmorph effect */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-cyan-200/20 blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-200/20 blur-[80px] pointer-events-none z-0" />

      {/* Header */}
      <div className="flex items-center justify-between w-full z-10 relative">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/60 bg-white/80 shadow-xs text-indigo-600">
            <Aperture className="h-5.5 w-5.5 text-indigo-600" />
          </span>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0a1b33] font-display">
              Dev Next Door — Help &amp; FAQs
            </h2>
            <p className="mt-1 text-sm text-slate-500 font-sans">
              Quick answers about our services, process, and support.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 w-full z-10 relative">
        {FAQS.map((faq, index) => {
          const isOpen = !!openStates[index];
          return (
            <div
              key={index}
              className="rounded-2xl border border-white/50 bg-white/30 p-4 md:p-5 backdrop-blur-md transition-all duration-300 shadow-[0_8px_32px_0_rgba(31,38,135,0.02)] hover:bg-white/50 hover:shadow-[0_12px_40px_0_rgba(99,102,241,0.05)] hover:border-white/80 hover:translate-y-[-2px] flex flex-col justify-start select-none"
            >
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className="flex w-full items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
              >
                <span className="text-base md:text-lg font-semibold leading-6 tracking-tight text-[#0a1b33] font-sans">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200/60 bg-white text-slate-600 shadow-xs"
                >
                  {isOpen ? (
                    <Minus className="h-4 w-4 text-slate-600" />
                  ) : (
                    <Plus className="h-4 w-4 text-slate-600" />
                  )}
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 text-sm leading-6 text-slate-600 font-sans">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/50 bg-white/30 p-4 sm:flex-row w-full z-10 relative backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.02)]">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/60 bg-white text-indigo-600 shadow-xs">
            <HelpCircle className="h-5 w-5 text-indigo-600" />
          </span>
          <p className="text-sm text-slate-600 font-sans">
            Still have a question? We're here to help.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-all duration-200 cursor-pointer">
            <MessageSquare className="h-4 w-4" />
            Contact Support
          </button>

          <button type="button" className="button">
            <div className="points_wrapper">
              <i className="point"></i>
              <i className="point"></i>
              <i className="point"></i>
              <i className="point"></i>
              <i className="point"></i>
              <i className="point"></i>
              <i className="point"></i>
              <i className="point"></i>
              <i className="point"></i>
              <i className="point"></i>
            </div>
            <span className="inner font-sans">
              Ask a Question
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
