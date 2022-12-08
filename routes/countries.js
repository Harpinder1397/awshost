const { Router } = require('express')

const getAllStates = Router()

const { Countries } = require('../models/countries')

getAllStates.get('/', async (req, res) => { 
  try {
    const response = await Countries.find();
    return res.status(200).json(response)
  } catch (error) {
    return res.status(502).json({ errors: ['Some error occurred'] })
  }
})

module.exports = getAllStates
