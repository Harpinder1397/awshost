const is = require("is_js")
const bcryptjs = require("bcryptjs")
const { Router } = require("express")
var multer  = require('multer');
const { validate } = require("micro-validator").default
const userInfoValidations = require("../validation/userInfo")
const { User } = require("../models/userInfo")
var upload = multer({ dest: __dirname + '/public/uploads/' });
const user = Router();

var type = upload.single('upl');

const requiredTypes = ["business", "startup", "individual"]
const requiredServiceTypes = ["design", "development", "both"]
const requiredStates = ["mobile", "web", "mobileUI", "webUI", "branding"]

const generatePassword = (rawPassword = "") =>
  new Promise((resolve, reject) => {
    bcryptjs.hash(rawPassword, 10, function(err, hash) {
      if (err) {
        reject(err)
      }
      resolve(hash)
    })
  })

user.post("/", async (req, res) => {
  const validationErrors = validate(userInfoValidations, req.body)

  if (!is.empty(validationErrors)) {
    return res.status(400).json({ errors: validationErrors })
  }

  
  try {
    const record = await User.find({userName: req.body.userName});
    if (record.length) {
      res.status(400).json({
        errors: {
          "duplicate user": "User with this name is already exist"
        },
      }) 
      throw new Error("User with this name is already exist")
    }

    const hashedPassword = await generatePassword(req.body.password);
    const userDetail = {...req.body, password: hashedPassword, createdAt: new Date()};
    // console.log("userDetail", userDetail);
    
    User.create(
      userDetail, (err, users) => {
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

//
user.post('/:userId', (req, res) => {

  // const validationErrors = validate(leaveValidations, req.body)
  // if(!is.empty(validationErrors)) {
  //     return res.status(400).json({ errors: validationErrors })
  // }

  const { userId = "",  } = req.params
  const userDetail = {...req.body, updatedAt: new Date()};

  try {
      User.findByIdAndUpdate(userId, userDetail, {new: true})
        .then(() => res.status(200).json({ message: 'record updated successfully', data: {...req.body}  }))
        .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

user.get('/', async (req, res) => {
  let token = req.headers['authorization'];
  // if(!token) {
  //   return res.status(401).json({ errors: ['not authorised'] })
  // }
  try {
    if(req.query.experience){
      const users = await User.find({['experience']:{ $gte: req.query.experience - 5 ,$lte: req.query.experience}});
      return res.status(200).json(
        users
      )
    } else {
    const users = await User.find(req.query);
    return res.status(200).json(
      users
    )}
  } catch (error) {
    return res.status(502).json({ errors: error })
  }
})

// user.get('/', async (req, res) => {
//   let token = req.headers['authorization'];
//   // if(!token) {
//   //   return res.status(401).json({ errors: ['not authorised'] })
//   // }
//   try {
//     const users = await User.find({
//       "$or": [
//         // {
//         //   experience: {$regex: {$gte: req.query.experience - 5 ,$lte: req.query.experience}}
//         // },
//         {
//           category: { $regex: req.query.category}
//         },
//         {
//           fullName: { $regex: req.query.fullName}
//         },
//         {
//           subCategory: {$regex: req.query.subCategory}
//         }
//       ]
//     });
//     return res.status(200).json(users)
//   } catch (error) {
//     return res.status(502).json({ errors: error })
//   }
// })

user.get('/:userId', async (req, res) => {
  let token = req.headers['authorization'];
  const { userId = '' } = req.params

  if(!token) {
    return res.status(401).json({ errors: ['not authorised'] })
  }

  try {
    const user = await User.find(
      { _id : userId },
      { "password": 0, "__v": 0 } // does not fetch these values
    )
   
    return res.status(200).json(user[0])
  }
  catch(error){
    return res.status(502)
      .json({ errors: ['Got some error while fetching data.']})
  }
})

user.post('/:_id/projects', (req, res) => {
  const { _id = '',  } = req.params
  try {
    // userDetail
    User.findByIdAndUpdate({_id}, {$set:{
        "projects" : req.body
    }}, {new: true})
    .then(() => res.status(200).json({ message: 'record updated successfully', data: {...req.body}  }))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

user.post('/:_id/thumbnails', (req, res) => {
  const { _id = "",  } = req.params
  try {
    
    User.findByIdAndUpdate({_id}, {$set:{
        "thumbnails" : req.body
    }}, {new: true})
    .then(() => res.status(200).json({ message: 'record updated successfully', data: {...req.body}  }))
    .catch(error => console.log(error))
  }
  catch(error){
      console.log( error)
  }
})

module.exports = user
