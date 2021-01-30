import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@DESC  Fetch all Products
//@route GET api/products
//@access PUBLIC
export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();

  res.json(products);
});


//@DESC  Fetch a single Product
//@route GET api/products/:id
//@access PUBLIC
export const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error(`Product not found`);
  }

  res.json(product);
});
