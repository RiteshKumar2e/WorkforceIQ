import React from 'react'
import { motion } from 'framer-motion'
import './GradientText.css'

/**
 * Animated gradient text with shimmer effect
 * Professional headline component with animated gradient
 */
const GradientText = ({
  children,
  as: Tag = 'span',
  gradient = 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #a855f7 60%, #4f46e5 100%)',
  animate = true,
  className = '',
  ...props
}) => {
  return (
    <motion.span
      className={`gradient-text ${animate ? 'gradient-text-animated' : ''} ${className}`}
      style={{ backgroundImage: gradient }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.span>
  )
}

export default GradientText
