import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const router = express.Router();

//@DESC  Fetch all Products
//@route GET api/products
//@access PUBLIC
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const products = await Product.find();

    res.send(products);
  })
);

//@DESC  Fetch a single Product
//@route GET api/products/:id
//@access PUBLIC

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error(`Product not found`);
    }

    res.json(product);
  })
);
export default router;
