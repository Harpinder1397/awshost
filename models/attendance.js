const { Schema, model } = require('mongoose')

const attendanceSchema = new Schema({
  clockInTime: {
    required: true,
    type: Date
  },
  state: {
    required: true,
    type: String 
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: {
    createdAt: 'created_at'
  }
})

const attendanceModel = new model('attendance', attendanceSchema)

module.exports = {
  attendanceModel,
  attendanceSchema
}