import React, { useState, useEffect } from "react";
import { Button, Grid, Card, Typography, TextField } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";


function CartPage() {
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState(""); 

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


  const handleCheckout = async() => {
    console.log(cart)
    const stripe = await loadStripe('pk_test_51QtpijGAQWido8uiesRX7yXgZYF41OaY0xHF8q2vbBRNzrjQEenTf93zejJm2yz7Py2jUlNZdNLXnuUA3lpCK9Ta00nTfBwiGj')

    const body = {
      products: cart
    }
    const headers = {
      "Content-Type": "application/json"
    }

    const response = await fetch('http://localhost:5000/create-checkout-session', {
      method: "POST",
      headers:headers,
      body: JSON.stringify(body)
    })

    const session = await response.json()

    const result = stripe.redirectToCheckout({
      sessionId:session.id
    })

    if(result.error) {
      console.log(result.error)
    }

  }


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
