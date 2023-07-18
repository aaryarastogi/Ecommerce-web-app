import express from 'express';
import dotenv from 'dotenv';
import Connection from './database/db.js';
import defaultData from './default.js'
import Router from'./routes/route.js'
import bodyParser from 'body-parser';
import cors from 'cors'
import { v4 as uuid} from 'uuid';
import Razorpay from "razorpay";

//initializing express
const app=express();
dotenv.config();
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));
app.use('/',Router);
// app.use("/api",Router);

const PORT=8000;
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });


app.get("/api/getkey",(req,res)=>res.status(200).json({
  key: process.env.RAZORPAY_KEY
}))


//creating server
app.listen(PORT,()=>console.log(`Server is succesfully running on port ${PORT}hello`));
defaultData();



