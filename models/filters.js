const { Schema, model } = require('mongoose')

const optionalStringDefObj = {
  required: false,
  type: String
}

const filtersInfoSchema = new Schema({
    key: optionalStringDefObj,
    value: optionalStringDefObj,
})

const Filters = new model('filters', filtersInfoSchema)

module.exports = {
    Filters,
    filtersInfoSchema
}
