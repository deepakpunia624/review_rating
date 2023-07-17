let express = require('express')
let user= require("../controller/usercontroller")
let {registerUserValidation,resetPasswordValidation} = require('../validations/user/userDataValidate')

const {userAuthetication} = require("../middlewares/authToken")
const {upload}= require('../middlewares/userImageStorage')

let router = express.Router()

router.post('/create',upload.single("profilePic"),registerUserValidation,user.createUser)
router.post('/login',user.userLogin)
router.get('/check', userAuthetication,  user.checkToken)
router.post('/resetpasswordemail',user.sendUserResetPasswordEmail)
router.post('/resetpassword/:id/:token',resetPasswordValidation,user.resetPassword)

module.exports =router