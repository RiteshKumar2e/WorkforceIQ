import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './AnimatedCard.css'

/**
 * Premium animated card with 3D tilt effect, glassmorphism, and glow
 * Uses Framer Motion for smooth interactions
 */
const AnimatedCard = ({
  children,
  title,
  subtitle,
  footer,
  actions,
  variant = 'default',
  elevated = false,
  glow = false,
  tilt = true,
  className = '',
  delay = 0,
  ...props
}) => {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    if (!tilt || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const tiltX = (y - centerY) / centerY * -6
    const tiltY = (x - centerX) / centerX * 6

    setRotateX(tiltX)
    setRotateY(tiltY)
    setGlowPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setGlowPosition({ x: 50, y: 50 })
  }

  const classes = [
    'animated-card',
    variant !== 'default' && `animated-card-${variant}`,
    elevated && 'animated-card-elevated',
    glow && 'animated-card-glow',
    className,
  ].filter(Boolean).join(' ')

  return (
    <motion.div
      ref={cardRef}
      className={classes}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        '--glow-x': `${glowPosition.x}%`,
        '--glow-y': `${glowPosition.y}%`,
      }}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: delay * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      {...props}
    >
      <div className="animated-card-inner">
        {(title || subtitle || actions) && (
          <div className="animated-card-header">
            <div>
              {title && <h3 className="animated-card-title">{title}</h3>}
              {subtitle && <p className="animated-card-subtitle">{subtitle}</p>}
            </div>
            {actions && <div className="animated-card-actions">{actions}</div>}
          </div>
        )}
        <div className="animated-card-body">
          {children}
        </div>
        {footer && (
          <div className="animated-card-footer">
            {footer}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default AnimatedCard
