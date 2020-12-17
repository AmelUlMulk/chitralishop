import mongoose from "mongoose";

const connectDB = async () => {
  const db = "mongodb://localhost:27017/proshop";

  try {
    await mongoose.connect(db, {
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
