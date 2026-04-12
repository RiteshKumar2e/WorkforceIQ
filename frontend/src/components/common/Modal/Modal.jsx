import React from 'react'
import './Modal.css'

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  showClose = true,
  onBackdropClick = true,
}) => {
  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onBackdropClick) {
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className={`modal modal-${size}`}>
        {(title || showClose) && (
          <div className="modal-header">
            {title && <h2 className="modal-title">{title}</h2>}
            {showClose && (
              <button
                className="modal-close"
                onClick={onClose}
                aria-label="Close modal"
              >
                ×
              </button>
            )}
          </div>
        )}
        <div className="modal-content">
          {children}
        </div>
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
