import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Box, Typography, Button, Container, CircularProgress, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../../slices/authSlice"; // Adjust the import based on your file structure
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);
  const id = localStorage.getItem("id");
  const handleChange = (otp) => {
    setOtp(otp);
  };
  // useEffect(() => {
  //   if (success) {
  //     setTimeout(() => navigate("/reset"), 2000); // Redirect after 2 seconds
  //   }
  // }, [success, navigate]);
  const handleSubmit = () => {
    if (otp.length === 4) {
      console.log("id::::::", id);
      dispatch(verifyOtp({ id, otp }));
      if (success) {
        navigate("/reset");

      }
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          padding: 4,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Typography variant="h5" color="primary" gutterBottom>
          Code Verification
        </Typography>
        <Typography variant="body1" gutterBottom>
          We sent a password reset OTP to your phone.
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">OTP Verified Successfully!</Alert>}

        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={4}
          isInputNum
          separator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: "2.5rem",
            height: "2.5rem",
            margin: "0.5rem",
            fontSize: "1.2rem",
            borderRadius: "4px",
            border: "1px solid rgba(0, 0, 0, 0.3)",
            textAlign: "center",
          }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
          disabled={loading || otp.length !== 4}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Submit"}
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyOtp;
