import mongoose from "mongoose";

const connectDB = async () => {
  const db = process.env.MONGO_URI;
  console.log(db)

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
