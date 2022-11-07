const is = require("is_js")
const { Router } = require("express")
const { validate } = require("micro-validator").default
const contactValidations = require("../validation/contact")
const { contactModel } = require("../models/contact")

const contactRouter = Router()

const requiredTypes = ["business", "startup", "individual"]
const requiredServiceTypes = ["design", "development", "both"]
const requiredStates = ["mobile", "web", "mobileUI", "webUI", "branding"]

const validFieldErrors = (type, serviceType, state) => {

  if (!requiredTypes.includes(type)) {
    return {
      type: ["You have to provide a valid type"],
    }
  }

  if (!requiredServiceTypes.includes(serviceType)) {
    return {
      serviceType: ["You have to provide a valid service type"],
    }
  }

  if (!requiredStates.includes(state)) {
    return {
      state: ["You have to provide a valid state"],
    }
  }
  return null
}

contactRouter.post("/", async (req, res) => {
  const { type, serviceType, state } = req.body
  const validationErrors = validate(contactValidations, req.body)
  const typeError = validFieldErrors(type, serviceType, state) 

  if (!is.empty(validationErrors)) {
    return res.status(400).json({ errors: validationErrors })
  }
  
  if (typeError) {
    return res.status(400).json({
      errors: typeError,
    })
  }

  try {
    const Contact = new contactModel({ ...req.body })

    Contact.save().then(() => {
      res.status(200).json({ message: "Contact created successfully" })
    })
  } catch (err) {
    res
      .status(400)
      .send({ message: "Something went wrong. Unable to contact" })
  }
})

module.exports = contactRouter
