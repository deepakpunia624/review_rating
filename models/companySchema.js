const mongoose =require("mongoose");

const companySchema =  new mongoose.Schema({

    companyName : {type:String,require:true},
    companyCity:{type:String,require:true},
    companyLocation:{type:String,require:true},
    companyPic:{type:String,require:true},
    isActive:{type:String,default:true},
    createdAt:{type:String,default:true},
})
companySchema.set("timestamps",true);
module.exports = mongoose.model("company",companySchema);