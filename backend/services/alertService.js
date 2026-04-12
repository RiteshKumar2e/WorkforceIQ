// Alert service for generating training and assessment alerts

export const generateTrainingAlerts = (employees) => {
  const alerts = []

  employees.forEach(employee => {
    // Technical competency alerts
    if (employee.technicalCompetency < 60) {
      alerts.push({
        employeeId: employee._id,
        type: 'training',
        severity: 'critical',
        title: 'Critical Technical Skills Gap',
        message: `${employee.name} requires urgent technical training (Score: ${employee.technicalCompetency})`,
        skillGap: 'Technical Skills',
        createdAt: new Date(),
      })
    } else if (employee.technicalCompetency < 75) {
      alerts.push({
        employeeId: employee._id,
        type: 'training',
        severity: 'high',
        title: 'Technical Skills Development Needed',
        message: `${employee.name} would benefit from technical skill enhancement`,
        skillGap: 'Technical Skills',
        createdAt: new Date(),
      })
    }

    // Leadership development alerts
    if (employee.leadershipScore < 60 && employee.promotionReadiness !== 'needs_development') {
      alerts.push({
        employeeId: employee._id,
        type: 'training',
        severity: 'high',
        title: 'Leadership Development Recommended',
        message: `${employee.name} requires leadership training for growth`,
        skillGap: 'Leadership',
        createdAt: new Date(),
      })
    }

    // Communication skills alerts
    if (employee.communicationScore < 65) {
      alerts.push({
        employeeId: employee._id,
        type: 'training',
        severity: 'medium',
        title: 'Communication Skills Training',
        message: `${employee.name} would benefit from communication skills improvement`,
        skillGap: 'Communication',
        createdAt: new Date(),
      })
    }

    // Engagement alerts
    if (employee.engagementScore < 50) {
      alerts.push({
        employeeId: employee._id,
        type: 'alert',
        severity: 'high',
        title: 'Low Engagement Alert',
        message: `${employee.name} shows low engagement scores. Consider one-on-one discussion`,
        skillGap: 'Engagement',
        createdAt: new Date(),
      })
    }
  })

  return alerts
}

export const generateAssessmentAlerts = (employees) => {
  const alerts = []

  employees.forEach(employee => {
    // Assessment due alerts
    if (!employee.assessments || employee.assessments.length === 0) {
      alerts.push({
        employeeId: employee._id,
        type: 'assessment',
        severity: 'medium',
        title: 'Initial Assessment Pending',
        message: `${employee.name} has not completed any assessments yet`,
        createdAt: new Date(),
      })
    }

    // Reassessment due alerts (every 12 months)
    if (employee.assessments && employee.assessments.length > 0) {
      const lastAssessment = employee.assessments[employee.assessments.length - 1]
      const monthsSinceLastAssessment = getMonthsDifference(lastAssessment.completionDate, new Date())
      
      if (monthsSinceLastAssessment > 12) {
        alerts.push({
          employeeId: employee._id,
          type: 'assessment',
          severity: 'medium',
          title: 'Reassessment Due',
          message: `${employee.name} is due for reassessment (last done ${monthsSinceLastAssessment} months ago)`,
          createdAt: new Date(),
        })
      }
    }
  })

  return alerts
}

export const generatePromotionAlerts = (employees) => {
  const alerts = []

  // Ready for promotion
  employees.forEach(employee => {
    if (employee.promotionReadiness === 'ready_now') {
      alerts.push({
        employeeId: employee._id,
        type: 'promotion',
        severity: 'high',
        title: 'Promotion Candidate Identified',
        message: `${employee.name} is ready for promotion now`,
        createdAt: new Date(),
      })
    } else if (employee.promotionReadiness === 'ready_3_6_months') {
      alerts.push({
        employeeId: employee._id,
        type: 'promotion',
        severity: 'medium',
        title: 'Future Promotion Potential',
        message: `${employee.name} will be ready for promotion in 3-6 months`,
        createdAt: new Date(),
      })
    }
  })

  return alerts
}

export const consolidateAlerts = (trainingAlerts, assessmentAlerts, promotionAlerts) => {
  return [...trainingAlerts, ...assessmentAlerts, ...promotionAlerts].sort(
    (a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
      return severityOrder[a.severity] - severityOrder[b.severity]
    }
  )
}

export const getAlertsSummary = (alerts) => {
  return {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    high: alerts.filter(a => a.severity === 'high').length,
    medium: alerts.filter(a => a.severity === 'medium').length,
    byType: {
      training: alerts.filter(a => a.type === 'training').length,
      assessment: alerts.filter(a => a.type === 'assessment').length,
      promotion: alerts.filter(a => a.type === 'promotion').length,
      alert: alerts.filter(a => a.type === 'alert').length,
    },
  }
}

// Helper function
const getMonthsDifference = (date1, date2) => {
  return Math.floor((date2 - date1) / (1000 * 60 * 60 * 24 * 30))
}
