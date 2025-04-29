// import React, { useState } from 'react';
// import { Container, Typography, TextField, Button, Box ,Alert  } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { resetPassword } from 'slices/authSlice';

// const Reset = () => {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const dispatch = useDispatch();
//   const id = localStorage.getItem("id");
//   const handleSubmit = () => {
//     if (password !== confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }
//     dispatch(resetPassword({id , password}));
//     console.log('Password Reset Successfully:', password);
//     // Add submission logic here
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Box
//         sx={{
//           textAlign: 'center',
//           padding: 4,
//           bgcolor: 'white',
//           borderRadius: 2,
//           boxShadow: 3,
//           width: '100%',
//           maxWidth: '400px', // Restrict total width to 400px
//         }}
//       >
//         <Typography variant="h5" color="primary" gutterBottom>
//           Set New Password
//         </Typography>
//         {error && <Alert severity="error">{error}</Alert>}
//         {success && <Alert severity="success">Password Reset Successfully!</Alert>}
//         <Typography variant="body1" gutterBottom>
//           We sent a password reset password OTP to your Email.
//         </Typography>
//         <TextField
//           label="Enter Password"
//           variant="outlined"
//           margin="normal"
//           type="password"
//           fullWidth
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <TextField
//           label="Confirm Password"
//           variant="outlined"
//           margin="normal"
//           type="password"
//           fullWidth
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleSubmit}
//           sx={{ mt: 2 }}
//         >
//           Submit
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Reset;
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from 'slices/authSlice'; // Ensure you have a reset action
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SoftButton from 'components/SoftButton';

const Reset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const { loading, success, error } = useSelector((state) => state.auth);


  // useEffect(() => {
  //   if (success) {
  //     setTimeout(() => navigate('/login'), 2000); // Redirect after success
  //   }
  // }, [success, navigate]);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: "Passwords don't match!",
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
      return;
    }
    dispatch(resetPassword({ id, password }));
    if (success) {
      Swal.fire({
        title: 'Success!',
        text: 'Your password has been reset successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/login'); // Redirect to login after user clicks OK
      });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          padding: 4,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Set New Password
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
       

        <TextField
          label="Enter Password"
          variant="outlined"
          margin="normal"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            sx: {
              fontSize: "0.875rem",
              // Add other label styles here if needed
            }
          }}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          margin="normal"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputLabelProps={{
            sx: {
              fontSize: "0.875rem",
              // Add other label styles here if needed
            }
          }}
        />
        {/* <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </Button> */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          {/* <SoftButton
            type="submit"
            variant="gradient"
            color="info"
            sx={{
              width: { xs: '100%', sm: 'auto' },
              px: 3,
            }}
          >
            Add Candidate
          </SoftButton> */}
          

          <SoftButton
            variant="gradient"
            color="error"
            fullWidth
            onClick={() => navigate("/authentication/sign-in")}
            disabled={loading}
          >
            Cancel
          </SoftButton>
          <SoftButton
            variant="gradient"
            color="info"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Reset Password"}
          </SoftButton>
        </Box>

      </Box>
    </Container>
  );
};

export default Reset;
