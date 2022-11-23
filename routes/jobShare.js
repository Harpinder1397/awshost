const { Router } = require('express')

const jobShare = Router()

const { JobShare } = require('../models/jobShare')

jobShare.get('/', async (req, res) => { 
  try {
      const response = await JobShare.find();
     return res.status(200).json(response)
    }
   catch (error) {
    return res.status(502).json({ errors: ['Some error occurred'] })
  }
})

jobShare.post("/", async (req, res) => {
  try {
    const newJob = {...req.body, postedOn: new Date()};
    JobShare.create(
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

// getAllStates.post('/:_id', (req, res) => {
//   const { _id = "",  } = req.params
//   try {
//     States.findByIdAndUpdate(_id, req.body, {new: true})
//         .then(() => res.status(200).json({ message: 'record updated successfully', data: {...req.body}  }))
//         .catch(error => console.log(error))
//   }
//   catch(error){
//       console.log( error)
//   }
// })

// jobShare.delete('/:_id', (req, res) => {
//   const { _id = "",  } = req.params

//   try {
//     Jobs.findOneAndDelete({ _id })
//         .then(() => res.status(200).json({ message: 'record Deleted successfully', data: {...req.body}  }))
//         .catch(error => console.log(error))
//   }
//   catch(error){
//       console.log( error)
//   }
// })

module.exports = jobShare
