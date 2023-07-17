let express = require('express')

let Review = require('../controller/companyReviewController')
let {registerReviewValidation} = require('../validations/companyReview/companyReviewDataValidation')

let companyReviewRouter = express.Router()

companyReviewRouter.post('/create',registerReviewValidation,Review.createReview)
companyReviewRouter.patch('/update/:id',Review.updateReview)
companyReviewRouter.delete('/delete/:id',Review.deleteReview)

module.exports = companyReviewRouter