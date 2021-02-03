import express from "express";
import {
  authUser,
  deleteUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);

router.route("/").post(registerUser).get(protect, isAdmin, getUsers);

router.use(protect);

router.route("/profile").get(getUserProfile).put(updateUserProfile);

router.route("/:id").delete(isAdmin, deleteUser);

export default router;
