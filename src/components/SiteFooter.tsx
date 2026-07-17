import React from "react";
import { ParticleLogoSection } from "./ParticleLogoSection";
import { InteractiveNimbu } from "./InteractiveNimbu";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const SiteFooter: React.FC = () => {
  return (
    <footer className="site-footer">
      <style dangerouslySetInnerHTML={{
        __html: `
        .site-footer {
          position: relative;
          z-index: 100;
          overflow: hidden;
          background-color: #ffffff;
          color: #0a1b33;
          width: calc(100% - 24px);
          max-width: 1400px;
          margin: 2rem auto 1rem auto;
          border: 1px solid rgba(148, 163, 184, 0.15);
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.02);
          border-radius: 32px;
          font-family: "Mazzard H", "Geist", "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
        }

        @media (min-width: 640px) {
          .site-footer {
            width: calc(100% - 32px);
            border-radius: 40px;
            margin-top: 3rem;
          }
        }

        @media (min-width: 1024px) {
          .site-footer {
            width: 100%;
            border-radius: 48px;
          }
        }

        .footer-dots {
          position: relative;
          height: 100px;
          overflow: hidden;
          background-color: #ffffff;
        }

        @media (min-width: 768px) {
          .footer-dots {
            height: 120px;
          }
        }

        .footer-dots__line {
          position: absolute;
          left: 0;
          top: 50%;
          width: 200%;
          height: 70px;
          opacity: 0.75;
          transform: translateY(-50%);
          background-image: 
            radial-gradient(circle, rgba(10, 27, 51, 0.25) 1.5px, transparent 2px),
            radial-gradient(circle, rgba(10, 27, 51, 0.12) 1px, transparent 1.5px),
            radial-gradient(circle, rgba(10, 27, 51, 0.18) 1.2px, transparent 1.8px);
          background-position: 0 8px, 24px 22px, 48px 14px;
          background-size: 72px 38px, 110px 44px, 160px 52px;
          animation: footerDotsMove 18s linear infinite;
        }

        @keyframes footerDotsMove {
          from { transform: translate3d(0, -50%, 0); }
          to   { transform: translate3d(-50%, -50%, 0); }
        }

        .site-footer__inner {
          width: 100%;
          padding: clamp(32px, 5vw, 64px) 24px clamp(20px, 3vw, 32px);
          margin: 0 auto;
          box-sizing: border-box;
        }

        @media (min-width: 640px) {
          .site-footer__inner {
            padding-left: 40px;
            padding-right: 40px;
          }
        }

        @media (min-width: 1024px) {
          .site-footer__inner {
            padding-left: 48px;
            padding-right: 48px;
          }
        }

        .site-footer__top {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 480px) {
          .site-footer__top {
            grid-template-columns: repeat(2, 1fr);
            gap: 36px 24px;
          }
        }

        @media (min-width: 980px) {
          .site-footer__top {
            grid-template-columns: minmax(280px, 1.2fr) repeat(3, minmax(130px, 0.45fr));
            gap: clamp(24px, 3vw, 64px);
          }
        }

        .site-footer__top h2 {
          grid-column: 1 / -1;
          margin: 0;
          color: #0a1b33;
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        @media (min-width: 980px) {
          .site-footer__top h2 {
            grid-column: auto;
            max-width: 480px;
          }
        }

        .site-footer__nav {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .site-footer__nav {
            gap: clamp(12px, 1.2vw, 18px);
          }
        }

        .site-footer__nav-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(10, 27, 51, 0.55);
          margin-bottom: 2px;
        }

        .site-footer__nav a {
          color: rgba(10, 27, 51, 0.8);
          font-size: 15px;
          font-weight: 600;
          line-height: 1.2;
          transition: color 180ms ease, transform 180ms ease;
          text-decoration: none;
          cursor: pointer;
        }

        .site-footer__nav a:hover {
          color: #FF3D77;
          transform: translateX(3px);
        }

        .site-footer__brand-row {
          width: 100%;
          margin-top: clamp(32px, 5vw, 56px);
          border-top: 1px solid rgba(10, 27, 51, 0.06);
          padding-top: 24px;
        }

        .site-footer__brand {
          display: flex;
          align-items: center;
          width: 100%;
          color: #0a1b33;
          text-decoration: none;
        }

        .site-footer__mark {
          position: relative;
          flex: 0 0 clamp(40px, 6vw, 72px);
          aspect-ratio: 1;
          margin-right: 16px;
          overflow: hidden;
          border-radius: 50%;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(10, 27, 51, 0.08);
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
        }

        .site-footer__logo-img {
          width: 65%;
          height: 65%;
          object-fit: contain;
          display: block;
        }

        .site-footer__legal {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          margin-top: 24px;
          border-top: 1px solid rgba(10, 27, 51, 0.06);
          padding-top: 20px;
          color: rgba(10, 27, 51, 0.5);
          font-size: 12px;
        }

        @media (min-width: 640px) {
          .site-footer__legal {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-top: none;
            padding-top: 0;
            margin-top: clamp(20px, 3vw, 32px);
            font-size: 13px;
          }
        }

        .site-footer__legal-links {
          display: flex;
          gap: 20px;
        }

        .site-footer__legal p {
          margin: 0;
        }

        .site-footer__legal a {
          color: inherit;
          text-decoration: none;
          transition: color 180ms ease;
        }

        .site-footer__legal a:hover {
          color: #FF3D77;
        }
      ` }} />

      {/* ANIMATED DOTS STRIP */}
      <div className="footer-dots" aria-hidden="true">
        <div className="footer-dots__line"></div>
      </div>

      {/* Interactive Nimbu Mascot */}
      <InteractiveNimbu />

      {/* FOOTER INNER */}
      <div className="site-footer__inner">
        {/* TOP GRID */}
        <div className="site-footer__top">
          {/* H2 */}
          <h2>Proven Digital Solutions &amp; Intelligent Systems.</h2>

          {/* Navigation Column 1: Services */}
          <nav className="site-footer__nav" aria-label="Services navigation">
            <span className="site-footer__nav-title">Services</span>
            <a href="#services-custom">Custom Software</a>
            <a href="#services-ai">AI &amp; Machine Learning</a>
            <a href="#services-saas">SaaS Development</a>
            <a href="#services-cloud">Cloud Solutions</a>
            <a href="#services-apps">Web &amp; Mobile Apps</a>
          </nav>

          {/* Navigation Column 2: Company */}
          <nav className="site-footer__nav" aria-label="Footer navigation">
            <span className="site-footer__nav-title">Company</span>
            <a href="#about">About Us</a>
            <a href="#team">Our Team</a>
            <a href="#process">Our Process</a>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact Us</a>
          </nav>

          {/* Navigation Column 3: Connect */}
          <nav className="site-footer__nav" aria-label="Social links">
            <span className="site-footer__nav-title">Connect</span>

            {/* Desktop Links (Hidden on mobile) */}
            <div className="hidden sm:flex flex-col gap-3">
              <a href="https://www.linkedin.com/company/devnextdooooor/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer">
                Twitter / X
              </a>
              <a href="https://www.instagram.com/devnextdoor._/" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>

            {/* Mobile Logos (Visible on mobile only) */}
            <div className="flex sm:hidden flex-row gap-3 mt-1">
              <a
                href="https://www.linkedin.com/company/devnextdooooor/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-700 hover:text-[#FF3D77] transition-all hover:scale-105"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-700 hover:text-[#FF3D77] transition-all hover:scale-105"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/devnextdoor._/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-700 hover:text-[#FF3D77] transition-all hover:scale-105"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>

          </nav>
        </div>

        {/* BRAND ROW */}
        <div className="site-footer__brand-row">
          <div className="site-footer__brand">
            {/* Brand mark */}
            <div className="site-footer__mark" aria-hidden="true">
              <img src="/dnd_logo.png" alt="DND Logo" className="site-footer__logo-img" />
            </div>
            {/* Brand wordmark - Animated Particles */}
            <div className="flex-1 min-w-0 h-[clamp(50px,8vw,120px)] relative">
              <ParticleLogoSection />
            </div>
          </div>
        </div>

        {/* LEGAL LINE */}
        <div className="site-footer__legal">
          <p>© 2026 Dev Next Door. All rights reserved.</p>
          <div className="site-footer__legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};