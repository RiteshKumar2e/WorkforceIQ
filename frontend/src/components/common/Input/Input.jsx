import React from 'react'
import './Input.css'

const Input = React.forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  help,
  required = false,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="form-group">
      {label && (
        <label className={required ? 'required' : ''}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`input ${error ? 'input-error' : ''} ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
      {help && <span className="form-help">{help}</span>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
