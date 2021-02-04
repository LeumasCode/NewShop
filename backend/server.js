import path from 'path'
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import color from "colors";

// ROUTES
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";


// MIDDLEWARES
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());

// CONFIGURE THE .ENV
dotenv.config();

// DATABASE CONNECTION

connectDB();
app.get("/", (req, res, next) => {
  res.send("api is running");
});

//Mount Routers
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads' )))


// send flutterwave public key
app.get("/api/config/flutterwave", (req, res, next) => {
  res.send(process.env.FLUTTERWAVE_PUBLIC_ID);
});

// Handle error for non routes
app.use(notFound);

// Error Handler

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`server running on port ${5000}`.yellow.bold.underline)
);
