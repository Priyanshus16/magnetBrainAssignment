import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Grid, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Dashboard() {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();


  const products = [
    {
      id: 1,
      title: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation.",
      price: 199.99,
      imageUrl: "https://example.com/headphones.jpg",
    },
    {
      id: 2,
      title: "Smartphone",
      description: "Latest smartphone with high resolution camera and fast processor.",
      price: 799.99,
      imageUrl: "https://example.com/smartphone.jpg",
    },
    {
      id: 3,
      title: "Laptop",
      description: "High performance laptop with powerful specs for gaming and productivity.",
      price: 1299.99,
      imageUrl: "https://example.com/laptop.jpg",
    },
    {
      id: 4,
      title: "Smart Watch",
      description: "Smart watch with fitness tracking, heart rate monitor, and customizable bands.",
      price: 249.99,
      imageUrl: "https://example.com/smartwatch.jpg",
    },
    {
      id: 5,
      title: "Bluetooth Speaker",
      description: "Portable Bluetooth speaker with crisp sound and long battery life.",
      price: 99.99,
      imageUrl: "https://example.com/speaker.jpg",
    },
    {
      id: 6,
      title: "4K TV",
      description: "Ultra HD 4K TV with smart features and high dynamic range support.",
      price: 799.99,
      imageUrl: "https://example.com/4k-tv.jpg",
    },
    {
      id: 7,
      title: "Gaming Console",
      description: "Next-generation gaming console with stunning graphics and game library.",
      price: 499.99,
      imageUrl: "https://example.com/console.jpg",
    },
    {
      id: 8,
      title: "Digital Camera",
      description: "Compact digital camera with 20MP resolution and 4K video recording.",
      price: 499.99,
      imageUrl: "https://example.com/camera.jpg",
    },
    {
      id: 9,
      title: "E-Reader",
      description: "Portable e-reader with glare-free display and long-lasting battery.",
      price: 119.99,
      imageUrl: "https://example.com/ereader.jpg",
    },
  ];

  useEffect(() => {
    // Fetch cart count from the backend on page load
    const fetchCartCount = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cart");
        setCartCount(response.data.length);  // Set the number of items in the cart
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    fetchCartCount();
  }, []);

  const addToCart = async (product) => {
    try {
      await axios.post("http://localhost:5000/cart", {
        productId: product.id,
        name: product.title,
        description: product.description,
        price: product.price,
      });


      setCartCount(prevCount => prevCount + 1);
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Products</Typography>

      <IconButton
        color="primary"
        onClick={() => navigate('/cart')}
        style={{ position: 'absolute', top: 20, right: 20 }}
      >
        <ShoppingCartIcon />
        <Typography variant="body1" style={{ position: 'absolute', top: -5, right: -10 }}>
          {cartCount}
        </Typography>
      </IconButton>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={4} key={product.id}>
            <Card>
              <Typography variant="h6" style={{ padding: 10 }}>{product.title}</Typography>
              <Typography variant="body2" style={{ padding: 10 }}>{product.description}</Typography>
              <Typography variant="body1" style={{ padding: 10 }}>${product.price}</Typography>
              <Button
                onClick={() => addToCart(product)}
                variant="contained"
                color="primary"
                style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Dashboard;
