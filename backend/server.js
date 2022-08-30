require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

const isProduction = process.env.NODE_ENV === "production";

const authRoute = require("./routes/authRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const productRoute = require("./routes/productRoutes");
const orderRoute = require("./routes/orderRoutes");
const bookingRoute = require("./routes/bookingRoutes");

const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

connectDB();

const app = express();
app
  .use(
    cors({
      origin: isProduction
        ? [/.*projectc-restaurants.*/]
        : "http://localhost:3000",
      credentials: true,
    })
  )
  .options("*", cors());

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/booking", bookingRoute);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "API working, ya dig" });
});

app.listen(PORT, () => console.log(`Sever running on port ${PORT}`));

module.exports = app;
