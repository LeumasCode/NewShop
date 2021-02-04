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
//@route POST api/products/
//@access PRIVATE ADMIN
export const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/image/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  res.status(201).json(product);
});

//@DESC  UPDATE a single Product
//@route PUT api/products/:id
//@access PRIVATE ADMIN
export const updateProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error(`Product not found`);
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;

  const updatedProduct = await product.save();

  res.status(200).json(updatedProduct);
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

  await product.remove();
  res.status(204).json({ massage: "product deleted" });
});
