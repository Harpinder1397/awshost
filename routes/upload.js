const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Router } = require('express')
const { User } = require("../models/userInfo")

const uploading = Router()

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Init Upload
  const upload = multer({
    storage: storage,
    // limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('imgUploader');
  
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }
  
//   // EJS
//   app.set('view engine', 'ejs');
  
  // Public Folder
//   app.use(express.static('./public'));
  
//   app.get('/', (req, res) => res.render('index'));
  
uploading.post('/:userId', (req, res) => {
  const { userId } = req.params;
    upload(req, res, (err) => {
      if(err){
        res.status(403).json({ errors: err })
      } else {
        if(req.file == undefined){
            res.status(402).json({ errors: ['No file selectd'] })
        } else {
            const thumbnail = req.file.path.replace('public', 'http://node-env.eba-xnwspbk7.ap-northeast-1.elasticbeanstalk.com');
            res.send(thumbnail);
        }
      }
    });
  });

  uploading.delete('/delete', (req, res) => {
    const { url } = req.query;
    const path = url.replace('http://node-env.eba-xnwspbk7.ap-northeast-1.elasticbeanstalk.com', 'public')
    fs.unlink(path, (err) => {
      if (err) {
        res.status(400).json({ error: 'something went wrong' })
      }
      res.status(200).json({ success: true, status: 200 })
    });
  });
module.exports = uploading
  