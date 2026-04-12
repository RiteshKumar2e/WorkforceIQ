// Scoring service for calculating competency and engagement scores

export const calculateCompetencyScore = (assessmentResults) => {
  if (!assessmentResults || assessmentResults.length === 0) return 0
  const average = assessmentResults.reduce((sum, score) => sum + score, 0) / assessmentResults.length
  return Math.round(average)
}

export const calculateEngagementScore = (attendanceRate, participationLevel, feedbackScore) => {
  const weights = {
    attendance: 0.4,
    participation: 0.35,
    feedback: 0.25,
  }
  
  const score = (attendanceRate * weights.attendance) +
                (participationLevel * weights.participation) +
                (feedbackScore * weights.feedback)
  
  return Math.round(score)
}

export const calculateLeadershipScore = (decisionMaking, teamManagement, communication) => {
  const average = (decisionMaking + teamManagement + communication) / 3
  return Math.round(average)
}

export const determinePromotionReadiness = (technicalScore, leadershipScore, engagementScore) => {
  const overallScore = (technicalScore * 0.4) + (leadershipScore * 0.35) + (engagementScore * 0.25)
  
  if (overallScore >= 80) return 'ready_now'
  if (overallScore >= 65) return 'ready_3_6_months'
  return 'needs_development'
}

export const scoreToGrade = (score) => {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

export const getScoreLevel = (score) => {
  if (score >= 90) return 'Excellent'
  if (score >= 75) return 'Good'
  if (score >= 60) return 'Average'
  if (score >= 45) return 'Below Average'
  return 'Poor'
}
