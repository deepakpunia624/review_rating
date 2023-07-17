let express = require("express");

let companySchema = require("../models/companySchema");
const {unlinkSync} = require("fs");
const companyReviewSchema = require("../models/companyReviewSchema");
//let app =express()

//.........................create company API..........................................
module.exports = {
  createCompany: async (req, res) => {
    let companyData = new companySchema(req.body);
    try {
      let isCompanyExists = await companySchema.findOne({
        companyName: req.body.companyName,
      });
      if (isCompanyExists) {
        req.file ? unlinkSync(req.file.path) : null;
        res.status(401).json({
          success: false,
          message: "this company is already exist",
        });
      } else {
      
        
        const filePath = `/uploads/company/${req.file.filename}`
       companyData.companyPic = filePath;

       const company = await companyData.save();

        res.status(201).json({
          success: true,
          message: "company successsfully registered",
          company: company,
      
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occur ${error.message}`,
      });
    }
  },

  //................................company List..............................
  companyList: async (req, res) => {
    try {
      const companyList = await companySchema.find();
      const totalCompany = await companySchema.find().count();
      res.status(200).json({
        success: true,
        message: "All company found successfully",
        count: totalCompany,
        companies: companyList,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },

  //.......................................Company Detail API...................................
  companyDetail: async(req,res)=>{
    try{
      const companyDetail = await companySchema.findById(req.params.id)
      const reviewDataList = await companyReviewSchema.find({companyId : req.params.id}).populate({
        path: "userId",select : "userName profilePic"});
      res.status(200).json({
        success : true,
        message : "Review list fetched successfully",
        company : companyDetail ,
        review : reviewDataList,
      });
    }catch(error){
      res.status(500).json({
        success : false,
        error : error.message
      });
    }
  },



 //.................................company Search API...............................
 companySearch : async (req,res)=>{
  console.log(req.params.key)
 try{
  const searchCompany = await companySchema.find({companyName:{$regex:req.params.key,$options:'i'}})
  //$options :'i' is options with i perameter specifies that we want to carry out search without considering upper or lower case
  res.status(200).json({
    success : true,
    message : "this is the company",
    company : searchCompany ,
    
  })
 }catch(error){
  res.status(500).json({
    success:false,
    message : error.message
  });
 }
 }
};