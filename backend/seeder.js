import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import DB from "./config/db.js";

dotenv.config();

DB();

const importData = async (req, res, next) => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create(users);

    const adminUser = createdUsers[0];
    const _id = adminUser._id;

    const sampleProduct = products.map((product) => {
      return { ...product, user: _id };
    });
    await Product.create(sampleProduct);

    console.log("Data imported");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async (req, res, next) => {
  await Order.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();
};

if (process.argv[2] === "-i") {
  importData();
}
 if(process.argv[2] === '-d'){
     destroyData()

     console.log('data destroyed');
 }