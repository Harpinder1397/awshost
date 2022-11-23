const { Router } = require('express')

const jobs = Router()

const { Jobs } = require('../models/jobs')

jobs.get('/', async (req, res) => { 
  try {
      const response = await Jobs.find();
      console.log(response, 'response')
     return res.status(200).json(response)
    }
   catch (error) {
    return res.status(502).json({ errors: ['Some error occurred'] })
  }
})

jobs.post("/", async (req, res) => {
  try {
    const newJob = {...req.body, postedOn: new Date()};
    Jobs.create(
      newJob, (err, users) => {
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

jobs.post('/:_id', (req, res) => {
  console.log(req, 'req')
  const { _id = "",  } = req.params
  const jobDetail = {...req.body, updatedAt: new Date()};

  try {
    Jobs.findByIdAndUpdate(_id, jobDetail, {new: true})
        .then(() => res.status(200).json({ message: 'record updated successfully', data: {...req.body}}))
        .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

jobs.delete('/:_id', (req, res) => {
  const { _id = "",  } = req.params

  try {
    Jobs.findOneAndDelete({ _id })
        .then(() => res.status(200).json({ message: 'record Deleted successfully', data: {...req.body}  }))
        .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

module.exports = jobs
