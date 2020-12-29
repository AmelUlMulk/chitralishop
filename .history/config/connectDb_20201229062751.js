//import mongoose , Mongodb abstraction layer
import mongoose from "mongoose";
//arrow function to connect to data base
const connectDB = async () => {
  //getting the mongodb link from config
  const db = process.env.MONGO_URI;
  

  try {
    await mongoose.connect(db, {
      //passing parameters to mongodb
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
export default connectDB;
