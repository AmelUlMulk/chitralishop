const mongoose = require("mongoose");

const user = require("./data/user");
const products = require("./data/products");
const User = require("./modals/userModal");
const Product = require("./modals/productsModal");
const Order = require("./modals/orderModal");

mongoose.connect("mongodb://localhost:27017/proshop", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(user);
    const AdminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: AdminUser,
      };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data Imported");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  destroyData();
}
