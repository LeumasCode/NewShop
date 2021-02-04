import express from "express";
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToPaid } from "../controllers/orderController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").post(addOrderItems).get( isAdmin,getOrders);
router.get("/myorders", getMyOrders);

router.get('/:id', getOrderById)

router.put('/:id/pay', updateOrderToPaid)



export default router;
