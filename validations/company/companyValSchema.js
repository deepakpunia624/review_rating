const joi =require("joi")

const companyValSchema = {

    registerCompany : joi.object({

        companyName : joi
            .string()
            .min(5)
            .max(20)
            .message({
            "string.min":"{#label} should contain at least {#limit} characters ",
            "string.max":"{#label} should contain at least {#limit} characters ",
                    })       
            .required(),
            
        companyCity : joi
            .string()
            .required(),
        companyLocation : joi
            .string()
            .required(),
        
    }).unknown(true),

    
    
}
module.exports =  companyValSchema
