const is = require("is_js")
const bcryptjs = require("bcryptjs")

// // new 
// const express = require('express')
// const cors = require('cors')
// const cookieParser = require('cookie-parser')

const { Router } = require("express")
var multer  = require('multer');
const { validate } = require("micro-validator").default
const userInfoValidations = require("../validation/userInfo")
const { User } = require("../models/userInfo")

// const {
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   SERVER_ROOT_URI,
//   UI_ROOT_URI,
//   JWT_SECRET,
//   COOKIE_NAME
// } = require('../middleware/config.js');

var upload = multer({ dest: __dirname + '/public/uploads/' });
const user = Router();

var type = upload.single('upl');

const requiredTypes = ["business", "startup", "individual"]
const requiredServiceTypes = ["design", "development", "both"]
const requiredStates = ["mobile", "web", "mobileUI", "webUI", "branding"]

// console.log(JWT_SECRET, 'JWT_SECRET')

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

// const asp = express();

// asp.use(
//   cors({
//     // Sets Access-Control-Allow-Origin to the UI URI
//     origin: UI_ROOT_URI,
//     // Sets Access-Control-Allow-Credentials to true
//     credentials: true,
//   })
// );

// asp.use(cookieParser());

// // users get function
user.get('/', async (req, res) => {
  // let token = req.headers['authorization'];
  // if(!token) {
    //   return res.status(401).json({ errors: ['not authorised'] })
    // }
    // const numbers = [...req.query.experience, 0];
  // const max = Math.max.apply(null, numbers)
  // const min = Math.min.apply(null, numbers);
  // const experience = req.query.experience && {'experience':{ $gte: Math.min.apply(null, ...req.query.experience,0) ,$lte: Math.max.apply(null, ...req.query.experience,0)}};
  // console.log([...Array(max).keys()], '[...Array(10).keys()]')

  const experience = req.query.experience && {'experience':{ $gte: req.query.experience - 4 ,$lte: req.query.experience}};
  const age = req.query.age && {'age':{$gte: [0] ,$lte: 2}};
  const gender = req.query.gender && {'gender': req.query.gender};
  const languages = req.query.languages && {'languages': req.query.languages};
  const category = req.query.category && {'category': new RegExp('^' + req.query.category + '$', 'i')};
  const subCategory = req.query.subCategory && {'subCategory': new RegExp('^' + req.query.subCategory + '$', 'i')};
  const tags = req.query.tags && {'tags': new RegExp('^' + req.query.tags + '$', 'i')};
  const city = req.query.city && {'city': new RegExp('^' + req.query.city + '$', 'i')};
  const state = req.query.state && {'state': new RegExp('^' + req.query.state + '$', 'i')};
  // const userName = req.query.userName && {'userName': new RegExp('^' + req.query.userName.split(",") + '$', 'i')};
  const fullName = req.query.fullName && {'userName': new RegExp('^' + req.query.fullName + '$', 'i')};

  // all object add one object
  const query = {
    ...gender, ...age, ...experience, ...languages,
    ...category, ...subCategory, ...tags, ...city,
    ...state, ...fullName
  }

  try {
    const users = await User.find(query);
    return res.status(200).json(
      users
    )
  } catch (error) {
    return res.status(502).json({ errors: error })
  }
})

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


// // login google auth

// const redirectURI = "auth/google";

// function getGoogleAuthURL() {
//   const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
//   const options = {
//     redirect_uri: `${SERVER_ROOT_URI}/${redirectURI}`,
//     client_id: GOOGLE_CLIENT_ID,
//     access_type: "offline",
//     response_type: "code",
//     prompt: "consent",
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "https://www.googleapis.com/auth/userinfo.email",
//     ].join(" "),
//   };

//   return `${rootUrl}?${querystring.stringify(options)}`;
// }

// // Getting login URL
// asp.get("/auth/google/url", (req, res) => {
//   return res.send(getGoogleAuthURL());
// });

// function getTokens({
//   code,
//   clientId,
//   clientSecret,
//   redirectUri,
// }){
//   /*
//    * Uses the code to get tokens
//    * that can be used to fetch the user's profile
//    */
//   const url = "https://oauth2.googleapis.com/token";
//   const values = {
//     code,
//     client_id: clientId,
//     client_secret: clientSecret,
//     redirect_uri: redirectUri,
//     grant_type: "authorization_code",
//   };

//   return axios
//     .post(url, querystring.stringify(values), {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     })
//     .then((res) => res.data)
//     .catch((error) => {
//       console.error(`Failed to fetch auth tokens`);
//       throw new Error(error.message);
//     });
// }

// // Getting the user from Google with the code
// asp.get(`/${redirectURI}`, async (req, res) => {
//   const code = req.query.code;

//   const { id_token, access_token } = await getTokens({
//     code,
//     clientId: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     redirectUri: `${SERVER_ROOT_URI}/${redirectURI}`,
//   });

//   // Fetch the user's profile with the access token and bearer
//   const googleUser = await axios
//     .get(
//       `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
//       {
//         headers: {
//           Authorization: `Bearer ${id_token}`,
//         },
//       }
//     )
//     .then((res) => res.data)
//     .catch((error) => {
//       console.error(`Failed to fetch user`);
//       throw new Error(error.message);
//     });

//   const token = jwt.sign(googleUser, JWT_SECRET);

//   res.cookie(COOKIE_NAME, token, {
//     maxAge: 900000,
//     httpOnly: true,
//     secure: false,
//   });

//   res.redirect(UI_ROOT_URI);
// });


// // Getting the current user
// asp.get("/auth/me", (req, res) => {
//   console.log("get me");
//   try {
//     const decoded = jwt.verify(req.cookies[COOKIE_NAME], JWT_SECRET);
//     console.log("decoded", decoded);
//     return res.send(decoded);
//   } catch (err) {
//     console.log(err);
//     res.send(null);
//   }
// });

module.exports = user
