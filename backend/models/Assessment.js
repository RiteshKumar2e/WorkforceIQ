import mongoose from 'mongoose'

const assessmentSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    assessmentType: {
      type: String,
      enum: ['technical', 'behavioral', 'leadership', 'engagement'],
      required: true,
    },
    scheduledDate: Date,
    completionDate: Date,
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
    },
    results: {
      score: Number,
      grade: String,
      feedback: String,
    },
    assessor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Assessment', assessmentSchema)
