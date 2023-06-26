const mongoose =require("mongoose");

const companyReviewSchema =  new mongoose.Schema({

    companyReviewSubject : {type:String,require:true},
    companyReview        : {type:String,require:true},
    companyRating        : {type:String,require:true},
    isActive      :        {type : String , default:true},

})
companyReviewSchema.set("timestamps",true);
module.exports = mongoose.model("companyReview",companyReviewSchema);