const mongoose =require("mongoose");

const userSchema =  new mongoose.Schema({

    userName : {type:String,require:true},
    userPhone:{type:String,require:true},
    userPassword:{type:String,require:true},
    userEmail:{type:String,require:true},
    userCity:{type:String,require:true},
    userState:{type:String,require:true},
    userRoll:{type:String,default:"user"},
    isActive:{type:String,default:true},

})
userSchema.set("timestamps",true);
module.exports = mongoose.model("user",userSchema);