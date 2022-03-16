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
    })
    .catch(err=>console.log(error));
    res.status(201).json(
        {
            message:"candidatae created",
            createdCandidate:candidate
        }
    );
});

/*
App.get("/",(req,res)=>{
    //req=JSON.parse(req);
    //console.log(req.body);
    res.status(200).json({hello:"world"});
});
*/
module.exports=App;
