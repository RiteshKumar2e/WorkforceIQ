import React from 'react'
import { useCountUp } from '../../../hooks/useAnime'

/**
 * Animated counter that counts up to the target value
 * Uses Anime.js for silky smooth number animation
 */
const AnimatedCounter = ({ value, duration = 1500, delay = 0, suffix = '', prefix = '', className = '' }) => {
  const counterRef = useCountUp(value, { duration, delay })

  return (
    <span ref={counterRef} className={className}>
      {prefix}0{suffix}
    </span>
  )
}

export default AnimatedCounter
