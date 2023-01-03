const { Router } = require('express')

const categories = Router()

const { Categories } = require('../models/categories')

categories.get('/', async (req, res) => { 

  let token = req.headers['authorization'];
  // if(req.query.subCategory && !token) {
  if(req.query.subCategory && !token) {
    return res.status(401).json({ errors: ['not authorised'] })
  }
  try {
    const categories = await Categories.find().sort({value: 1})
    return res.status(200).json(categories)
  } catch (error) {
    return res.status(502).json({ errors: ['Some error occurred'] })
  }
})

categories.post("/", async (req, res) => {
  try {
    const record = await Categories.find({value: req.body.value});
    if (record.length) {
      res.status(400).json({
        errors: {
          "message": "category with this name is already exist"
        },
      }) 
      throw new Error("category with this name is already exist")
    }

    const newCategoey = {...req.body, key: req.body.value.toLowerCase().replace(' ', '-'), createdAt: new Date()};
    // console.log("newCategoey", newCategoey);
    
    Categories.create(
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

categories.post('/:_id', (req, res) => {
  const { _id = "",  } = req.params
  try {
    Categories.findByIdAndUpdate(_id, req.body, {new: true})
    .then(() => res.status(200).json({ message: 'record updated successfully', data: {...req.body}  }))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

categories.delete('/:_id', (req, res) => {
  const { _id = "",  } = req.params

  try {
    Categories.findOneAndDelete({ _id })
        .then(() => res.status(200).json({ message: 'record Deleted successfully', data: {...req.body}  }))
        .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

categories.post('/:_id/subCategory', (req, res) => {
  const { _id = "" } = req.params
  try {
    Categories.updateOne({
      _id : _id
    },
    {$addToSet: {
      childern: req.body
    }},{})
    .then(() => res.status(200).json({ message: 'record add successfully', data: {...req.body}}))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

categories.post('/:_id/subCategory/delete', (req, res) => {
  const { _id = "",  } = req.params
  try {
    
    Categories.findByIdAndUpdate({_id}, {
          "childern" : req.body
    }, {new: true})
    .then(() => res.status(200).json({ message: 'record delete successfully', data: {...req.body}  }))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

categories.post('/:_id/subCategory/:id', (req, res) => {
  const { _id = "", id } = req.params
  try {
    Categories.updateOne({
      _id : _id, "childern._id": Number(id)
    },
    {$set: {
      "childern.$.key" : req.body.key,
      "childern.$.value" : req.body.value,
      "childern.$._id" : req.body._id
    }},{})
    .then(() => res.status(200).json({ message: 'record updated successfully', data: {...req.body}}))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

categories.post('/:_id/tags', (req, res) => {
  const { _id = "",  } = req.params
  try {
    Categories.updateOne({
      _id : _id
    },
    {$addToSet: {
      tags: req.body
    }},{})
    .then(() => res.status(200).json({ message: 'record add successfully', data: {...req.body}  }))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

categories.post('/:_id/tags/delete', (req, res) => {
  const { _id = "",  } = req.params
  try {
    
    Categories.findByIdAndUpdate({_id}, {
        "tags" : req.body
    }, {new: true})
    .then(() => res.status(200).json({ message: 'record delete successfully', data: {...req.body}  }))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})


categories.post('/:_id/tags/:id', (req, res) => {
  const { _id = "", id } = req.params
  try {
    Categories.updateOne({
      _id : _id, "tags._id": Number(id)
    },
    {$set: {
      "tags.$.key" : req.body.key,
      "tags.$.value" : req.body.value,
      "tags.$._id" : req.body._id
    }},{})
    .then(() => res.status(200).json({ message: 'record updated successfully', data: {...req.body}}))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

categories.post('/:_id/best-in', (req, res) => {
  const { _id = "",  } = req.params
  try {
    Categories.updateOne({
      _id : _id
    },
    {$addToSet: {
      bestIn: req.body
    }},{})
    .then(() => res.status(200).json({ message: 'record add successfully', data: {...req.body}  }))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

categories.post('/:_id/best-in/delete', (req, res) => {
  const { _id = "",  } = req.params
  try {
    
    Categories.findByIdAndUpdate({_id}, {
        "bestIn" : req.body
    }, {new: true})
    .then(() => res.status(200).json({ message: 'record delete successfully', data: {...req.body}  }))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

categories.post('/:_id/best-in/:id', (req, res) => {
  const { _id = "", id } = req.params
  try {
    Categories.updateOne({
      _id : _id, "bestIn._id": Number(id)
    },
    {$set: {
      "bestIn.$.key" : req.body.key,
      "bestIn.$.value" : req.body.value,
      "bestIn.$._id" : req.body._id
    }},{})
    .then(() => res.status(200).json({ message: 'record updated successfully', data: {...req.body}}))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

categories.post('/:_id/extra-talent', (req, res) => {
  const { _id = "",  } = req.params
  try {
    Categories.updateOne({
      _id : _id
    },
    {$addToSet: {
      extraTalent: req.body
    }},{})
    .then(() => res.status(200).json({ message: 'record add successfully', data: {...req.body}  }))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

categories.post('/:_id/extra-talent/delete', (req, res) => {
  const { _id = "",  } = req.params
  try {
    
    Categories.findByIdAndUpdate({_id}, {
        "extraTalent" : req.body
    }, {new: true})
    .then(() => res.status(200).json({ message: 'record delete successfully', data: {...req.body}  }))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

categories.post('/:_id/extra-talent/:id', (req, res) => {
  const { _id = "", id } = req.params
  try {
    Categories.updateOne({
      _id : _id, "extraTalent._id": Number(id)
    },
    {$set: {
      "extraTalent.$.key" : req.body.key,
      "extraTalent.$.value" : req.body.value,
      "extraTalent.$._id" : req.body._id
    }},{})
    .then(() => res.status(200).json({ message: 'record updated successfully', data: {...req.body}}))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

categories.post('/:_id/filters/delete', (req, res) => {
  const { _id = "",  } = req.params
  try {
    
    Categories.findByIdAndUpdate({_id}, {
        "filters" : req.body
    }, {new: true})
    .then(() => res.status(200).json({ message: 'record delete successfully', data: {...req.body}  }))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

categories.post('/:_id/filters', (req, res) => {
  const { _id = "",  } = req.params
  try {
    Categories.updateOne({
      _id : _id
    },
    {$addToSet: {
      filters: req.body
    }},{})
    .then(() => res.status(200).json({ message: 'record add successfully', data: {...req.body}  }))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

module.exports = categories
