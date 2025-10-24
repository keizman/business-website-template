import React from 'react'
import { 
  Billing, 
  Business, 
  CardDeal, 
  Clients, 
  CTA, 
  Footer, 
  Hero, 
  Navbar, 
  Stats, 
  Testimonials 
} from './components'
import ScrollReveal from './components/ScrollReveal'
import styles from './style'

const App = () => {
  return (
    <div className='bg-primary w-full overflow-hidden'>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar/>
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero/>      
        </div>
      </div>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <ScrollReveal direction="fade" distance={30}>
            <Stats/>
          </ScrollReveal>
          <ScrollReveal direction="up" distance={80}>
            <Business/>
          </ScrollReveal>
          <ScrollReveal direction="right" distance={100}>
            <Billing/>
          </ScrollReveal>
          <ScrollReveal direction="left" distance={100}>
            <CardDeal/>
          </ScrollReveal>
          <ScrollReveal direction="up" distance={80}>
            <Testimonials/>
          </ScrollReveal>
          <ScrollReveal direction="fade" distance={50}>
            <Clients/>
          </ScrollReveal>
          <ScrollReveal direction="up" distance={80}>
            <CTA/>
          </ScrollReveal>
          <ScrollReveal direction="fade" distance={30}>
            <Footer/>     
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}

export default App