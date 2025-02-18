import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Button } from "@mui/material";

function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // You can get query params passed from Stripe (like session_id) here
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id');
    console.log('Stripe session ID:', sessionId);
    
    // You can call your backend to verify the session ID if needed
  }, [location]);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" color="primary">Payment Successful!</Typography>
      <Typography variant="body1" style={{ marginTop: 20 }}>
        Thank you for your purchase. Your payment was successfully processed.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
        onClick={() => navigate("/")}
      >
        Go Back to Home
      </Button>
    </div>
  );
}

export default SuccessPage;
