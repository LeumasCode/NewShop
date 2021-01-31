import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);

router.route("/").post(registerUser);

router.use(protect);

router.route("/profile").get(getUserProfile).put(updateUserProfile);

export default router;
