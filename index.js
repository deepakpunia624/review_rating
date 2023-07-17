require("dotenv").config();

const express = require("express");
const { mailOptions, transporter} = require("./services/emailService")
const cron = require("node-cron");

require("./config/modelConfig");

const app = express();


//.......................for send email...........................
// app.get("/send",async(req,res)=>{
//     transporter.sendMail(mailOptions,(error,info)=>{
//         if (error){
//             console.log(error);
//         }else{
//             console.log("Email send successfully"+info.response);
//         }
//     });
// });


//cron.schedule("*/5 * * * * *",function(){
    //console.log("running a task in every 10 second");
    // app.get("/send",async(req,res)=>{
    //     transporter.sendMail(mailOptions,(error,info)=>{
    //         if (error){
    //             console.log(error);
    //         }else{
    //             console.log("Email send successfully"+info.response);
    //         }
    //     });
    // });
    
//});



const commonRouter = require("./routes/mainRoutes");

app.use(express.json());

app.use("/", commonRouter);


//............................run the server.......................................
app.listen(process.env.PORT, (req, res) => {
    console.log(`server is running on port no: ${process.env.PORT}`);
});
