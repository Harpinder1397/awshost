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
  extraTalent: optionalFieldArray,
  tags: optionalFieldArray,
  bestIn: optionalFieldArray,
  country: optionalFieldString,
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
  age: optionalFieldNumber,
  createdAt: optionalFieldString,
  type: optionalFieldString,
  updatedAt: optionalFieldString,
  verified: optionalFieldBoolean,
  available: optionalFieldString,
})

const User = new model('User', userInfoSchema)

module.exports = {
  User,
  userInfoSchema
}
