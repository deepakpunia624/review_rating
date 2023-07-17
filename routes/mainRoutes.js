let express = require("express")
const userRouter= require('./userRoutes')
const companyRouter =require('../routes/companyRoutes')
const companyReviewrouter = require("./companyReviewRoutes")

let commonRouter = express.Router()

commonRouter.use('/user', userRouter)
commonRouter.use('/company',companyRouter)
commonRouter.use('/review',companyReviewrouter)

module.exports = commonRouter