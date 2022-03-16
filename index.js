const express = require('express');
const App=express();
const router = express.Router();
const mongoose=require('mongoose');
const Candidate= require('./routes/candidates.js');
// const cors=require('cors');
// const bodyParser = require('body-parser');
// App.use(bodyParser.json());
// App.use(cors());
mongoose.connect("mongodb+srv://tanayparashar:HelloWorld@cluster0.oxcdf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

App.use('/candidates',Candidate);

App.listen(5000,()=>{
    console.log("5000")
});
