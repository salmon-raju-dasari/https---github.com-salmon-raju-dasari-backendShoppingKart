const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./config/db");
const Razorpay = require("razorpay");
const razorpay = new Razorpay({
  key_id: "rzp_live_NI3ccKfJiELspq",
  key_secret: "ejedVchKgf1pgrdgo8cRVQWi",
});

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://www.electgoods.com",
      "https://checkout.razorpay.com",
    ],
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/create-order", async (req, res) => {
  const order = await razorpay.orders.create({
    amount: 100,
    currency: "INR",
    receipt: "receipt#1",
  });
  res.json(order);
});
