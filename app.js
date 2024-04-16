const express = require("express");
const cors = require("cors");

const path = require("path");
const app = express();



app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true,
  })
);


const payment_controller = require("./controllers/paymentController");
const paymentMethod = require("./controllers/paymentManagement/paymentMethod");




app.use("/public", express.static(path.join("public")));
app.get("/api", async (req, res) => {
  
  res.status(200).json({
    status: "success",
    ipAddress: req.ip,
    message: "Welcome to the API",
  });
});


app.use("/api/webhook", payment_controller.webhook);




module.exports = app;