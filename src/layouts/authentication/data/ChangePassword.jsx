
// import React, { useState, useEffect, useRef } from 'react';
// import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { resetPassword } from 'slices/authSlice'; // Ensure you have a reset action
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import SoftButton from 'components/SoftButton';
// import { jwtDecode } from "jwt-decode";
// import { changePassowrd } from 'slices/authSlice';
// import { toast } from 'react-toastify';
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import SoftTypography from 'components/SoftTypography';

// const ChangePassword = () => {
//     const [newPassword, setNewPassword] = useState('');
//     const [oldPassword, setOldPassword] = useState('');
//     const [userId, setUserId] = useState(null);
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const newpasswordRef = useRef();
//     const oldpasswordRef = useRef();
//     const confirmpasswordRef = useRef();
//     const id = localStorage.getItem("id");

//     const { loading, success, error } = useSelector((state) => state.auth);
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             try {
//                 const decoded = jwtDecode(token);
//                 console.log("decodeddddd:::", decoded)
//                 // Assuming your token has `id` or `_id` field
//                 setUserId(decoded.id || decoded._id);
//                 console.log("User ID from token:", decoded.id || decoded._id);
//             } catch (error) {
//                 console.error("Invalid token", error);
//             }
//         }
//     }, [])


//     const formik = useFormik({
//         initialValues: {
//             newPassword: "",
//             oldPassword: "",
//             confirmPassword: ""
//         },
//         validationSchema: Yup.object({
//             newPassword: Yup.string().required("New Password is required"),
//             oldPassword: Yup.string().required("Old Password is required"),
//             confirmPassword: Yup.string().required("Confirm Password is required"),
//         }),
//         onSubmit: async (values) => {
//             try {
//                 await dispatch(
//                     changePassowrd({
//                         id: userId,
//                         newPass: newPassword,
//                         oldPass: oldPassword
//                     })
//                 ).unwrap();

//                 toast.success("Password changed successfully!");
//                 navigate("/authentication/sign-in")
//             } catch (err) {
//                 // err comes from rejectWithValue
//                 const errorMessage =
//                     err?.message || err?.error || "Something went wrong";

//                 toast.error(errorMessage);
//             }
//         }

//     });

//     const handleSubmit = async () => {
//         try {
//             await dispatch(
//                 changePassowrd({
//                     id: userId,
//                     newPass: newPassword,
//                     oldPass: oldPassword
//                 })
//             ).unwrap();

//             toast.success("Password changed successfully!");
//             navigate("/authentication/sign-in")
//         } catch (err) {
//             // err comes from rejectWithValue
//             const errorMessage =
//                 err?.message || err?.error || "Something went wrong";

//             toast.error(errorMessage);
//         }
//     };
//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <Container
//                 maxWidth="sm"
//                 sx={{
//                     height: '100vh',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                 }}
//             >
//                 <Box
//                     sx={{
//                         textAlign: 'center',
//                         padding: 4,
//                         bgcolor: 'white',
//                         borderRadius: 2,
//                         boxShadow: 3,
//                         width: '100%',
//                         maxWidth: '400px',
//                     }}
//                 >
//                     <Typography variant="h4" gutterBottom>
//                         Set New Password
//                     </Typography>
//                     {error && <Alert severity="error">{error}</Alert>}
//                     {success && <Alert severity="success">Password Reset Successfully!</Alert>}
//                     <TextField
//                         inputRef={oldpasswordRef}
//                         label="Old Password"
//                         variant="outlined"
//                         margin="normal"
//                         type="password"
//                         fullWidth
//                         value={oldPassword}
//                         onChange={(e) => setOldPassword(e.target.value)}
//                         InputLabelProps={{
//                             sx: {
//                                 fontSize: "0.875rem",
//                                 // Add other label styles here if needed
//                             }
//                         }}
//                         onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                                 e.preventDefault(); // Prevent form submission
//                                 newpasswordRef.current?.focus(); // Move to password field
//                             }
//                         }}
//                     />
//                     {formik.touched.oldPassword && formik.errors.oldPassword && (
//                         <SoftTypography variant="caption" color="error" fontWeight="regular">
//                             {formik.errors.oldPassword}
//                         </SoftTypography>
//                     )}
//                     <TextField
//                         inputRef={newpasswordRef}
//                         label="New Password"
//                         variant="outlined"
//                         margin="normal"
//                         type="password"
//                         fullWidth
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         InputLabelProps={{
//                             sx: {
//                                 fontSize: "0.875rem",
//                                 // Add other label styles here if needed
//                             }
//                         }}
//                         onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                                 e.preventDefault(); // Prevent form submission
//                                 confirmpasswordRef.current?.focus(); // Move to password field
//                             }
//                         }}
//                     />
//                     {formik.touched.newPassword && formik.errors.newPassword && (
//                         <SoftTypography variant="caption" color="error" fontWeight="regular">
//                             {formik.errors.newPassword}
//                         </SoftTypography>
//                     )}
//                     <TextField
//                         inputRef={confirmpasswordRef}
//                         label="Confirm Password"
//                         variant="outlined"
//                         margin="normal"
//                         type="password"
//                         fullWidth
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         InputLabelProps={{
//                             sx: {
//                                 fontSize: "0.875rem",
//                                 // Add other label styles here if needed
//                             }
//                         }}
//                         onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                                 e.preventDefault();
//                                 formik.handleSubmit(); // Submit form
//                             }
//                         }}
//                     />
//                     {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//                         <SoftTypography variant="caption" color="error" fontWeight="regular">
//                             {formik.errors.confirmPassword}
//                         </SoftTypography>
//                     )}
//                     {/* <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleSubmit}
//           sx={{ mt: 2 }}
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Submit"}
//         </Button> */}
//                     <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
//                         {/* <SoftButton
//             type="submit"
//             variant="gradient"
//             color="info"
//             sx={{
//               width: { xs: '100%', sm: 'auto' },
//               px: 3,
//             }}
//           >
//             Add Candidate
//           </SoftButton> */}
//                         <SoftButton
//                             variant="gradient"
//                             color="info"
//                             fullWidth
//                             onClick={handleSubmit}
//                             disabled={loading}
//                         >
//                             {loading ? "Processing..." : "Change Password"}
//                         </SoftButton>

//                         <SoftButton
//                             variant="gradient"
//                             color="error"
//                             fullWidth
//                             onClick={() => navigate("/authentication/sign-in")}
//                             disabled={loading}
//                         >
//                             Cancel
//                         </SoftButton>
//                     </Box>

//                 </Box>
//             </Container>
//         </form>
//     );
// };

// export default ChangePassword;


import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Container, Box, Typography, TextField, Alert } from "@mui/material";
import { changePassowrd } from "slices/authSlice";
import SoftButton from "components/SoftButton";

const ChangePassword = () => {
    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newpasswordRef = useRef();
    const oldpasswordRef = useRef();
    const confirmpasswordRef = useRef();

    const { loading, success, error } = useSelector((state) => state.auth);

    // Fetch user id from token on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserId(decoded.id || decoded._id);
            } catch (error) {
                console.error("Invalid token", error);
            }
        }
    }, []);

    // Formik setup for form validation
    const formik = useFormik({
        initialValues: {
            newPassword: "",
            oldPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string()
                .required("Old Password is required")
                .min(8, "Password must be at least 8 characters"),

            newPassword: Yup.string()
                .required("New Password is required")
                .min(8, "Password must be at least 8 characters")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    "Password must contain at least one uppercase, one lowercase, one number and one special character"
                ),

            confirmPassword: Yup.string()
                .required("Confirm Password is required")
                .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(
                    changePassowrd({
                        id: userId,
                        newPass: values.newPassword,
                        oldPass: values.oldPassword,
                    })
                ).unwrap();

                toast.success("Password changed successfully!");
                navigate("/authentication/sign-in");
            } catch (err) {
                const errorMessage = err?.message || "Something went wrong";
                toast.error(errorMessage);
            }
        },
        validateOnChange: true, // Changed to true
        validateOnBlur: true,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
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
                        Set New Password
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField
                        inputRef={oldpasswordRef}
                        name="oldPassword"
                        label="Old Password"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        fullWidth
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                newpasswordRef.current?.focus();
                            }
                        }}
                        InputLabelProps={{
                            sx: {
                                fontSize: "0.875rem",
                                // Add other label styles here if needed
                            }
                        }}
                        error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                        helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                    />

                    <TextField
                        inputRef={newpasswordRef}
                        name="newPassword"
                        label="New Password"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        fullWidth
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                confirmpasswordRef.current?.focus();
                            }
                        }}
                        InputLabelProps={{
                            sx: {
                                fontSize: "0.875rem",
                                // Add other label styles here if needed
                            }
                        }}
                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                        helperText={formik.touched.newPassword && formik.errors.newPassword}
                    />

                    <TextField
                        inputRef={confirmpasswordRef}
                        name="confirmPassword"
                        label="Confirm Password"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        fullWidth
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                formik.handleSubmit();
                            }
                        }}
                        InputLabelProps={{
                            sx: {
                                fontSize: "0.875rem",
                                // Add other label styles here if needed
                            }
                        }}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />

                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>


                        <SoftButton
                            variant="gradient"
                            color="error"
                            fullWidth
                            onClick={() => navigate("/dashboard")}
                            disabled={loading}
                        >
                            Cancel
                        </SoftButton>
                        <SoftButton
                            type="submit"
                            variant="gradient"
                            color="info"
                            fullWidth
                        // disabled={loading || !formik.isValid}
                        >
                            {loading ? "Processing..." : "Change Password"}
                        </SoftButton>
                    </Box>
                </Box>
            </Container>
        </form>
    );
};

export default ChangePassword;
