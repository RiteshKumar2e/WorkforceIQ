import React, { useEffect, useRef } from 'react'
import anime from 'animejs/lib/anime.es.js'
import './ParticleField.css'

/**
 * Animated particle field background
 * Creates floating orbs with Anime.js animation
 */
const ParticleField = ({ count = 30, color = 'rgba(79, 70, 229, 0.15)', className = '' }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particles = []

    // Create particles
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      const size = Math.random() * 6 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.background = color
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      container.appendChild(particle)
      particles.push(particle)
    }

    // Animate particles
    const animation = anime({
      targets: particles,
      translateX: () => anime.random(-80, 80),
      translateY: () => anime.random(-80, 80),
      scale: () => [1, anime.random(1, 2.5)],
      opacity: () => [anime.random(0.2, 0.6), anime.random(0.1, 0.4)],
      duration: () => anime.random(3000, 6000),
      delay: () => anime.random(0, 2000),
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad',
    })

    return () => {
      animation.pause()
      particles.forEach(p => p.remove())
    }
  }, [count, color])

  return <div ref={containerRef} className={`particle-field ${className}`} />
}

export default ParticleField
