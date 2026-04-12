import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: String,
    message: String,
    type: {
      type: String,
      enum: ['alert', 'info', 'success', 'warning'],
      default: 'info',
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Notification', notificationSchema)
