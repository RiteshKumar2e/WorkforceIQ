import React from 'react'
import './Loader.css'

const Loader = ({ size = 'md', fullScreen = true }) => {
  const containerClass = fullScreen ? 'loader-fullscreen' : 'loader-inline'
  
  return (
    <div className={containerClass}>
      <div className={`loader loader-${size}`}>
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

export default Loader
