const mongoose = require("mongoose");

const candidateSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    candidateEmail: {type:String, required: true},
    candidateName: {type:String, required: true},
    interviewerName: {type:String, required: true},
    interviewerEmail:{type:String, required: true},
    startTime: {type:Number, required: true},
    endTime:{type:Number, required: true}
});

module.exports=mongoose.model("Candidate",candidateSchema);