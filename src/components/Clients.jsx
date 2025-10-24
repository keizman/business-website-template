import React from 'react'
import { clients } from '../constants'
import styles from '../style'
import ScrollReveal from './ScrollReveal'

const Clients = () => {
  return (
    <section className={`${styles.flexCenter} my-4`}>
      <div className={`${styles.flexCenter} flex-wrap w-full`}>
        {clients.map((client, index) => (
          <ScrollReveal key={client.id} direction="fade" distance={20} delay={index * 80}>
            <div className={`flex-1 ${styles.flexCenter} sm:min-w-[192px] min-w-[120px]`}>
              <img
                src={client.logo}
                alt='client'
                className='sm:w-[192px] w-[100px] object-contain'
              />           
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

export default Clients
