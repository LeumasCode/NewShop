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



// ADMIN ONLY CONTROLLERS


//@DESC  Create a single Product
//@route GET api/products/:id
//@access PUBLIC
export const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error(`Product not found`);
  }

  res.json(product);
});



//@DESC  Delete a single Product
//@route DELETE api/products/:id
//@access PRIVATE ADMIN
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) { 
    res.status(404);
    throw new Error(`Product not found`);
  }

  await product.remove()
  res.status(204).json({massage: 'product deleted'});
});


