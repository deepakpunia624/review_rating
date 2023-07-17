const joi = require("joi")

const companyValReview = {

    registerReview : joi.object({

         companyReviewSubject : joi
            .string()
            .min(5)
            .max(20)
            .message({
            "string.min":"{#label} should contain at least {#limit} characters ",
            "string.max":"{#label} should contain at least {#limit} characters ",
                    })       
            .required(),
            
         companyReview : joi
            .string()
            .required(),
         companyRating : joi
            .string()
            .required(),
        
    }).unknown(true),
}
module.exports =  companyValReview  
