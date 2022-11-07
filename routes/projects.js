const { Router } = require('express')

const projects = Router()

const { Projects } = require('../models/projects')

projects.get('/', async (req, res) => { 
  try {
    const states = await Projects.find(req.query)
    return res.status(200).json(states)
  } catch (error) {
    return res.status(502).json({ errors: ['Some error occurred'] })
  }
})

projects.post("/", async (req, res) => {
  const crypto = require("crypto");
  const uniqueId = crypto.randomBytes(16).toString("hex");
  try {
    const newStates = {...req.body, createdAt: new Date()};
    Projects.create(
      newStates, (err, users) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ success: true })
      }
    )
  } catch (err) {
    res
      .status(400)
      .send({ message: "Something went wrong. Unable to contact" })
  }
})

projects.post('/:_id', (req, res) => {
  const { _id = "",  } = req.params
  try {
    Projects.findByIdAndUpdate(_id, req.body, {new: true})
        .then(() => res.status(200).json({ message: 'record updated successfully', data: {...req.body}  }))
        .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

projects.delete('/:_id', (req, res) => {
  const { _id = "",  } = req.params

  try {
    Projects.findOneAndDelete({ _id })
        .then(() => res.status(200).json({ message: 'record Deleted successfully', data: {...req.body}  }))
        .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

module.exports = projects
