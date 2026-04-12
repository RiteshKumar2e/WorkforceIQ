// Team analysis service for analyzing team composition and balance

export const analyzeTeamComposition = (employees) => {
  const analysis = {
    totalMembers: employees.length,
    averageTechnicalCompetency: 0,
    averageLeadershipScore: 0,
    averageEngagement: 0,
    skillDistribution: {},
    promotionReadinessPipeline: {
      readyNow: 0,
      ready3to6: 0,
      needsDevelopment: 0,
    },
  }

  if (employees.length === 0) return analysis

  // Calculate averages
  analysis.averageTechnicalCompetency = Math.round(
    employees.reduce((sum, e) => sum + (e.technicalCompetency || 0), 0) / employees.length
  )
  analysis.averageLeadershipScore = Math.round(
    employees.reduce((sum, e) => sum + (e.leadershipScore || 0), 0) / employees.length
  )
  analysis.averageEngagement = Math.round(
    employees.reduce((sum, e) => sum + (e.engagementScore || 0), 0) / employees.length
  )

  // Promotion readiness distribution
  employees.forEach(e => {
    if (e.promotionReadiness === 'ready_now') analysis.promotionReadinessPipeline.readyNow++
    else if (e.promotionReadiness === 'ready_3_6_months') analysis.promotionReadinessPipeline.ready3to6++
    else analysis.promotionReadinessPipeline.needsDevelopment++
  })

  // Skill distribution
  employees.forEach(e => {
    if (e.designation) {
      analysis.skillDistribution[e.designation] = (analysis.skillDistribution[e.designation] || 0) + 1
    }
  })

  return analysis
}

export const generateTeamBalanceScore = (employees) => {
  let score = 100

  // Check leadership balance
  const leaders = employees.filter(e => e.leadershipScore > 70).length
  if (leaders === 0) score -= 15
  else if (leaders === 1 && employees.length > 2) score -= 10

  // Check skill diversity
  const designations = new Set(employees.map(e => e.designation)).size
  if (designations < Math.ceil(employees.length / 2)) score -= 10

  // Check engagement balance
  const avgEngagement = employees.reduce((sum, e) => sum + (e.engagementScore || 0), 0) / employees.length
  if (avgEngagement < 60) score -= 15

  // Check competency balance
  const avgCompetency = employees.reduce((sum, e) => sum + (e.technicalCompetency || 0), 0) / employees.length
  if (avgCompetency < 65) score -= 15

  return Math.max(0, score)
}

export const identifyTeamGaps = (employees) => {
  const gaps = []

  const leaderCount = employees.filter(e => e.leadershipScore > 70).length
  if (leaderCount === 0) {
    gaps.push({
      type: 'leadership',
      severity: 'high',
      description: 'No experienced leaders in the team',
    })
  }

  const avgEngagement = employees.reduce((sum, e) => sum + (e.engagementScore || 0), 0) / employees.length
  if (avgEngagement < 60) {
    gaps.push({
      type: 'engagement',
      severity: 'high',
      description: 'Low overall team engagement',
    })
  }

  const readyForPromotion = employees.filter(e => e.promotionReadiness === 'ready_now').length
  if (readyForPromotion === 0) {
    gaps.push({
      type: 'succession',
      severity: 'medium',
      description: 'No immediate succession candidates',
    })
  }

  return gaps
}

export const getTeamRecommendations = (employees) => {
  const recommendations = []

  const avgCompetency = employees.reduce((sum, e) => sum + (e.technicalCompetency || 0), 0) / employees.length
  if (avgCompetency < 70) {
    recommendations.push('Invest in technical training programs')
  }

  const avgEngagement = employees.reduce((sum, e) => sum + (e.engagementScore || 0), 0) / employees.length
  if (avgEngagement < 70) {
    recommendations.push('Conduct team building activities')
    recommendations.push('Review recognition and reward programs')
  }

  const needsDevelopment = employees.filter(e => e.promotionReadiness === 'needs_development').length
  if (needsDevelopment > employees.length * 0.5) {
    recommendations.push('Accelerate leadership development programs')
  }

  const leaderCount = employees.filter(e => e.leadershipScore > 70).length
  if (leaderCount === 1) {
    recommendations.push('Identify and mentor potential next leaders')
  }

  return recommendations
}
