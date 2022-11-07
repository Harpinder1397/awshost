const { Schema, model } = require("mongoose")

const requiredStringDefObj = {
  required: true,
  type: String,
}

const contactSchema = new Schema(
  {
    type: requiredStringDefObj,
    serviceType: requiredStringDefObj,
    state: requiredStringDefObj,
    name: requiredStringDefObj,
    email: requiredStringDefObj,
    phoneNo: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
)
const contactModel = new model("contact", contactSchema)
module.exports = {
  contactModel,
  contactSchema,
}