import React from 'react'
import Navbar from '@/sections/Navbar'
import HeroSection from '@/sections/HeroSection'
import PhilosophySection from '@/sections/PhilosophySection'
import AdventureMap from '@/sections/AdventureMap'
import WorkSection from '@/sections/WorkSection'
import FAQSection from '@/sections/FAQSection'
import ReviewsSection from '@/sections/ReviewsSection'
import ContactSection from '@/sections/ContactSection'
import Footer from '@/sections/Footer'
import InteractiveBird from '@/components/InteractiveBird'

function App() {
  return (
    <div style={styles.appWrapper}>
      <Navbar />
      <HeroSection />
      <PhilosophySection />
      <AdventureMap />
      <FAQSection />
      <WorkSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
      <InteractiveBird />
    </div>
  )
}


const styles = {
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
  },
}

export default App