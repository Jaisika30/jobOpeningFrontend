import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Box, Typography, Button, Container, CircularProgress, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../../slices/authSlice"; // Adjust the import based on your file structure
import { useNavigate } from "react-router-dom";
import SoftButton from "components/SoftButton";
import { toast } from "react-toastify"; // Make sure you have this imported

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
  // const handleSubmit = () => {
  //   if (otp.length === 4) {
  //     console.log("id::::::", id);
  //     dispatch(verifyOtp({ id, otp }));

  //       navigate("/reset");


  //   }
  // };

  const handleSubmit = async () => {
    if (otp.length === 4) {
      try {
        console.log("id::::::", id);

        // Dispatch the verifyOtp action and wait for the response
        await dispatch(verifyOtp({ id, otp })).unwrap();

        // Show success message if OTP is verified successfully
        toast.success("OTP verified successfully!");

        // Navigate to the reset page after success
        navigate("/reset");
      } catch (error) {
        console.log("Error response:", error.response);
        console.log("Error message:", error.message);

        // Extract the error message properly
        const errorMessage = error.payload?.message ||
          error.message ||
          "Failed to verify OTP";

        // toast.error(errorMessage); // This will now show just the string message
      }
    } else {
      // If OTP length is not 4, show error
      toast.error("Please enter a valid 4-digit OTP");
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
        <Typography variant="h4" gutterBottom>
          Code Verification
        </Typography>
        <Typography variant="h6" gutterBottom>
          We sent a password reset OTP to your Email.
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
        </div>

        <SoftButton
          variant="gradient"
          color="info"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
          disabled={loading || otp.length !== 4}
        >
          {loading ? <CircularProgress size={24} color="inherit" sx={{ color: "white" }} /> : "Verify OTP"}
        </SoftButton>
      </Box>
    </Container>
  );
};

export default VerifyOtp;
