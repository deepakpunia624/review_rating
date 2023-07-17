let companyReviewSchema = require("../models/companyReviewSchema");

//...................................createReview API.........................................
const createReview = async (req, res) => {
  const reviewData = new companyReviewSchema(req.body);
  try {
    await reviewData.save();
    res.status(201).json({
      success: true,
      message: "Review add successfully",
      review: reviewData,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: `error occur ${error.message}`,
    });
  }
};

//.........................................deleteReview API...............................
let deleteReview = async (req, res) => {
  console.log("data :", req.params.id);
  //let findReview = await companyReviewSchema.findById(req.params.id)
  try {
    let reviewDelete = await companyReviewSchema.findByIdAndDelete(req.params.id);
    res.status(202).json({
      success: true,
      message: "review delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

//........................................updateReview API.....................................
let updateReview = async (req, res) => {
  // let updateReview = await companyReviewSchema.findById(req.params.id)
  try {
    let reviewUpdate = await companyReviewSchema.findByIdAndUpdate(req.params.id,req.body);
    res.status(201).json({
      success: true,
      message: "review update successfully",
    });
  } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
    });
  }
};

module.exports = {
  createReview,
  deleteReview,
  updateReview,
};
