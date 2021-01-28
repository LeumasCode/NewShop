import express from "express";
import products from "./data/products.js";

const app = express();

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
const PORT = 5000;

app.listen(PORT, () => console.log("server running"));
