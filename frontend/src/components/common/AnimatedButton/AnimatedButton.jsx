import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs/lib/anime.es.js'
import './AnimatedButton.css'

/**
 * Premium animated button with ripple effect, magnetic hover, and glow
 */
const AnimatedButton = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  fullWidth = false,
  magnetic = false,
  glow = false,
  onClick,
  className = '',
  ...props
}) => {
  const buttonRef = useRef(null)
  const rippleRef = useRef(null)

  const handleClick = (e) => {
    // Create ripple
    if (buttonRef.current && !disabled) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const ripple = document.createElement('span')
      ripple.className = 'btn-ripple'
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      buttonRef.current.appendChild(ripple)

      anime({
        targets: ripple,
        scale: [0, 4],
        opacity: [0.4, 0],
        duration: 700,
        easing: 'easeOutExpo',
        complete: () => ripple.remove(),
      })
    }

    if (onClick) onClick(e)
  }

  // Magnetic hover effect
  useEffect(() => {
    if (!magnetic || !buttonRef.current) return

    const el = buttonRef.current
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      anime({
        targets: el,
        translateX: x * 0.2,
        translateY: y * 0.2,
        duration: 200,
        easing: 'easeOutCubic',
      })
    }

    const handleMouseLeave = () => {
      anime({
        targets: el,
        translateX: 0,
        translateY: 0,
        duration: 500,
        easing: 'easeOutElastic(1, 0.5)',
      })
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [magnetic])

  const classes = [
    'anim-btn',
    `anim-btn-${variant}`,
    `anim-btn-${size}`,
    fullWidth && 'anim-btn-block',
    glow && 'anim-btn-glow',
    className,
  ].filter(Boolean).join(' ')

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      className={classes}
      disabled={disabled}
      onClick={handleClick}
      whileHover={!disabled ? { scale: 1.03, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      <span className="anim-btn-content">{children}</span>
    </motion.button>
  )
}

export default AnimatedButton
