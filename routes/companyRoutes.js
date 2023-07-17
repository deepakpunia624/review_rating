let express = require('express')
let company = require('../controller/companyController')
const {isUserAuthorization}= require('../middlewares/authToken')
let {registerCompanyValidation} = require('../validations/company/companyDataValidation')
const {upload} = require('../middlewares/companyImageStorage')

let companyrouter = express.Router()
companyrouter.post('/create',upload.single("companyPic"),registerCompanyValidation,company.createCompany)
companyrouter.get('/list',company.companyList)
companyrouter.get('/details/:id',company.companyDetail)
companyrouter.get('/search/:key',company.companySearch)

module.exports = companyrouter