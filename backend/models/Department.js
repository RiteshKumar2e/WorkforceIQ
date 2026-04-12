import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: String,
    description: String,
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    employees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    }],
  },
  { timestamps: true }
)

export default mongoose.model('Department', departmentSchema)
