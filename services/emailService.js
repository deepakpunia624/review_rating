const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"deepakpunia624@gmail.com",
        pass:"dibmuijhwngxdeng",
    },
});
const mailOptions ={
    from:"deepakpunia624@gmail.com",
    to:"komalmeshram26929@gmail.com",
    subject :"Hey this is test mail",
    text :"who is your boyfriend",
};

module.exports ={
    transporter,
    mailOptions,
};