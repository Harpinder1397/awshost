const { Router } = require('express')

const filters = Router()

const { Filters } = require('../models/filters')

filters.get('/', async (req, res) => { 

  let token = req.headers['authorization'];
  if(!token) {
    return res.status(401).json({ errors: ['not authorised'] })
  }
  try {
    const record = await Filters.find().sort({key: 1})
    return res.status(200).json(record)
  } catch (error) {
    return res.status(502).json({ errors: ['Some error occurred'] })
  }
})

filters.post("/", async (req, res) => {
  const filters = req.body.value && {'value': new RegExp('^' + req.body.value + '$', 'i')};

  try {
    const record = await Filters.find(filters);
    if (record.length) {
      res.status(400).json({
        errors: {
          "message": "filters with this name is already exist"
        },
      }) 
      throw new Error("filters with this name is already exist")
    }

    const newCategoey = {...req.body, key: req.body.value.toLowerCase().replace(' ', '-')};
    
    Filters.create(
      newCategoey, (err, users) => {
        if (err) {
          throw err;
        }
        res.json(users);
      }
    )
  } catch (err) {
    res
      .status(400)
      .send({ message: "Something went wrong. Unable to contact" })
  }
})

filters.post('/:_id', (req, res) => {
  const { _id = "",  } = req.params
  try {
    Filters.findByIdAndUpdate(_id, {...req.body, key: req.body.value.toLowerCase().replace(' ', '-')}, {new: true})
        .then(() => res.status(200).json({ message: 'record updated successfully', data: {...req.body}  }))
        .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

filters.delete('/:_id', (req, res) => {
  const { _id = "",  } = req.params

  try {
    Filters.findOneAndDelete({ _id })
        .then(() => res.status(200).json({ message: 'record Deleted successfully', data: {...req.body}  }))
        .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

module.exports = filters
