import { useEffect, useRef } from 'react'

const ScrollReveal = ({ children, delay = 0, direction = 'up', distance = 50 }) => {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const getDirectionClass = () => {
    switch (direction) {
      case 'up':
        return 'animate-from-bottom'
      case 'down':
        return 'animate-from-top'
      case 'left':
        return 'animate-from-right'
      case 'right':
        return 'animate-from-left'
      case 'fade':
        return 'animate-fade-only'
      default:
        return 'animate-from-bottom'
    }
  }

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${getDirectionClass()}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        '--reveal-distance': `${distance}px`
      }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal

