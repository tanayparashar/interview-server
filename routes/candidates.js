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
App.post('/',async (req,res)=>{
    const flag1=req.body.candidateEmail;
    var findarr=[];
    var concide=false;
    // Candidate.find({ candidateEmail:flag1 }, function (err, docs) {
    //     if (err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log(docs);
    //         findarr=docs;
    //     }
    // });
    let docs =await Candidate.find({ candidateEmail:flag1 })
    findarr=docs;
    
    // .then( (data) => (findarr=(data)) );
    
    findarr.forEach( (ele)=>{
        let s=ele.startTime;
        let e=ele.endTime;
        console.log(s,e);
        if(s<=req.body.startTime  && req.body.startTime<=e)
        {
            concide=true;
        }
        if(s<=req.body.endTime  && req.body.endTime<=e)
        {
            concide=true;
        }
        if(s>=req.body.startTime  &&  req.body.endTime>=e)
        {
            concide=true;
        }
    });
    console.log(concide);
    if(concide===true)
    {
        //console.log("concides");
        return res.status(200).json(
            {
                message:"Start or End Time Coincide"
            }
        );
    }
    else
    {
        //console.log("all good");
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
                console.log(err);
                res.status(500).json(
                    {
                        message:"error adding candidates to database"
                    }
                )
            });
    }
});


App.post('/delete',async (req,res)=>{
    Candidate.deleteOne({candidateEmail:req.body.candidateEmail,interviewerEmail:req.body.interviewerEmail,startTime:req.body.startTime,endTime:req.body.endTime})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json(
            {
                error:err
            }
        );
    });
});

App.get("/",(req,res)=>{
    //req=JSON.parse(req);
    //console.log(req.body);
    Candidate.find()
    .exec()
    .then( docs =>{
            //console.log(docs);
            res.status(200).json(docs);
    })
    .catch( err => {
        console.log(error);
        res.status(500).json(
            {
                message:"error retreiving candidates from database"
            }
        )
    });
});

module.exports=App;
