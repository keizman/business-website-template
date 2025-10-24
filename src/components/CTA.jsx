import React from 'react'
import styles from '../style'
import Button from './Button'

const CTA = () => {
  return (
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
      <div className='flex-1 flex flex-col'>
        <h2 className={styles.heading2}>Start building with AI today!</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Get access to powerful AI tools and APIs to accelerate your innovation and transform your business.
        </p>
        <p className={`${styles.paragraph} max-w-[470px] mt-3`}>
          Visit our API platform: <a href='https://api.llmproai.xyz/' target='_blank' rel='noopener noreferrer' className='text-gradient hover:underline'>api.llmproai.xyz</a>
        </p>
      </div>
      <div className={`${styles.flexCenter} sm:ml-10 ml-0`}>
        <a href='https://api.llmproai.xyz/' target='_blank' rel='noopener noreferrer'>
          <Button/>
        </a>
      </div>
    </section>
  )
}

export default CTA
