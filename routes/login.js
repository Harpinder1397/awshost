const is = require("is_js")
const bcryptjs = require("bcryptjs")
const { Router } = require("express")
const { validate } = require("micro-validator").default
const loginValidations = require("../validation/login")
const { User } = require("../models/userInfo")
var jwt = require('jsonwebtoken');

const loginRouter = Router()

async function comparePassword(password, hashedPassword) {
  const match = await bcryptjs.compare(password, hashedPassword)
  if (match) {
    return match
  } else {
    return false
  }
}

loginRouter.post("/", async (req, res) => {
  const validationErrors = validate(loginValidations, req.body)
  const { mobileNumber, password } = req.body
  if (!is.empty(validationErrors)) {
    return res.status(400).json({ errors: validationErrors })
  }
  try {
    const user = await User.findOne({ mobileNumber: mobileNumber })
    const hashedPassword = user.password
    const isPasswordMatched = await comparePassword(password, hashedPassword)
    if (user && isPasswordMatched) {
      let token = jwt.sign({id: user._id}, "Amrinder", {expiresIn: 1000});
      return res.status(200).json({token, auth: true, user})
    }
    res.status(400).json({ error: "Invalid Credentials" })
  } catch (err) {
    res.status(400).json({ error: "Invalid Credentials" })
  }
})

module.exports = loginRouter
