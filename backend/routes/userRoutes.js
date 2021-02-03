import express from "express";
import {
  authUser,
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);

router.route("/").post(registerUser).get(protect, isAdmin, getUsers);

router.use(protect);

router.route("/profile").get(getUserProfile).put(updateUserProfile);

router.use(isAdmin);

router.route("/:id").delete(deleteUser).get(getUser).put(updateUser);

export default router;
