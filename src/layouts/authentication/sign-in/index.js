import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { CircularProgress, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { useAuth } from "protect/AuthContext";
import { textFieldStyles } from "assets/textFieldStyles";
import { useSelector } from "react-redux";
const API_URL = process.env.REACT_APP_API_URL;
function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const passwordRef = useRef();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const { loading, error, success } = useSelector((state) => state.auth);

  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").transform((value) => value.toLowerCase()).required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least one uppercase, one lowercase, one number and one special character"
        ),
    }),
    onSubmit: async (values) => {
      try {
        setLocalLoading(true);
        const response = await axios.post(`${API_URL}/api/auth/login`, values);

        if (response.data.token) {
          login(response.data.token);
          navigate("/dashboard");
        } else {
          setErrorMessage(response.data.message || "Login failed");
        }
      } catch (error) {
        console.log("Full error object:", error);

        // More detailed error handling
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log("Error data:", error.response.data);
          console.log("Error status:", error.response.status);
          console.log("Error headers:", error.response.headers);

          setErrorMessage(error.response.data?.message || "Invalid credentials");
        } else if (error.request) {
          // The request was made but no response was received
          console.log("No response received:", error.request);
          setErrorMessage("No response from server");
        } else {
          // Something happened in setting up the request
          console.log("Request setup error:", error.message);
          setErrorMessage("Request error: " + error.message);
        }
      }
    },
  });

  return (
    <CoverLayout
      title="Sign In Here"
      description="Please enter credentials to sign in"
      image={curved9}
      top={28}
      color={"info"}
      bottom={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center", // Center text horizontally
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <SoftBox mb={2}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={(e) => {
              e.target.value = e.target.value.toLowerCase(); // ✅ Convert input to lowercase
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent form submission
                passwordRef.current?.focus(); // Move to password field
              }
            }}
            InputLabelProps={{ sx: { fontSize: "1rem", paddingLeft: "5px" } }}
            sx={textFieldStyles}
            placeholder="Enter email"
          />

          {formik.touched.email && formik.errors.email && (
            <SoftTypography variant="caption" color="error" fontWeight="regular">
              {formik.errors.email}
            </SoftTypography>
          )}
        </SoftBox>

        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}></SoftBox>
          <TextField
            label="Password"
            inputRef={passwordRef}
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                formik.handleSubmit(); // Submit form
              }
            }}
            placeholder="Enter password"
            sx={textFieldStyles}
            InputLabelProps={{ sx: { fontSize: "1rem" } }}
          // endAdornment={
          //   <InputAdornment position="end" sx={{ marginLeft: "50px" }}>
          //     <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" >
          //       {showPassword ? <VisibilityOff /> : <Visibility />}
          //     </IconButton>
          //   </InputAdornment>
          // }
          />
          {formik.touched.password && formik.errors.password && (
            <SoftTypography variant="caption" color="error" fontWeight="regular">
              {formik.errors.password}
            </SoftTypography>
          )}
        </SoftBox>

        {errorMessage && (
          <SoftTypography variant="caption" color="error" fontWeight="regular">
            {errorMessage}
          </SoftTypography>
        )}

        {/* <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography variant="button" fontWeight="regular" onClick={handleSetRememberMe} sx={{ cursor: "pointer", userSelect: "none" }}>
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox> */}

        <SoftBox mt={4} mb={1}>
          <SoftButton type="submit" variant="gradient" color="info" fullWidth disabled={localLoading}>
            {localLoading ? (
              <CircularProgress size={24} color="inherit" sx={{ color: "white" }} />
            ) : (
              " Sign in"
            )}
          </SoftButton>
        </SoftBox>

        {/* Forgot Password Link */}
        <SoftBox mt={2} display="flex" justifyContent="center">
          <SoftTypography
            variant="caption"
            color="textSecondary"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </SoftTypography>
        </SoftBox>
      </form>
    </CoverLayout>
  );
}

export default SignIn;
