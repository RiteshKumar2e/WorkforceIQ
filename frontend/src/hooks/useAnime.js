import { useEffect, useRef, useCallback } from 'react'
import anime from 'animejs/lib/anime.es.js'

/**
 * Custom hook for Anime.js animations
 * Provides reusable animation patterns for the app
 */
export const useAnime = () => {
  const animationsRef = useRef([])

  // Cleanup all animations on unmount
  useEffect(() => {
    return () => {
      animationsRef.current.forEach(anim => anim.pause())
      animationsRef.current = []
    }
  }, [])

  const animate = useCallback((params) => {
    const anim = anime(params)
    animationsRef.current.push(anim)
    return anim
  }, [])

  return { animate }
}

/**
 * Stagger fade-in animation for lists/grids
 */
export const useStaggerReveal = (selector, options = {}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const targets = containerRef.current.querySelectorAll(selector)
    if (targets.length === 0) return

    // Set initial state
    targets.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
    })

    const anim = anime({
      targets,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: options.duration || 800,
      delay: anime.stagger(options.stagger || 100, { start: options.startDelay || 200 }),
      easing: options.easing || 'easeOutCubic',
    })

    return () => anim.pause()
  }, [selector, options.duration, options.stagger, options.startDelay, options.easing])

  return containerRef
}

/**
 * Counter animation for number values
 */
export const useCountUp = (targetValue, options = {}) => {
  const elementRef = useRef(null)
  const countRef = useRef({ value: 0 })

  useEffect(() => {
    if (!elementRef.current) return

    const numericValue = parseInt(targetValue.toString().replace(/[^0-9]/g, ''), 10)
    if (isNaN(numericValue)) return

    const suffix = targetValue.toString().replace(/[0-9]/g, '')

    countRef.current.value = 0

    const anim = anime({
      targets: countRef.current,
      value: numericValue,
      round: 1,
      duration: options.duration || 1500,
      delay: options.delay || 300,
      easing: options.easing || 'easeOutExpo',
      update: () => {
        if (elementRef.current) {
          elementRef.current.textContent = countRef.current.value + suffix
        }
      }
    })

    return () => anim.pause()
  }, [targetValue, options.duration, options.delay, options.easing])

  return elementRef
}

/**
 * Magnetic hover effect for interactive elements
 */
export const useMagneticHover = (strength = 0.3) => {
  const elementRef = useRef(null)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      anime({
        targets: el,
        translateX: x * strength,
        translateY: y * strength,
        duration: 300,
        easing: 'easeOutCubic',
      })
    }

    const handleMouseLeave = () => {
      anime({
        targets: el,
        translateX: 0,
        translateY: 0,
        duration: 600,
        easing: 'easeOutElastic(1, 0.5)',
      })
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return elementRef
}

/**
 * Typing text animation
 */
export const useTypewriter = (text, options = {}) => {
  const elementRef = useRef(null)

  useEffect(() => {
    if (!elementRef.current || !text) return

    const el = elementRef.current
    el.textContent = ''
    const chars = text.split('')
    let currentIndex = 0

    const delay = options.delay || 0
    const speed = options.speed || 50

    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex < chars.length) {
          el.textContent += chars[currentIndex]
          currentIndex++
        } else {
          clearInterval(intervalId)
        }
      }, speed)

      return () => clearInterval(intervalId)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [text, options.delay, options.speed])

  return elementRef
}

/**
 * Parallax scroll effect
 */
export const useParallax = (speed = 0.5) => {
  const elementRef = useRef(null)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const scrolled = window.scrollY
      const rate = scrolled * speed
      el.style.transform = `translateY(${rate}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return elementRef
}

export default useAnime
