window = {}

const express = require('express')
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const cors = require("cors")
const app = express()
const swaggerUi = require('swagger-ui-express')
const mongoose = require('mongoose')

const swaggerDocument = require('./swagger.json')

const loginRouter = require('./routes/login')
const user = require('./routes/user')
const uploadApi = require('./routes/upload');
const getAllStates = require('./routes/states')
const projects = require('./routes/projects')
const categories = require('./routes/categories')
const favourites = require('./routes/favourites')
const thumbnails = require('./routes/thumbnails')
dotenv.config({path: './config.env'});
const PORT = process.env.PORT;

mongoose.connect('mongodb+srv://Harpinder0:harpindersingh@cluster0.vl3kis6.mongodb.net/sell3cart?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('I am connected'))
  .catch(error => console.log(error));

app.use(bodyParser.json())
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (_, res) => {
  res.json({ message: "hello there" })
})

// This is for test api call

app.get('/dummy', (_, res) => {
  res.json({ message: "Test is passed" })
})

app.use(express.static('public'));

app.use('/login', loginRouter)
app.use('/user', user)
app.use('/upload', uploadApi)
app.use('/categories', categories)
app.use('/states', getAllStates)
app.use('/projects', projects)
app.use('/favourites', favourites)
app.use('/thumbnails', thumbnails)

app.listen(PORT, () => console.log('server started'))


// getAllStates.get('/', async (req, res) => { 
//   try {
//     const states = await States.find({
//       name: new RegExp('^' + req.query.name + '$', 'i'), // req.query.name/ Guntura,
//       state: new RegExp('^' + req.query.state + '$', 'i') // req.query.name/ Guntura,    
//     })
//     return res.status(200).json(states)
//   } catch (error) {
//     return res.status(502).json({ errors: ['Some error occurred'] })
//   }
// })