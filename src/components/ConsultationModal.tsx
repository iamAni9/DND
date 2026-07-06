import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, RefreshCw, X, CheckCircle } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose
}) => {
  // Form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // UI state
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setErrorMsg("Name is required.");
      return;
    }
    if (!trimmedEmail) {
      setErrorMsg("Email is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!trimmedMessage) {
      setErrorMsg("Message is required.");
      return;
    }

    setStatus("sending");
    try {
      const isLocalhost =
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1" ||
          window.location.hostname.startsWith("192.168."));

      if (isLocalhost) {
        // Simulate local network delay and mock contact success
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Local Dev Mode: Mocked /api/contact endpoint submission.", {
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone || "Not provided",
          message: trimmedMessage
        });
        setStatus("success");
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          project_scope: `[CONSULTATION REQUEST]\nPhone: ${trimmedPhone || "Not provided"}\n\nInquiry: ${trimmedMessage}`,
          botcheck: false
        })
      });

      let data: any = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // Fallback for HTML or empty responses (typical local dev server fallback page or raw error)
        const errorText = await response.text();
        const snippet = errorText.substring(0, 100);
        throw new Error(snippet ? `Server Error: ${snippet}...` : `Request failed with status ${response.status}`);
      }

      if (response.ok && data.success) {
        setStatus("success");
      } else {
        throw new Error(data.error || "Failed to submit booking inquiry.");
      }
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || "Failed to send message. Please check your connection and try again.");
      setStatus("error");
    }
  };

  // Reset helper
  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setErrorMsg("");
    setStatus("idle");
  };

  // Reset modal fields on close
  useEffect(() => {
    if (!isOpen) {
      handleReset();
    }
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 pt-0 sm:pt-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#070b13]/85 backdrop-blur-[8px]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="card-top glass-effect w-[28rem] max-w-full h-auto overflow-hidden relative transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] bg-gradient-to-r from-white/10 to-white/5 rounded-[1.2em] shadow-[0_30px_70px_rgba(0,0,0,0.6)] border border-white/10"
            style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
          >
            {/* Gradients and radial glows */}
            <div
              className="absolute inset-0 rounded-[1.2em] border border-white/20 pointer-events-none"
              style={{
                maskImage: "linear-gradient(135deg, white, transparent 60%)",
                WebkitMaskImage: "linear-gradient(135deg, white, transparent 60%)"
              }}
            />
            <div
              className="absolute inset-0 border-white/10 border rounded-[1.2em] pointer-events-none"
              style={{
                maskImage: "linear-gradient(135deg, transparent 60%, white)",
                WebkitMaskImage: "linear-gradient(135deg, transparent 60%, white)"
              }}
            />
            <div className="pointer-events-none absolute -inset-px rounded-[1.3rem] bg-[radial-gradient(80%_60%_at_50%_0%,rgba(90,97,255,0.12),transparent_60%)]" />

            {/* Sleek Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/20"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Inner Content */}
            <div className="flex flex-col h-full p-6 pb-7 relative z-10">
              {/* Header Info */}
              <div className="mb-6 pr-6 select-none">
                <h1 className="text-2xl font-medium tracking-tight text-white font-sans">
                  Book a Free Consultation
                </h1>
                <p className="text-neutral-400 text-sm font-light mt-1 font-sans">
                  Let's discuss your project goals. We reply within one business day.
                </p>
              </div>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center py-6 space-y-4 select-none"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-lg font-medium text-white font-sans">Inquiry Received</h2>
                    <p className="text-neutral-400 text-sm font-light leading-relaxed font-sans max-w-sm">
                      Thank you for reaching out! We'll get back to you within 24 hours to schedule your strategy consultation.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-2 w-full bg-white text-slate-950 hover:bg-white/90 text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none"
                  >
                    Close Window
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="modal-name-input" className="text-xs font-medium text-neutral-300 font-sans select-none">
                      Name
                    </label>
                    <input
                      id="modal-name-input"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={status === "sending"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all disabled:opacity-50 font-sans"
                      autoComplete="off"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="modal-email-input" className="text-xs font-medium text-neutral-300 font-sans select-none">
                      Email
                    </label>
                    <input
                      id="modal-email-input"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "sending"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all disabled:opacity-50 font-sans"
                      autoComplete="off"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label htmlFor="modal-phone-input" className="text-xs font-medium text-neutral-300 font-sans select-none">
                      Phone Number <span className="text-neutral-500 text-[10px]">(Optional)</span>
                    </label>
                    <input
                      id="modal-phone-input"
                      type="tel"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={status === "sending"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all disabled:opacity-50 font-sans"
                      autoComplete="off"
                    />
                  </div>

                  {/* Message / inquiry field */}
                  <div className="space-y-1.5">
                    <label htmlFor="modal-msg-input" className="text-xs font-medium text-neutral-300 font-sans select-none">
                      What can we help you with?
                    </label>
                    <textarea
                      id="modal-msg-input"
                      placeholder="Describe your idea or project scope..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={status === "sending"}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all disabled:opacity-50 resize-none font-sans"
                    />
                  </div>

                  {/* Error Alert */}
                  {errorMsg && (
                    <div className="flex items-center gap-2 text-rose-500 text-xs bg-rose-500/10 border border-rose-500/20 rounded-lg p-2.5 select-none">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span className="font-sans leading-tight">{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-white text-slate-950 hover:bg-white/90 disabled:bg-white/50 text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 focus:outline-none select-none"
                  >
                    {status === "sending" ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <span>Book Free Consultation</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
