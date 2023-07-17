const jwt = require("jsonwebtoken")


const userAuthetication = async (req,res,next)=>{

    const authHeader =req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){

        let token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                res.status(401).json({
                    success:false,
                    message:"user is not authorized",
                });
            }else{
                req.user = decoded.userData;
                console.log(decoded.userData);
                next();
            }
        });
    }else{
        res.status(409).json({
            success:false,
            message:"Token not found",
        });
    }
};

// const isUserAuthorization = async(req,res,next)=>{
//     if(req.body.userSchema === 'admin'){
//         next()
//     }else{
//         res.sendStatus(403).json({
//             success:false,
//             message:"you are not allow"
//         });
//     }
// }

module.exports ={
    userAuthetication,
    //isUserAuthorization
}