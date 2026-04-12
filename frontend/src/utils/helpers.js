// Helper Functions
export const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatTime = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatDateTime = (date) => {
  return `${formatDate(date)} ${formatTime(date)}`
}

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export const formatNumber = (number, decimals = 2) => {
  return Number(number).toFixed(decimals)
}

export const truncateText = (text, length = 50) => {
  if (!text || text.length <= length) return text
  return text.substring(0, length) + '...'
}

export const capitalizeWords = (str) => {
  if (!str) return ''
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const getInitials = (name) => {
  if (!name) return ''
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2)
}

export const calculateAge = (birthDate) => {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  }

  for (const [name, secondsInInterval] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInInterval)
    if (interval >= 1) {
      return interval === 1
        ? `${interval} ${name} ago`
        : `${interval} ${name}s ago`
    }
  }
  return 'just now'
}

export const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const throttle = (func, limit) => {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const isObject = (obj) => {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}

export const deepMerge = (target, source) => {
  if (!isObject(source)) return source

  const result = { ...target }

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (isObject(source[key])) {
        result[key] = isObject(result[key])
          ? deepMerge(result[key], source[key])
          : source[key]
      } else {
        result[key] = source[key]
      }
    }
  }

  return result
}

export const getRoleColor = (role) => {
  const colors = {
    shift_manager: '#3b82f6',
    line_manager: '#8b5cf6',
    hr_admin: '#ec4899',
  }
  return colors[role] || '#64748b'
}

export const getStatusColor = (status) => {
  const colors = {
    active: '#22c55e',
    inactive: '#ef4444',
    pending: '#f59e0b',
    archived: '#94a3b8',
  }
  return colors[status] || '#64748b'
}
