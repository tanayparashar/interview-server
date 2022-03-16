const mongoose = require("mongoose");

const candidateSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    candidateEmail: String,
    candidateName: String,
    interviewerName: String,
    interviewerEmail:String,
    startTime: Number,
    endTime:Number
});

module.exports=mongoose.model("Candidate",candidateSchema);