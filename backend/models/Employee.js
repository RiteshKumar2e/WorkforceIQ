import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    employeeId: {
      type: String,
      unique: true,
    },
    department: String,
    designation: String,
    reportingManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
    dateOfJoining: Date,
    
    // Competencies
    technicalCompetency: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    leadershipScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    communicationScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    
    // Engagement and Behavioral
    engagementScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    behavioralProfile: String,
    personality: {
      openness: { type: Number, min: 0, max: 100 },
      conscientiousness: { type: Number, min: 0, max: 100 },
      extraversion: { type: Number, min: 0, max: 100 },
      agreeableness: { type: Number, min: 0, max: 100 },
      neuroticism: { type: Number, min: 0, max: 100 },
    },
    
    // Promotion Status
    promotionReadiness: {
      type: String,
      enum: ['ready_now', 'ready_3_6_months', 'needs_development'],
      default: 'needs_development',
    },
    
    // Training Flags
    trainingFlags: [{
      skill: String,
      urgency: {
        type: String,
        enum: ['critical', 'high', 'medium', 'low'],
      },
      status: String,
    }],
    
    // Assessment History
    assessments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assessment',
    }],
    
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Employee', employeeSchema)
