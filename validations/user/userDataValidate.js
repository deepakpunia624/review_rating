const userValSchema =require("./userValSchema")
const {unlinkSync} =require("fs");

module.exports = {
    registerUserValidation: async(req,res,next)=>{
        const value = await userValSchema.registerUser.validate(req.body,{abortEarly:false})
        //when validating with abortEarly set to false, it only returns the first error it will encounter
        if(value.error){
            req.file ? unlinkSync(req.file.path) : null;
            res.status(403).json({
                success : false,
                message :value.error.details[0].message
             })
        }else{
            
            next()
        }

    },
    resetPasswordValidation: async(req,res,next)=>{
        const value = await userValSchema.resetPassword.validate(req.body,{abortEarly:false})
        if(value.error){
            res.status(403).json({
                success : false,
                message :value.error.details[0].message
             })
        }else{
            next()
        }

    },
}