//const { response } = require("express");

let userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
//const express = require("express");
const {unlinkSync} =require("fs");
const jwt = require("jsonwebtoken");
const { transporter } = require("../services/emailService");
//const app = express;

//.......................................signup API................................

let createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  // console.log (req.body)
  let userData = new userSchema(req.body);
  try {
    const isUserExist = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExist) {
      //.....req.file ? unlinkSync(req.file.path) : null; this line for delete photo when user is already exist..
      req.file ? unlinkSync(req.file.path) : null;
      res.status(401).json({
        success: false,
        message: "user is alrady registered with this email",
      });
    } else {
      userData.userPassword = await bcrypt.hash(req.body.userPassword, salt);

      //for upload image
      const filePath = `/uploads/${req.file.filename}`
       userData.profilePic = filePath;

      const user = await userData.save();
      res.status(201).json({
        success: true,
        message: "user successsfully registered",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

//...............................login API.....................................

let userLogin = async (req, res) => {
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (userData) {
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        userData.userPassword
      );
      if (userData && hashPassword) {
        //................................for token......................................
        const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({
          success: true,
          message: "login successfully",
          accessToken: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "User is not registered with this email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};
let checkToken = (req, res) => {
  res.send("hey , this token is valid");
};

//.....................user send email for Reset Password API.................

let sendUserResetPasswordEmail = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const userData = await userSchema.findOne({
      userEmail: userEmail,
    });
    console.log("Email User :", userData);

    if (userData != null) {
      const secret = userData._id + process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ userID: userData._id }, secret, {
        expiresIn: "20m",
      });
      const link = `http://127.0.0.1:3000/user/reset-password/${userData._id}/${token}`;
      let info = await transporter.sendMail({
        from: "deepakpunia624@gmail.com",
        to: "deepakpunia624@gmail.com",
        subject: "email for user reset password",
        text: `<a href=${link}>click on this reset password</a>`,
      });
      return res.status(201).json({
        success: true,
        message: "Email send successfully",
        token: token,
        userid: userData._id,
      });
    } else {
      res.status(403).json({
        success: false,
        error: "Email user is not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: "failure",
      error: err.message,
    });
  }
};

//.............................reset passeod API.......................
let resetPassword = async (req, res) => {
  const { id, token } = req.params;
  //console.log('id token ', id, token)
  let { newPassword, confirmPassword } = req.body;

  try {
    const checkUser = await userSchema.findById(id);

    if (checkUser != null) {
      //console.log('checkUSer._id', checkUser._id)
      const secretKey = checkUser._id + process.env.JWT_SECRET_KEY;
      // jwt.verify(token, secretKey);

      if (newPassword === confirmPassword) {
        const salt = await bcrypt.genSalt(10)
        const bcryptpassword = await bcrypt.hash(confirmPassword, salt);
        await userSchema.findByIdAndUpdate(checkUser._id, {
          //set is a object which store any type of value 
          $set: { userPassword: bcryptpassword },
        });
        res.status(200).json({
          success: true,
          message: "password update successfully",
        });
      } else {
        res.status(403).json({
          success: false,
          error: "password and confirmPassword is  not match",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        error: "email user is not found",
      });
    }
  } catch(error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  userLogin,
  checkToken,
  sendUserResetPasswordEmail,
  resetPassword,
};
