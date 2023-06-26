require("dotenv").config();
const express = require("express")

require('./config/modelConfig');
const app = express();

let userRouter = require('./route/userrouts')

app.use(express.json())
app.use('/',userRouter)




app.listen(process .env.PORT,(req,res)=>{
    console.log(`server is running on port no: ${process.env.PORT}`)
})