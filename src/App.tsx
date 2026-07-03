import { HeroSection } from "./components/HeroSection";
import { MarqueeScroller } from "./components/MarqueeScroller";
import { FreedomSection } from "./components/FreedomSection";
import { AboutSection } from "./components/AboutSection";
import { PrecisionSection } from "./components/PrecisionSection";
import { WhyChooseSection } from "./components/WhyChooseSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { IndustriesSection } from "./components/IndustriesSection";
import { Navbar } from "./components/Navbar";
import { DevelopmentProcessSection } from "./components/DevelopmentProcessSection";
import { FaqSection } from "./components/FaqSection";
import { ContactSection } from "./components/ContactSection";
import { SiteFooter } from "./components/SiteFooter";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full bg-[#f9fafb] py-12 px-4 md:px-8 flex flex-col justify-center items-center gap-4 relative">
        <HeroSection />
        <MarqueeScroller />
        <FreedomSection />
        <AboutSection />
        <PrecisionSection />
        <IndustriesSection />
        <DevelopmentProcessSection />
        <WhyChooseSection />
        <FinalCtaSection />
        <FaqSection />
        <ContactSection />
        <SiteFooter />
      </main>
    </>
  );
}
