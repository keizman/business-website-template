import React from 'react'
import { card } from '../assets'
import Button from './Button'
import styles, { layout } from '../style'

const CardDeal = () => {
  return (
    <section className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>Deploy AI solutions <br className='sm:block hidden'/>in just a few steps.</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Integrate powerful AI capabilities into your applications
          with our comprehensive API platform. From natural language processing
          to computer vision, we provide the tools you need.
        </p>
        <Button styles='mt-10'/>
      </div>
      <div className={layout.sectionImg}>
        <img
          src={card}
          alt='AI API Integration'
          className='w-[100%] h-[100%] opacity-85 blur-sm hover:opacity-100 hover:blur-none transition-all duration-500'
          style={{
            filter: 'brightness(0.9) contrast(1.1) saturate(0.8)',
            mixBlendMode: 'soft-light'
          }}
        />
      </div>
    </section>
  )
}

export default CardDeal
