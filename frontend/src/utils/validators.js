// Validators
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePassword = (password) => {
  return password && password.length >= 6
}

export const validatePasswordStrength = (password) => {
  let strength = 0
  if (password.length >= 8) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[@$!%*?&]/.test(password)) strength++
  return strength
}

export const validatePhoneNumber = (phone) => {
  const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  return regex.test(phone)
}

export const validateURL = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value !== ''
}

export const validateMinLength = (value, length) => {
  return value && value.length >= length
}

export const validateMaxLength = (value, length) => {
  return !value || value.length <= length
}

export const validateMinValue = (value, min) => {
  return value >= min
}

export const validateMaxValue = (value, max) => {
  return value <= max
}

export const validateRange = (value, min, max) => {
  return value >= min && value <= max
}

export const validateDate = (dateString) => {
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date)
}

export const validateFutureDate = (dateString) => {
  if (!validateDate(dateString)) return false
  return new Date(dateString) > new Date()
}

export const validatePastDate = (dateString) => {
  if (!validateDate(dateString)) return false
  return new Date(dateString) < new Date()
}

export const validateArrayNotEmpty = (arr) => {
  return Array.isArray(arr) && arr.length > 0
}

export const validateFileSize = (file, maxSizeMB) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxSizeBytes
}

export const validateFileType = (file, allowedTypes = []) => {
  return allowedTypes.includes(file.type)
}

export const validateForm = (formData, rules) => {
  const errors = {}
  
  for (const field in rules) {
    const value = formData[field]
    const fieldRules = rules[field]
    
    for (const rule of fieldRules) {
      const error = rule(value)
      if (error) {
        errors[field] = error
        break
      }
    }
  }
  
  return errors
}
