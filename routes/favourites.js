const { Router } = require('express')

const favourites = Router()

const { Favourites } = require('../models/favourites')

favourites.get('/:userId', async (req, res) => { 
  const { userId = '' } = req.params
  console
  // let token = req.headers['authorization'];
  // if(req.query.subCategory && !token) {
  //   return res.status(401).json({ errors: ['not authorised'] })
  // }
  try {
    const favourites = await Favourites.find(
      { userId }
    )
    return res.status(200).json(favourites)
  } catch (error) {
    return res.status(502).json({ errors: ['Some error occurred'] })
  }
})

favourites.post("/", async (req, res) => {
  try {
    const newFavourite = {...req.body, createdAt: new Date()};

    Favourites.create(
      newFavourite, (err, users) => {
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

favourites.delete("/:userId/:favUserId", async (req, res) => {
  const { userId = '', favUserId= '' } = req.params
  try {
    Favourites.deleteOne({userId,favUserId})
    .then(() => res.status(200).json({ success: true }))
    .catch(error => console.log(error))
  } catch (err) {
    res
      .status(400)
      .send({ message: "Something went wrong. Unable to contact" })
  }
})

module.exports = favourites