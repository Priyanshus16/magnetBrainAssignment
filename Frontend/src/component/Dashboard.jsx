import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products");
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Error while fetching data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addToCart = async (product) => {
    try {
      await axios.post("http://localhost:5000/cart", {
        productId: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
      });

      // Add the product to the cart state
      setCart((prevCart) => [...prevCart, product]);
      navigate('/cart');
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Products</Typography>
      <Grid container spacing={3}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={4} key={product.id}>
              <Card>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="body1">${product.price}</Typography>
                <Button onClick={() => addToCart(product)}>Add to Cart</Button>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No products available.</Typography>
        )}
      </Grid>
    </div>
  );
}

export default Dashboard;
