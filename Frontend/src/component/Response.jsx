import { Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function Response() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Payment Successful!</Typography>
      <Button onClick={() => navigate("/")} variant="contained" color="primary" style={{ marginTop: 20 }}>
        Go Back to Home
      </Button>
    </div>
  );
}

export default Response;
