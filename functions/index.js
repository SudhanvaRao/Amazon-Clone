//jshint esversion:6
dotenv = require("dotenv");
dotenv.config();
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const secret_key = process.env.SECRET_KEY;
const stripe = require("stripe")(secret_key);
// APP config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//Listen command
exports.api = functions.https.onRequest(app);
