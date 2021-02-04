import express from "express";
import {
  getProductById,
  getProducts,
  deleteProduct,
} from "../controllers/productController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct);

export default router;
