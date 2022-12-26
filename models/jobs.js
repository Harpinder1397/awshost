const { Schema, model } = require("mongoose");

const requiredStringDefObj = {
  required: false,
  type: String,
};

const requiredNumberObj = {
  required: false,
  type: Number,
};

const optionalFieldArray = {
  required: false,
  type: Array,
};

const optionalFieldString = {
  required: false,
  type: String,
};

const optionalFieldBoolean = {
  required : false, 
  type: Boolean
}

const jobsInfoSchema = new Schema({
  thumbnail:optionalFieldArray,
  jobId: requiredStringDefObj,
  jobTitle: requiredStringDefObj,
  city: requiredStringDefObj,
  country: requiredStringDefObj,
  state: requiredStringDefObj,
  budget: requiredNumberObj,
  postedById: requiredStringDefObj,
  postedByName: requiredStringDefObj,
  postedByCategory: requiredStringDefObj,
  postedBySubCategory: requiredStringDefObj,
  postedOn: requiredStringDefObj,
  postedTill: requiredStringDefObj,
  requirement: requiredNumberObj,
  content: requiredStringDefObj,
  status: optionalFieldBoolean,
})

const Jobs = new model("jobs", jobsInfoSchema);

module.exports = {
  Jobs,
  jobsInfoSchema,
};
