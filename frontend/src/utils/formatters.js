// Formatters
export const formatters = {
  toLowercase: (value) => value?.toLowerCase?.() || '',
  toUppercase: (value) => value?.toUpperCase?.() || '',
  toTitleCase: (value) => {
    if (!value) return ''
    return value.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
  },
  toKebabCase: (value) => {
    if (!value) return ''
    return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  },
  toCamelCase: (value) => {
    if (!value) return ''
    return value.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) return ''
      return index === 0 ? match.toLowerCase() : match.toUpperCase()
    })
  },
  toSnakeCase: (value) => {
    if (!value) return ''
    return value.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : '_' + word.toLowerCase()
    })
  },
  removeSpaces: (value) => value?.replace(/\s+/g, '') || '',
  removeSpecialChars: (value) => value?.replace(/[^a-zA-Z0-9]/g, '') || '',
  trimWhitespace: (value) => value?.trim?.() || '',
}

export const scoringFormatters = {
  scoreToPercentage: (score, maxScore = 100) => {
    return Math.round((score / maxScore) * 100)
  },
  scoreToGrade: (score) => {
    if (score >= 90) return 'A'
    if (score >= 80) return 'B'
    if (score >= 70) return 'C'
    if (score >= 60) return 'D'
    return 'F'
  },
  scoreToLevel: (score) => {
    if (score >= 80) return 'Expert'
    if (score >= 60) return 'Advanced'
    if (score >= 40) return 'Intermediate'
    if (score >= 20) return 'Beginner'
    return 'Novice'
  },
}
