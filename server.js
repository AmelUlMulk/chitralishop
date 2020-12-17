import express, { json } from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import path from 'path'
import connectDb from "./config/connectDb.js";
import morgan from 'morgan'
dotenv.config();

const app = express();
app.use(morgan('dev'))
connectDb();
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

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

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT||5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.MODE} on ${PORT}`)
);
