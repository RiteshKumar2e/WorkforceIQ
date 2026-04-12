import mongoose from 'mongoose'

const trainingFlagSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    skillGap: String,
    urgency: {
      type: String,
      enum: ['critical', 'high', 'medium', 'low'],
      required: true,
    },
    trainingType: String,
    recommendedCourse: String,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending',
    },
    targetCompletionDate: Date,
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export default mongoose.model('TrainingFlag', trainingFlagSchema)
