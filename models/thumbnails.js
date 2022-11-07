const { Schema, model } = require('mongoose')

const optionalStringDefObj = {
  required: false,
  type: String
}

// const optionalNumberObj = {
//   required : false, 
//   type: Number
// }

const optionalArrayObj = {
  required : false, 
  type: Array
}

const thumbnailsInfoSchema = new Schema({
  userId: optionalStringDefObj,
  url: optionalStringDefObj,
  fullName: optionalStringDefObj,
  category: optionalStringDefObj,
  dp: optionalStringDefObj,
  createdAt: optionalStringDefObj,
  tags: optionalArrayObj,
})

const Thumbnails = new model('thumbnails', thumbnailsInfoSchema)

module.exports = {
  Thumbnails,
  thumbnailsInfoSchema
}