import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@DESC  Fetch all Products
//@route GET api/products
//@access PUBLIC
export const getProducts = asyncHandler(async (req, res, next) => {
  const keyword = req.query.keyword ? {
    name: {
      $regex:req.query.keyword,
      $options: 'i'
    }
  } : {}

  const products = await Product.find({...keyword});

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

//@DESC  Create new Review
//@route POST api/products/:id/reviews
//@access PRIVATE
export const createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error(`Product not found`);
  }

  const alreadyReview = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReview) {
    res.status(400);
    throw new Error("product already reviewed");
  }

  const newReview = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(newReview);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save();

  res.status(201).json({ message: "review added" });
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
