const { Schema, model } = require('mongoose')

const requiredStringDefObj = {
  required: true,
  type: String
}

const requiredDateObj = {
  required : true, 
  type: Date
}

const leaveSchema = new Schema({
  duration: requiredStringDefObj, 
  startdate : requiredDateObj, 
  enddate: Date,
  leaveType: requiredStringDefObj, 
  reason: requiredStringDefObj,
  userId: requiredStringDefObj, 
  status: requiredStringDefObj
}, {
  timestamps: {
    createdAt: 'created_at'
  }
})

const leaveModal = new model('leaves', leaveSchema)

module.exports = {
  leaveModal,
  leaveSchema
}