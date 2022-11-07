const { Router } = require('express')

const thumbnails = Router()

const { Thumbnails } = require('../models/thumbnails')

thumbnails.get('/:userId', async (req, res) => { 
  const { userId = '' } = req.params
  // let token = req.headers['authorization'];
  // if(req.query.subCategory && !token) {
  //   return res.status(401).json({ errors: ['not authorised'] })
  // }
  try {
    const thumbnails = await Thumbnails.find(
      { userId }
    )
    return res.status(200).json(thumbnails)
  } catch (error) {
    return res.status(502).json({ errors: ['Some error occurred'] })
  }
})

thumbnails.post("/", async (req, res) => {
  try {
    const newThumbnail = {...req.body, createdAt: new Date()};

    Thumbnails.create(
      newThumbnail, (err, users) => {
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

thumbnails.delete("/:userId/:imgId", async (req, res) => {
  const { userId = '', imgId= '' } = req.params
  try {
    Thumbnails.deleteOne({userId, imgId})
    .then(() => res.status(200).json({ success: true }))
    .catch(error => console.log(error))
  } catch (err) {
    res
      .status(400)
      .send({ message: "Something went wrong. Unable to contact" })
  }
})

// thumbnails.put("/:userId/:imgId", async (req, res) => {
//   const { userId = '', imgId= '' } = req.params
//   try {
//     Thumbnails.deleteOne({userId, imgId})
//     .then(() => res.status(200).json({ success: true }))
//     .catch(error => console.log(error))
//   } catch (err) {
//     res
//       .status(400)
//       .send({ message: "Something went wrong. Unable to contact" })
//   }
// })

// user.post('/:_id/projects', (req, res) => {
//   const { _id = "",  } = req.params
//   try {
//     // userDetail
//     User.findByIdAndUpdate({_id}, {$set:{
//         "projects" : req.body
//     }}, {new: true})
//     .then(() => res.status(200).json({ message: 'record updated successfully', data: {...req.body}  }))
//     .catch(error => console.log(error))
//   }
//   catch(error){
//       console.log( error)
//   }
// })

module.exports = thumbnails