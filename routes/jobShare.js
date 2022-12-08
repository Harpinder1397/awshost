const { Router } = require('express')

const jobShare = Router()

const { JobShare } = require('../models/jobShare')

// jobShare.get('/', async (req, res) => {
//   try {
//     const response = await JobShare.find();
//      return res.status(200).json(response)
//     }
//    catch (error) {
//     return res.status(502).json({ errors: ['Some error occurred'] })
//   }
// })

jobShare.get('/', async (req, res) => {
  const postedById = req.query.userId && {'sharedTo': req.query.userId};
  const sharedById = req.query.sharedById && {'sharedById': req.query.sharedById};
  
  const query = {...postedById, ...sharedById}
  const { id } = req.params;
  try {
    const response = await JobShare.find(query);
     return res.status(200).json(response)
    }
   catch (error) {
    return res.status(502).json({ errors: ['Some error occurred'] })
  }
})

jobShare.post("/", async (req, res) => {
  try {
    const newJob = {...req.body, postedOn: new Date()};

    const jobId = req.body.jobId && {'jobId': req.body.jobId};
    const sharedById = req.body.sharedById && {'sharedById': req.body.sharedById};
    const query = {...jobId, ...sharedById}
    const checkAlreadyAppliedJob = await JobShare.findOne(query);
    
    if(checkAlreadyAppliedJob){
     return res.status(502).json({error: 'You already applied this job.'})
    }

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
