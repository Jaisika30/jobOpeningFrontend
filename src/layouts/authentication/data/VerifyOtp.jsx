// import React, { useState } from 'react';
// import OtpInput from 'react-otp-input';
// import { Box, Typography, Button, Container } from '@mui/material';

// const VerifyOtp = () => {
//   const [otp, setOtp] = useState('');

//   const handleChange = (otp) => {
//     setOtp(otp);
//   };

//   const handleSubmit = () => {
//     console.log('Entered OTP:', otp);
//     // You can replace this with submission logic
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
//         }}
//       >
//         <Typography variant="h5" color="primary" gutterBottom>
//           Code Verification
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           We sent a password reset OTP to your phone.
//         </Typography>
//         <OtpInput
//           value={otp}
//           onChange={handleChange}
//           numInputs={4}
//           isInputNum
//           separator={<span>-</span>}
//           renderInput={(props) => <input {...props} />}
//           inputStyle={{
//             width: '3rem',
//             height: '3rem',
//             margin: '0.5rem',
//             fontSize: '1.5rem',
//             borderRadius: '4px',
//             border: '1px solid rgba(0, 0, 0, 0.3)',
//             textAlign: 'center',
//           }}
//         />
//         <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ mt: 2 }}>
//           Submit
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default VerifyOtp;
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { Box, Typography, Button, Container } from '@mui/material';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');

  const handleChange = (otp) => {
    setOtp(otp);
  };

  const handleSubmit = () => {
    console.log('Entered OTP:', otp);
    // You can replace this with submission logic
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
          Code Verification
        </Typography>
        <Typography variant="body1" gutterBottom>
          We sent a password reset OTP to your phone.
        </Typography>
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={4}
          isInputNum
          separator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: '2.5rem', // Adjusted width for better alignment within the container
            height: '2.5rem',
            margin: '0.5rem',
            fontSize: '1.2rem',
            borderRadius: '4px',
            border: '1px solid rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
          }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyOtp;

