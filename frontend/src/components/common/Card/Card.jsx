import React from 'react'
import './Card.css'

const Card = ({
  children,
  title,
  subtitle,
  footer,
  actions,
  variant = 'default',
  elevated = false,
  className = '',
  ...props
}) => {
  const classes = [
    'card',
    variant !== 'default' && `card-${variant}`,
    elevated && 'card-elevated',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {(title || subtitle || actions) && (
        <div className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card
