let express = require('express')

let review = require('../controller/companyReviewController')
let {registerReviewValidation} = require('../validations/companyReview/companyReviewDataValidation')

let companyReviewRouter = express.Router()

companyReviewRouter.post('/create',registerReviewValidation,review.createReview)
companyReviewRouter.patch('/update/:id',review.updateReview)
companyReviewRouter.delete('/delete/:id',review.deleteReview)

module.exports = companyReviewRouter