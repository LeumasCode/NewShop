import express from "express";
import products from "./data/products.js";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import color from 'colors'

const app = express();

// CONFIGURE THE .ENV 
dotenv.config()

// DATABASE CONNECTION

connectDB()
app.get("/", (req, res, next) => {
  res.send("api is running");
});

app.get("/api/products", (req, res, next) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res, next) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});
const PORT = process.env.PORT ||  5000;

app.listen(PORT, () => console.log(`server running on port ${5000}`.yellow.bold.underline));
