import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Reset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Password Reset Successfully:', password);
    // Add submission logic here
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
          maxWidth: '400px', // Restrict total width to 400px
        }}
      >
        <Typography variant="h5" color="primary" gutterBottom>
          Set New Password
        </Typography>
        <Typography variant="body1" gutterBottom>
          We sent a password reset OTP to your phone.
        </Typography>
        <TextField
          label="Enter Password"
          variant="outlined"
          margin="normal"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          margin="normal"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Reset;
