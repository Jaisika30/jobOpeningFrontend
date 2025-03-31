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


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/authSlice"; // Adjust path if needed
import { Container, Box, Typography, TextField, Button, Link, Grid } from "@mui/material";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email!");
      return;
    }
    dispatch(forgotPassword(email));
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          mt: 8,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enter Your Email, We Will Send You OTP to Reset Password
        </Typography>
        <TextField
          fullWidth
          label="Enter Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Link href="/login" variant="body2" sx={{ mt: 2 }}>
          Back to login
        </Link>
      </Box>
    </Container>
  );
};

export default Forgot;
