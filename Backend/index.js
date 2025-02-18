const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/cartDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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

app.post("/cart", async (req, res) => {
  const { productId, name, description, price, imageUrl } = req.body;


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

app.post("/checkout", async (req, res) => {
    const { cart, email } = req.body;

    try {
        const lineItems = cart.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    description: item.description || "No description provided",
                },
                unit_amount: Math.round(item.price * 100), 
            },
            quantity: 1,
        }));

        console.log(lineItems)

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/cancel`,
            customer_email: email,
        });
        
        res.json({ sessionId: session.id });
    } catch (err) {
        console.error('Error during session creation:', err);
        res.status(500).json({ error: "Error creating checkout session" });
    }
});







const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

