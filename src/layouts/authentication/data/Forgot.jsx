// import React from 'react';
// import { Container, Box, Typography, TextField, Button, Link, Grid } from '@mui/material';

// const Forgot = () => {
//   return (
//     <Container maxWidth="sm">
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           backgroundColor: 'white',
//           padding: 4,
//           borderRadius: 2,
//           boxShadow: 3,
//           mt: 8,
//         }}
//       >
//         <Typography variant="h5" component="h1" gutterBottom>
//           Forget Password
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           Enter Your Email or Phone No, We Will Send You OTP to Reset Password
//         </Typography>
//         <Grid container spacing={2} sx={{ mt: 2 }}>
//           <Grid item xs={8}>
//             <Button variant="contained" fullWidth>
//               Email
//             </Button>
//           </Grid>
//         </Grid>
//         <TextField
//           fullWidth
//           label="Enter Email"
//           variant="outlined"
//           margin="normal"
//           defaultValue="jaisika@antheminfotech.com"
//         />
//         <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
//           Submit
//         </Button>
//         <Link href="#" variant="body2" sx={{ mt: 2 }}>
//           Back to login
//         </Link>
//       </Box>
//     </Container>
//   );
// };

// export default Forgot;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../../slices/authSlice"; // Adjust path if needed
import { Container, Box, Typography, TextField, Button, Link, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const success = useSelector((state) => state.auth.success);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!email) {
  //     alert("Please enter your email!");
  //     return;
  //   }
  //   console.log(email);
  //   const result = dispatch(forgotPassword(email));
  //   console.log("result:::",result);
  //   console.log("sucessss:::",success)
  //   if (success) {
  //     console.log("heloooooooooooo")
  //     navigate("/verify-otp"); // Navigate only if API call is successful
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email!");
      return;
    }
    dispatch(forgotPassword(email)); // Dispatch without expecting immediate success
  };

  // ✅ Navigate when `success` updates
  useEffect(() => {
    console.log("Sucesssssss", success)
    if (success) {
      console.log("Navigating to /verify-otp...");
      navigate("/verify-otp");
    }
  }, [success, navigate]);
  return (
    <Container maxWidth="sm" sx={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
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
        <Typography variant="h5" component="h1" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enter Your Email, We Will Send You OTP to Reset Password
        </Typography>
        <TextField
          
          label="Enter Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: "100%",
            maxWidth: "100%",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            display: "flex",
            "& .MuiInputBase-root": {
              width: "100%",
              display: "flex",
            },
            "& .MuiInputBase-input": {
              width: "200px",
              maxWidth: "300px",
              minWidth: "300px",
            },
          }}
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
          Submit
        </Button>
        <Link href="/authentication/sign-in" variant="body2" sx={{ mt: 2 }}>
          Back to login
        </Link>
      </Box>
    </Container>
  );
};

export default Forgot;
