import React, { useEffect, useRef, useState } from "react";
import { useTypingPlaceholder } from "../hooks/useTypingPlaceholder";
import {
  CornerDownLeft,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Clock,
  ShoppingBag,
  MessageCircle
} from "lucide-react";

// Particle interface for background constellation
interface Particle {
  angle: number;
  maxLength: number;
  speed: number;
  phase: number;
  radius: number;
  opacity: number;
}

// Sub-component for the radiating constellation background inside the white card
const ConstellationCanvas: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    const particleCount = 110; // Denser network

    let cxCurrent = 0;
    let cyCurrent = 0;

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        // Distribute angles around the circle
        const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
        // Radial lengths matching the dense bursting structure in the image - made larger
        const maxLength = 80 + Math.random() * 260;
        particles.push({
          angle,
          maxLength,
          speed: 0.8 + Math.random() * 1.5,
          phase: Math.random() * Math.PI * 2,
          radius: 1.2 + Math.random() * 3.2, // Made dots larger
          opacity: 0.25 + Math.random() * 0.5 // Higher minimum opacity for better visibility
        });
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      cxCurrent = width / 2;
      cyCurrent = height / 2;
    };

    initParticles();
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);

    function animate() {
      if (!canvas || !ctx) return;
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // Target center of the starburst shifts dynamically towards mouse (parallax)
      const cxTarget = mouseRef.current.active 
        ? width / 2 + (mouseRef.current.x - width / 2) * 0.18
        : width / 2;
      const cyTarget = mouseRef.current.active 
        ? height / 2 + (mouseRef.current.y - height / 2) * 0.18
        : height / 2;

      // Smoothly interpolate the center coordinates
      cxCurrent += (cxTarget - cxCurrent) * 0.08;
      cyCurrent += (cyTarget - cyCurrent) * 0.08;

      const time = performance.now() * 0.0006;

      particles.forEach((p) => {
        // Starburst lines radiating outward
        const currentLength = p.maxLength * (0.85 + 0.15 * Math.sin(time * p.speed + p.phase));
        
        // Minor sway motion
        const swayX = Math.sin(time + p.phase) * 2;
        const swayY = Math.cos(time * 0.9 + p.phase) * 2;

        // Leave a hole in the center (radius 40px) to clear the space behind the terminal
        const rStart = 40;
        const xStart = cxCurrent + Math.cos(p.angle) * rStart;
        const yStart = cyCurrent + Math.sin(p.angle) * rStart;

        let xEnd = cxCurrent + Math.cos(p.angle) * currentLength + swayX;
        let yEnd = cyCurrent + Math.sin(p.angle) * currentLength + swayY;

        // Mouse attraction to the node points
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - xEnd;
          const dy = mouseRef.current.y - yEnd;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            // Pull slightly towards mouse
            xEnd += (dx / dist) * force * 15;
            yEnd += (dy / dist) * force * 15;
          }
        }

        // Draw line with dark slate/charcoal strokes for white background contrast - made more visible
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.strokeStyle = `rgba(15, 23, 42, ${p.opacity * 0.55})`; // Darker line stroke
        ctx.lineWidth = 0.95; // Thicker lines
        ctx.stroke();

        // Draw node dot
        ctx.beginPath();
        ctx.arc(xEnd, yEnd, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 23, 42, ${p.opacity * 0.95})`; // Darker filled dots
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
};

type TerminalStep = "name" | "email" | "message" | "sending" | "success";

export const ContactSection: React.FC = () => {
  const [step, setStep] = useState<TerminalStep>("name");

  // Form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // UI state
  const [errorMsg, setErrorMsg] = useState("");
  const [terminalInputVal, setTerminalInputVal] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  const namePlaceholder = useTypingPlaceholder([
    "Sai Patel",
    "Sarah Johnson",
    "Manoj Kumar"
  ]);

  const emailPlaceholder = useTypingPlaceholder([
    "sai@gmail.com",
    "founder@startup.com",
    "hello@company.com"
  ]);

  // const inquiryPlaceholder = useTypingPlaceholder([
  //   "Need an AI chatbot...",
  //   "Looking for a SaaS platform...",
  //   "Need a React developer...",
  //   "Want to redesign our website..."
  // ]);

  // Refs for scroll and focus management
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus active input on clicking terminal container
  const focusActiveInput = () => {
    setHasInteracted(true);
    if (step === "message") {
      textareaRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  };

  // Scroll to bottom of terminal content on updates
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [step, name, email, message, errorMsg]);

  // Focus input when step changes
  useEffect(() => {
    if (!hasInteracted) return;

    if (step !== "sending") {
      const timer = setTimeout(() => {
        if (step === "message") {
          textareaRef.current?.focus();
        } else {
          inputRef.current?.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [step, hasInteracted]);

  // Handle form field submissions
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const value = terminalInputVal.trim();

    if (step === "name") {
      if (!value) {
        setErrorMsg("Name is required.");
        return;
      }
      setName(value);
      setTerminalInputVal("");
      setStep("email");
    } else if (step === "email") {
      if (!value) {
        setErrorMsg("Email is required.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrorMsg("Invalid email format.");
        return;
      }
      setEmail(value);
      setTerminalInputVal("");
      setStep("message");
    } else if (step === "message") {
      if (!value) {
        setErrorMsg("Message is required.");
        return;
      }
      setMessage(value);
      setTerminalInputVal("");
      triggerSendInquiry(name, email, value);
    } else if (step === "success") {
      if (value.toLowerCase() === "restart") {
        resetTerminal();
      } else {
        setTerminalInputVal("");
      }
    }
  };

  // Send inquiry to backend API
  const triggerSendInquiry = async (clientName: string, clientEmail: string, projectScope: string) => {
    setStep("sending");
    setErrorMsg("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          project_scope: projectScope,
          botcheck: false,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStep("success");
      } else {
        throw new Error(data.error || "Something went wrong.");
      }
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || "Failed to send message. Please try again.");
      setStep("message");
      setTerminalInputVal(projectScope);
    }
  };

  // Reset helper
  const resetTerminal = () => {
    setName("");
    setEmail("");
    setMessage("");
    setTerminalInputVal("");
    setErrorMsg("");
    setStep("name");
  };

  return (
    <section
      id="contact"
      className="w-full max-w-[1400px] mx-auto mb-8 bg-[#0a0a0b] border border-white/5 rounded-[48px] py-12"
    >
      <div className="max-w-7xl sm:px-6 lg:px-8 mr-auto ml-auto pr-4 pl-4">
        {/* Dark container with glassmorphic border */}
        <div className="relative overflow-hidden bg-white/5 ring-white/10 ring-1 rounded-3xl backdrop-blur">
          
          <div className="relative z-10 md:p-12 lg:p-16 pt-8 pr-8 pb-8 pl-8">
            {/* Mobile Header (Hidden on lg screens) */}
            <div className="lg:hidden text-center mb-6">
              <h2 className="text-3xl font-semibold text-white tracking-tight font-sans">
                Start Your Project
              </h2>
              <p className="text-sm text-white/70 mt-1.5 font-sans">
                Fill this form
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Side: Form card (White background, containing radiating dark constellation + CLI Terminal) */}
              <div className="lg:col-span-5">
                <div 
                  id="contact-card" 
                  className="relative rounded-2xl bg-white/95 backdrop-blur ring-1 ring-white/20 shadow-lg p-4 sm:p-6 min-h-[460px] flex items-center justify-center overflow-hidden cursor-text"
                  onClick={focusActiveInput}
                >
                  {/* Dense Constellation/Starburst Canvas (Dark line structure in the background) */}
                  <ConstellationCanvas className="absolute inset-0 w-full h-full pointer-events-none" />

                  {/* Terminal CLI Window - Designed 100% same as the Password Prompt Image - Solid Opaque Background */}
                  <div className="relative z-10 w-full max-w-[270px] min-[370px]:max-w-[320px] md:max-w-[360px] rounded-lg bg-[#1e1f22] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col font-mono text-[12.5px] text-[#b4b7be] select-text">
                    
                    {/* Header bar matching the image - Solid Opaque Background */}
                    <div className="bg-[#2b2d31] px-4 py-2.5 border-b border-zinc-800/80 flex items-center relative select-none">
                      {/* Three gray dots on the left */}
                      <div className="flex items-center gap-1.5 absolute left-4 top-1/2 -translate-y-1/2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5c5e62]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5c5e62]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5c5e62]" />
                      </div>
                      
                      {/* Centered header text: /contact_form */}
                      <div className="w-full text-center text-[10.5px] tracking-widest text-[#a6aab0] lowercase font-mono font-semibold">
                        /contact_form
                      </div>
                    </div>

                    {/* Terminal Body content */}
                    <div 
                      ref={terminalContentRef}
                      className="p-5 min-h-[160px] flex flex-col justify-between space-y-3.5"
                    >
                      <div className="space-y-2.5 text-[#b4b7be]">
                        {/* History: Name output */}
                        {name && (
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[#a6aab0] font-bold">$</span>{" "}
                              <span className="text-zinc-500">name:</span>{" "}
                              <span className="text-[#e4e4e7]">{name}</span>
                            </div>
                            {(step === "email" || step === "message") && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStep("name");
                                  setTerminalInputVal(name);
                                }}
                                className="text-[10px] text-zinc-500 hover:text-white underline cursor-pointer"
                              >
                                [edit]
                              </button>
                            )}
                          </div>
                        )}

                        {/* History: Email output */}
                        {email && (
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[#a6aab0] font-bold">$</span>{" "}
                              <span className="text-zinc-500">email:</span>{" "}
                              <span className="text-[#e4e4e7]">{email}</span>
                            </div>
                            {step === "message" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStep("email");
                                  setTerminalInputVal(email);
                                }}
                                className="text-[10px] text-zinc-500 hover:text-white underline cursor-pointer"
                              >
                                [edit]
                              </button>
                            )}
                          </div>
                        )}

                        {/* Prompt input field or dynamic status display */}
                        {step === "name" && (
                          <form onSubmit={handleTerminalSubmit} className="flex items-center flex-wrap gap-x-2">
                            <span className="text-[#a6aab0] font-bold">$</span>
                            <label htmlFor="cli-name" className="text-zinc-500">name:</label>
                            <div className="relative flex-1">
                              <input
                                ref={inputRef}
                                id="cli-name"
                                type="text"
                                value={terminalInputVal}
                                onChange={(e) => setTerminalInputVal(e.target.value)}
                                onFocus={() => setHasInteracted(true)}
                                className="bg-transparent border-none outline-none text-[#e4e4e7] font-mono flex-1 caret-white p-0 m-0 focus:ring-0 focus:outline-none"
                                autoComplete="off"
                              />
                              {/* Blinking vertical cursor */}
                              {!terminalInputVal && (
                                  <span className="absolute left-0 top-0 text-zinc-500 pointer-events-none">
                                      {namePlaceholder}
                                      <span className="animate-pulse text-zinc-300">|</span>
                                  </span>
                              )}
                            </div>
                          </form>
                        )}

                        {step === "email" && (
                          <form onSubmit={handleTerminalSubmit} className="flex items-center flex-wrap gap-x-2">
                            <span className="text-[#a6aab0] font-bold">$</span>
                            <label htmlFor="cli-email" className="text-zinc-500">email:</label>
                            <div className="relative flex-1">
                              <input
                                ref={inputRef}
                                id="cli-email"
                                type="text"
                                value={terminalInputVal}
                                onChange={(e) => setTerminalInputVal(e.target.value)}
                                onFocus={() => setHasInteracted(true)}
                                className="bg-transparent border-none outline-none text-[#e4e4e7] font-mono flex-1 caret-white p-0 m-0 focus:ring-0 focus:outline-none"
                                autoComplete="off"
                              />
                              {!terminalInputVal && (
                                  <span className="absolute left-0 top-0 text-zinc-500 pointer-events-none">
                                      {emailPlaceholder}
                                      <span className="animate-pulse text-zinc-300">|</span>
                                  </span>
                              )}
                            </div>
                          </form>
                        )}

                        {step === "message" && (
                          <form onSubmit={handleTerminalSubmit} className="space-y-1">
                            <div className="flex items-center gap-x-2">
                              <span className="text-[#a6aab0] font-bold">$</span>
                              <label htmlFor="cli-msg" className="text-zinc-500">inquire:</label>
                            </div>
                            <div className="flex items-start">
                              <textarea
                                ref={textareaRef}
                                id="cli-msg"
                                value={terminalInputVal}
                                onChange={(e) => setTerminalInputVal(e.target.value)}
                                onFocus={() => setHasInteracted(true)}
                                placeholder=""
                                rows={2}
                                className="w-full bg-transparent border-none outline-none text-[#e4e4e7] font-mono caret-white p-0 m-0 resize-none focus:ring-0 focus:outline-none"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleTerminalSubmit(e);
                                  }
                                }}
                              />
                            </div>
                          </form>
                        )}

                        {step === "sending" && (
                          <div className="flex items-center gap-2 text-indigo-400 py-1 font-mono">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>transmitting data packet...</span>
                          </div>
                        )}

                        {step === "success" && (
                          <div className="space-y-2">
                            <div className="text-emerald-400 font-bold">$ transmission: success</div>
                            <div className="text-zinc-400 leading-relaxed text-[12px]">
                              Inquiry successfully received. We will respond within 24 hours.
                            </div>
                            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-x-2 pt-2 border-t border-zinc-800/40">
                              <span className="text-zinc-500 font-bold">$</span>
                              <input
                                ref={inputRef}
                                type="text"
                                value={terminalInputVal}
                                onChange={(e) => setTerminalInputVal(e.target.value)}
                                onFocus={() => setHasInteracted(true)}
                                placeholder="type 'restart' to clear"
                                className="bg-transparent border-none outline-none text-[#e4e4e7] font-mono flex-1 caret-white p-0 m-0 focus:ring-0 focus:outline-none placeholder:text-zinc-700 text-xs"
                                autoComplete="off"
                              />
                            </form>
                          </div>
                        )}
                      </div>

                      {/* Small inline input validation error */}
                      {errorMsg && (
                        <div className="flex items-center gap-1.5 text-rose-500 text-[11px] animate-pulse pt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errorMsg}</span>
                        </div>
                      )}

                      {/* Prompt buttons helper inside CLI terminal */}
                      {step !== "sending" && step !== "success" && (
                        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/40">
                          <span className="text-[10px] text-zinc-600 select-none">Press Enter to send</span>
                          <button
                            type="button"
                            onClick={handleTerminalSubmit}
                            className="px-2.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-[#cbd5e1] border border-white/5 rounded text-[11px] font-semibold cursor-pointer transition-colors flex items-center gap-1"
                          >
                            <span>Send</span>
                            <CornerDownLeft className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>

              {/* Right Side: Copy + Highlights (Hidden on mobile, visible on lg) */}
              <div className="lg:col-span-7 text-left hidden lg:block">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-semibold text-white tracking-tight font-sans">
                  Start Your Project
                </h2>
                <p className="text-base sm:text-lg max-w-2xl text-white/80 mt-4 font-sans leading-relaxed">
                  Let’s discuss your goals and build something exceptional together. 
                  We reply within one business day. Contact us today for a free consultation.
                </p>

                {/* Highlights grid matching original layout */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Highlight 1: Have an idea? */}
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur ring-1 ring-white/15 flex items-center justify-center text-white/90 shrink-0">
                      <Sparkles className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm font-sans">Have an idea?</p>
                      <p className="text-white/70 text-xs font-sans mt-0.5 leading-relaxed">We will help align technical architecture to realize your vision.</p>
                    </div>
                  </div>

                  {/* Highlight 2: Dedicated Team */}
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur ring-1 ring-white/15 flex items-center justify-center text-white/90 shrink-0">
                      <Clock className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm font-sans">Dedicated team</p>
                      <p className="text-white/70 text-xs font-sans mt-0.5 leading-relaxed">Senior-heavy developers ready to integrate into your workflow.</p>
                    </div>
                  </div>

                  {/* Highlight 3: AI Integration */}
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur ring-1 ring-white/15 flex items-center justify-center text-white/90 shrink-0">
                      <ShoppingBag className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm font-sans">AI Integration</p>
                      <p className="text-white/70 text-xs font-sans mt-0.5 leading-relaxed">Embed advanced LLMs, vector database lookups, and workflows.</p>
                    </div>
                  </div>

                  {/* Highlight 4: Free Consultation */}
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur ring-1 ring-white/15 flex items-center justify-center text-white/90 shrink-0">
                      <MessageCircle className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm font-sans">Free Consultation</p>
                      <p className="text-white/70 text-xs font-sans mt-0.5 leading-relaxed">Let's hop on a call to map milestones and delivery schedules.</p>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>  
    </section>
  );
};
