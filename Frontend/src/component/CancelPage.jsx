import React from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CancelPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" color="secondary">Payment Canceled</Typography>
      <Typography variant="body1" style={{ marginTop: 20 }}>
        Unfortunately, your payment was canceled. Please try again or contact support.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
        onClick={() => navigate("/")}
      >
        Return to Cart
      </Button>
    </div>
  );
}

export default CancelPage;
