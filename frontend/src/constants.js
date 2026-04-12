// Frontend styles and utilities index
export const ROLES = {
  SHIFT_MANAGER: 'shift_manager',
  LINE_MANAGER: 'line_manager',
  HR_ADMIN: 'hr_admin',
}

export const COMPETENCY_LEVELS = {
  NOVICE: 'novice',
  INTERMEDIATE: 'intermediate',
  EXPERT: 'expert',
  MASTER: 'master',
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

export const ASSESSMENT_TYPES = {
  TECHNICAL: 'technical',
  BEHAVIORAL: 'behavioral',
  LEADERSHIP: 'leadership',
  ENGAGEMENT: 'engagement',
}

export const ASSESSMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export const ENGAGEMENT_LEVELS = {
  VERY_LOW: 0,
  LOW: 25,
  MEDIUM: 50,
  HIGH: 75,
  VERY_HIGH: 100,
}

export const PERSONALITY_TRAITS = {
  OPENNESS: 'openness',
  CONSCIENTIOUSNESS: 'conscientiousness',
  EXTRAVERSION: 'extraversion',
  AGREEABLENESS: 'agreeableness',
  NEUROTICISM: 'neuroticism',
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'WorkforceIQ'
