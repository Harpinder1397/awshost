const { Router } = require('express')

const getAllStates = Router()

const { States } = require('../models/states')

getAllStates.get('/', async (req, res) => { 
  let response = [];
  try {
    if (req.query.name) {
      response = await States.find({name: new RegExp('^' + req.query.name + '$', 'i')});
    } else if (req.query.state) {
      response = await States.find({state: new RegExp('^' + req.query.state + '$', 'i')});
    } else {
      response = await States.find()
    }
    return res.status(200).json(response)
  } catch (error) {
    return res.status(502).json({ errors: ['Some error occurred'] })
  }
})

// getAllStates.get('/search', async (req, res) => {
//   var response = [];
//     if (req.query.state) {
//       response = await States.find({state: new RegExp('^' + req.query.state + '$', 'i')});
//     }
//     if (req.query.name) {
//       response = await States.find({name: new RegExp('^' + req.query.name + '$', 'i')});
//     }
//     // if(req.query.state && req.query.name){
//     //   response = await States.find()
//     // }

//   try {
//     // const states = await States.find(req.query, options)
//     return res.status(200).json(response)
//   } catch (error) {
//     return res.status(502).json({ errors: ['Some error occurred'] })
//   }
// })

// getAllStates.get('/', async (req, res) => {
//   var regex = new RefExp(req.query, 'i')
//   try {
//     const states = await States.find(regex)
//     return res.status(200).json(states)
//   } catch (error) {
//     return res.status(502).json({ errors: ['Some error occurred'] })
//   }
// })

getAllStates.post("/", async (req, res) => {
  try {
    const newStates = {...req.body, createdAt: new Date()};
    States.create(
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

getAllStates.post('/:_id', (req, res) => {
  const { _id = "",  } = req.params
  try {
    States.findByIdAndUpdate(_id, req.body, {new: true})
        .then(() => res.status(200).json({ message: 'record updated successfully', data: {...req.body}  }))
        .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

getAllStates.delete('/:_id', (req, res) => {
  const { _id = "",  } = req.params

  try {
    States.findOneAndDelete({ _id })
        .then(() => res.status(200).json({ message: 'record Deleted successfully', data: {...req.body}  }))
        .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

module.exports = getAllStates
