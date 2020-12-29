//importing libraries
import express, { json } from "express";
import dotenv from "dotenv";
import path from 'path'
import morgan from 'morgan'
//Routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from "./middleware/errorHandler.js";
//Database
import connectDb from "./config/connectDb.js";

// bringing in the environment variables has to be discarded while deploying
dotenv.config();
//initializing express server
const app = express();
//logger middleware
app.use(morgan('dev'))
//connecting database
connectDb();
//making server parse json format
app.use(express.json());
//initializing server routes , passing them to express router from the main server
app.use("/api/products", productRoutes);// everything related to products goes here
app.use("/api/user", userRoutes);// everything related to user goes here
app.use("/api/order", orderRoutes); //everyting related to orders go here
app.use("/api/upload", uploadRoutes); //uploading to server goes here
//Assigning directry name on which files will be uploaded
const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
 //if server is in production then serving index.html from the build folder in front end, depends on MODE in env file. on get request
if(process.env.MODE==='production'){
  app.use(express.static(path.join(__dirname,'/client/build')))
  app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'client','build','index.html')))
}else{
  app.get('/',(req,res)=>{
    res.json({
      msg:'Api is Running'
    })
  })
}
//middlewares related to custom error handling
app.use(notFound);
app.use(errorHandler);
//making server listen on port 5000
const PORT = process.env.PORT||5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.MODE} on ${PORT}`)
);
