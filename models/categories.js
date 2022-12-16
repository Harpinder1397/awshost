const { Schema, model } = require('mongoose')

const optionalStringDefObj = {
  required: false,
  type: String
}

const optionalNumberObj = {
  required : false, 
  type: Number
}

const optionalArrayObj = {
  required : false, 
  type: Array
}

const categoriesInfoSchema = new Schema({
    id: optionalNumberObj,
    key: optionalStringDefObj,
    value: optionalStringDefObj,
    createdAt: optionalStringDefObj,
    tags: optionalArrayObj,
    filters: optionalArrayObj,
    childern: optionalArrayObj,
})

const Categories = new model('categories', categoriesInfoSchema)

module.exports = {
    Categories,
    categoriesInfoSchema
}
