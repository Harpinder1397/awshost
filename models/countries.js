const { Schema, model } = require('mongoose')

const optionalStringDefObj = {
  required: false,
  type: String
}

const optionalNumberObj = {
  required : false, 
  type: Number
}

const countriesInfoSchema = new Schema({
    country_name: optionalStringDefObj,
    country_code: optionalStringDefObj,
    phone_code: optionalStringDefObj,
    iso_code_3: optionalStringDefObj,
    status: optionalNumberObj,
})

const Countries = new model('Countries', countriesInfoSchema)

module.exports = {
    Countries,
    countriesInfoSchema
}
