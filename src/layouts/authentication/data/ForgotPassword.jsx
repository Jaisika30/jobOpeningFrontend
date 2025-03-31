import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const ForgotPassword = () => {
  const [showOtpField, setShowOtpField] = useState(false); // State to toggle OTP field

  const handleSendOtp = () => {
    setShowOtpField(true); // Show OTP field and hide email field
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        marginTop: "100px",
        padding: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <Typography variant="h5" gutterBottom style={{ fontWeight: "bold" }}>
        Forgot Password
      </Typography>
      <Typography variant="body2" color="textSecondary" marginBottom={3}>
        {showOtpField
          ? "Enter the OTP sent to your email."
          : "Enter your email address to reset your password."}
      </Typography>

      {/* Form */}
      <Box
        component="form"
        noValidate
        autoComplete="off"
        style={{
          marginTop: "20px",
        }}
      >
        {!showOtpField ? (
          <>
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              margin="normal"
              style={{
                marginBottom: "15px",
                width: "100%", // Adjusted to be responsive
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{
                marginTop: "15px",
                padding: "10px 0",
                fontWeight: "bold",
              }}
              onClick={handleSendOtp}
            >
              Send OTP
            </Button>
          </>
        ) : (
          <>
            <TextField
              label="Enter OTP"
              type="text"
              variant="outlined"
              margin="normal"
              style={{
                marginBottom: "15px",
                width: "100%", // Adjusted to fit the centered layout
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{
                marginTop: "15px",
                padding: "10px 0",
                fontWeight: "bold",
              }}
            >
              Verify OTP
            </Button>
          </>
        )}
      </Box>

      {/* Additional Information */}
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ marginTop: "20px" }}
      >
        Remember your password?{" "}
        <a
          href="/login"
          style={{
            color: "#1976d2",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Login here
        </a>.
      </Typography>
    </Container>
  );
};

export default ForgotPassword;
