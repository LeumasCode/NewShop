import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//@DESC  Create new Order
//@route POST api/orders
//@access PRIVATE
export const addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const newOrder = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });

    const createdOrder = await newOrder.save();
    res.status(201).json(createdOrder);
  }
});

//@DESC  Get Order By Id
//@route GET api/orders/:id
//@access PRIVATE
export const getOrderById = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
    return;
  } else {
    res.status(200).json(order);
  }
});
