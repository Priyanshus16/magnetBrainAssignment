
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const stripe = require("stripe")("sk_test_51QtpijGAQWido8uiAYnAtICZ5Y1JpZSK2klr0GDtjYuEgAQdPiMvicdPJ70h7TgyukHQXsYaQ4kHQRg8UMDeR69H009lXf7Hv9");

// MongoDB connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Cart Schema
const cartSchema = new mongoose.Schema({
  productId: String,
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
});

const Cart = mongoose.model("Cart", cartSchema);

// Add item to cart (POST)
app.post("/cart", async (req, res) => {
  const { productId, name, description, price } = req.body;

  const newCartItem = new Cart({
    productId,
    name,
    description,
    price,
  });

  try {
    await newCartItem.save();
    res.status(201).json({ message: "Item added to cart", cartItem: newCartItem });
  } catch (err) {
    res.status(500).json({ error: "Error adding item to cart" });
  }
});


app.get("/cart", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ error: "Error fetching cart items" });
  }
});


app.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  console.log(products);

  const lineItems = products.map((product) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description: product.description,
        },
        unit_amount: Math.round(product.price * 100), 
      },
      quantity: 1, 
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({ id: session.id });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

