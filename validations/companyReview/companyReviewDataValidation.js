const companyValReview = require('../companyReview/companyReviewValSchema')
const {unlinkSync} =require("fs");

module.exports = {      

    registerReviewValidation: async(req,res,next)=>{
        const value = await companyValReview.registerReview.validate(req.body,{abortEarly:false})
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
    }