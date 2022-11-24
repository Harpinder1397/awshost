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

const jobsInfoSchema = new Schema({
  thumbnail:optionalFieldArray,
  jobId: requiredStringDefObj,
  jobTitle: requiredStringDefObj,
  postedById: requiredStringDefObj,
  postedByName: requiredStringDefObj,
  postedByCategory: requiredStringDefObj,
  postedOn: requiredStringDefObj,
  postedTill: requiredStringDefObj,
  requirement: requiredNumberObj,
  content: requiredStringDefObj,
})

const Jobs = new model("jobs", jobsInfoSchema);

module.exports = {
  Jobs,
  jobsInfoSchema,
};
