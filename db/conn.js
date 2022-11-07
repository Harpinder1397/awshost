const mongoose = require('mongoose');
const DB = process.env.DATABASE;

mongoose.connect(DB,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('I am connected 11'))
.catch(error => console.log(error));