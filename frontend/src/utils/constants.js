// Constants
export const ROLES = {
  SHIFT_MANAGER: 'shift_manager',
  LINE_MANAGER: 'line_manager',
  HR_ADMIN: 'hr_admin',
}

export const COMPETENCY_LEVELS = {
  NOVICE: 'novice',
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  EXPERT: 'expert',
}

export const PROMOTION_STATUS = {
  READY_NOW: 'ready_now',
  READY_3_6_MONTHS: 'ready_3_6_months',
  NEEDS_DEVELOPMENT: 'needs_development',
}

export const TRAINING_URGENCY = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
}

export const ENGAGEMENT_LEVELS = {
  VERY_LOW: 'very_low',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  VERY_HIGH: 'very_high',
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'WorkforceIQ'

export const COMPETENCY_AREAS = [
  'Technical Skills',
  'Leadership',
  'Communication',
  'Problem Solving',
  'Team Work',
]

export const PERSONALITY_TRAITS = [
  'Openness',
  'Conscientiousness',
  'Extraversion',
  'Agreeableness',
  'Neuroticism',
]
