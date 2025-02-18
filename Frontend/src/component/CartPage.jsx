import React, { useState, useEffect } from "react";
import { Button, Grid, Card, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";

const stripePromise = loadStripe("pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3");

function CartPage() {
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState(""); 
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/cart");
        const data = await response.json();
        setCart(data); 
      } catch (err) {
        console.error("Error fetching cart items:", err);
      }
    };
    fetchCartItems();
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCheckout = async () => {
    if (!email) {
        alert("Please enter your email address before proceeding!");
        return;
    }

    try {
        const response = await axios.post("http://localhost:5000/checkout", {
            cart,
            email
        });

        console.log(response,'this is response')

        const { sessionId } = response.data;

        console.log(sessionId,'this is session id')


        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            sessionId: sessionId,
        });

        if (error) {
            console.error("Stripe Checkout Error:", error);
        }
    } catch (err) {
        console.error("Error during checkout:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Your Cart</Typography>

      {cart.length === 0 ? (
        <Typography>Your cart is empty!</Typography>
      ) : (
        <Grid container spacing={3}>
          {cart.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Card>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">{item.description}</Typography>
                <Typography variant="body1">${item.price}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <div style={{ marginTop: 20 }}>
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>

      <Button
        onClick={handleCheckout}
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
        disabled={cart.length === 0}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}

export default CartPage;
