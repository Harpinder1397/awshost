const { Schema, model } = require('mongoose')

const requiredStringDefObj = {
  required: true,
  type: String
}

const requiredNumberObj = {
  required : true, 
  type: Number
}

const optionalFieldString = {
  required : false, 
  type: String
}

const optionalFieldNumber= {
  required : false, 
  type: Number
}

const optionalFieldArray = {
  required : false, 
  type: Array
}

const optionalFieldBoolean = {
  required : false, 
  type: Boolean
}

const userInfoSchema = new Schema({
  mobileNumber: optionalFieldNumber,
  fullName: requiredStringDefObj,
  password: requiredStringDefObj,
  email: optionalFieldString,
  category: optionalFieldString,
  subCategory: optionalFieldString,
  languages: optionalFieldArray,
  tags: optionalFieldArray,
  state: optionalFieldString,
  city: optionalFieldString,
  dateOfBirth: optionalFieldString,
  experience: optionalFieldNumber,
  projects: optionalFieldArray,
  thumbnails: optionalFieldArray,
  bio: optionalFieldString,
  hair: optionalFieldString,
  skin: optionalFieldString,
  eyes: optionalFieldString,
  budget: optionalFieldString,
  weight: optionalFieldNumber,
  height: optionalFieldNumber,
  date: optionalFieldString,
  gender: optionalFieldString,
  // age: optionalFieldString,
  createdAt: optionalFieldString,
  updatedAt: optionalFieldString,
  verified: optionalFieldBoolean,
})

const User = new model('User', userInfoSchema)

module.exports = {
  User,
  userInfoSchema
}
