const express = require('express');
//const router = express.Router();
const bodyParser = require('body-parser');
const cors=require('cors');
const mongoose=require("mongoose");

const Candidate=require('../models/candidate');

const App=express();
App.use(cors());
App.use(bodyParser.json());
App.options('/', cors());
App.post('/',(req,res)=>{
    console.log(req.body);
    const candidate=new Candidate({
        _id:new mongoose.Types.ObjectId(),
        candidateEmail: req.body.candidateEmail,
        candidateName: req.body.candidateName,
        interviewerName: req.body.interviewerName,
        interviewerEmail:req.body.interviewerEmail,
        startTime: req.body.startTime,
        endTime:req.body.endTime
    });
    candidate.save().then(result => {
        console.log(result);
        res.status(201).json(
        {
            message:"candidatae created",
            createdCandidate:candidate
        }
    );
    })
    .catch(err=>
        {
            console.log(error)
            res.status(500).json(
                {
                    message:"error adding candidates to database"
                }
            )
        });
    
});


App.get("/",(req,res)=>{
    //req=JSON.parse(req);
    //console.log(req.body);
    Candidate.find()
    .exec()
    .then( docs =>{
            console.log(docs);
            res.status(200).json(docs);
    })
    .catch( err => {
        console.log(error);
        res.status(500).json(
            {
                message:"error retreiving candidates from database"
            }
        )
    })
});

module.exports=App;
