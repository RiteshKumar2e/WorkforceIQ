import { useEffect, useRef } from 'react'
import anime from 'animejs/lib/anime.es.js'

/**
 * Hook that triggers animation when element enters viewport
 * Uses IntersectionObserver for performance
 */
const useScrollReveal = (options = {}) => {
  const elementRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const {
      threshold = 0.15,
      translateY = 40,
      translateX = 0,
      opacity = [0, 1],
      scale = [0.95, 1],
      duration = 900,
      delay = 0,
      easing = 'easeOutCubic',
      once = true,
    } = options

    // Set initial hidden state
    el.style.opacity = '0'
    el.style.transform = `translateY(${translateY}px) translateX(${translateX}px) scale(${scale[0]})`
    el.style.willChange = 'opacity, transform'

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !hasAnimated.current)) {
            hasAnimated.current = true

            anime({
              targets: el,
              opacity,
              translateY: [translateY, 0],
              translateX: [translateX, 0],
              scale,
              duration,
              delay,
              easing,
              complete: () => {
                el.style.willChange = 'auto'
              }
            })

            if (once) {
              observer.unobserve(el)
            }
          }
        })
      },
      { threshold }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [])

  return elementRef
}

export default useScrollReveal
