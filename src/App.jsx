import React from 'react'
import Navbar from '@/sections/Navbar'
import HeroSection from '@/sections/HeroSection'
import PhilosophySection from '@/sections/PhilosophySection'
import WorkSection from '@/sections/WorkSection'
import ContactSection from '@/sections/ContactSection'
import Footer from '@/sections/Footer'

function App() {
  return (
    <div style={styles.appWrapper}>
      <Navbar />
      <HeroSection />
      <PhilosophySection />
      <WorkSection />
      <ContactSection />
      <Footer />
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