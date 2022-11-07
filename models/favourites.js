const { Schema, model } = require('mongoose')

const optionalStringDefObj = {
  required: false,
  type: String
}

// const optionalNumberObj = {
//   required : false, 
//   type: Number
// }

// const optionalArrayObj = {
//   required : false, 
//   type: Array
// }

const favouritesInfoSchema = new Schema({
    userId: optionalStringDefObj,
    favUserId: optionalStringDefObj,
    favName: optionalStringDefObj,
    favSubCategory: optionalStringDefObj,
    favThumbnail: optionalStringDefObj,
    createdAt: optionalStringDefObj,
})

const Favourites = new model('favourites', favouritesInfoSchema)

module.exports = {
  Favourites,
  favouritesInfoSchema
}
