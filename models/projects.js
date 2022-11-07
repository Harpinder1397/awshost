const { Schema, model } = require('mongoose')

const requiredStringDefObj = {
  required: false,
  type: String
}

const requiredNumberObj = {
  required : false, 
  type: Number
}

const projectInfoSchema = new Schema({
  category: requiredStringDefObj,
  links: requiredStringDefObj,
  projectName: requiredStringDefObj,
  subCategory: requiredStringDefObj,
  id: requiredNumberObj
})

const Projects = new model('projects', projectInfoSchema)

module.exports = {
    Projects,
    projectInfoSchema
}
