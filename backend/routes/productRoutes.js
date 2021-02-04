import express from "express";
import {
  getProductById,
  getProducts,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts).delete(protect, deleteProduct);

router.get("/:id", getProductById);
export default router;
