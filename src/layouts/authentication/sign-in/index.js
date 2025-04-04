
// import { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // @mui material components
// import Switch from "@mui/material/Switch";

// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";
// import SoftInput from "components/SoftInput";
// import SoftButton from "components/SoftButton";

// // Authentication layout components
// import CoverLayout from "layouts/authentication/components/CoverLayout";

// // Images
// import curved9 from "assets/images/curved-images/curved-6.jpg";

// function SignIn() {
//   const [rememberMe, setRememberMe] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSetRememberMe = () => setRememberMe(!rememberMe);

//   // Formik setup with validation schema
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email("Invalid email address").required("Email is required"),
//       password: Yup.string()
//         .matches(
//           /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
//           "Password must be at least 8 characters long, include a capital letter, and a special character"
//         )
//         .required("Password is required"),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const response = await axios.post("http://localhost:8085/api/auth/login", values);
//         console.log("responseee:::", response);
//         if (response.status === 200) {
//           localStorage.setItem("token", response.data.token); // Save token
//           navigate("/dashboard"); // Redirect to dashboard
//         } else {
//           setErrorMessage(response.data.message || "Login failed");
//         }
//       } catch (error) {
//         setErrorMessage(error.response?.data?.message || "An error occurred");
//       }
//     },
//   });

//   return (
//     <CoverLayout title="Welcome back" description="Enter your email and password to sign in" image={curved9}>
//       <form onSubmit={formik.handleSubmit}>
//         <SoftBox mb={2}>
//           <SoftBox mb={1} ml={0.5}>
//             <SoftTypography component="label" variant="caption" fontWeight="bold">
//               Email
//             </SoftTypography>
//           </SoftBox>
//           <SoftInput
//             type="email"
//             placeholder="Email"
//             name="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.email && Boolean(formik.errors.email)}
//           />
//           {formik.touched.email && formik.errors.email && (
//             <SoftTypography variant="caption" color="error" fontWeight="regular">
//               {formik.errors.email}
//             </SoftTypography>
//           )}
//         </SoftBox>

//         <SoftBox mb={2}>
//           <SoftBox mb={1} ml={0.5}>
//             <SoftTypography component="label" variant="caption" fontWeight="bold">
//               Password
//             </SoftTypography>
//           </SoftBox>
//           <SoftInput
//             type="password"
//             placeholder="Password"
//             name="password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.password && Boolean(formik.errors.password)}
//           />
//           {formik.touched.password && formik.errors.password && (
//             <SoftTypography variant="caption" color="error" fontWeight="regular">
//               {formik.errors.password}
//             </SoftTypography>
//           )}
//         </SoftBox>

//         {errorMessage && (
//           <SoftTypography variant="caption" color="error" fontWeight="regular">
//             {errorMessage}
//           </SoftTypography>
//         )}

//         <SoftBox display="flex" alignItems="center">
//           <Switch checked={rememberMe} onChange={handleSetRememberMe} />
//           <SoftTypography variant="button" fontWeight="regular" onClick={handleSetRememberMe} sx={{ cursor: "pointer", userSelect: "none" }}>
//             &nbsp;&nbsp;Remember me
//           </SoftTypography>
//         </SoftBox>

//         <SoftBox mt={4} mb={1}>
//           <SoftButton type="submit" variant="gradient" color="info" fullWidth>
//             Sign in
//           </SoftButton>
//         </SoftBox>
//       </form>
//     </CoverLayout>
//   );
// }

// export default SignIn;

import { useState } from "react";
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

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { useAuth } from "protect/AuthContext";
const API_URL = process.env.REACT_APP_API_URL;
console.log("apiiiiiiii irlllll",API_URL)
function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
const {setIsAuthenticated} = useAuth();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Password must be at least 8 characters long, include a capital letter, and a special character"
        )
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${API_URL}/api/auth/login`, values);
        console.log("responseee:::", response);
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token); // Save token
          console.log("ogiiiiiiiiiiiinnnnnnnnnnnnnnnn"); // Save token
          setTimeout(() => {
            navigate("/dashboard");
          }, 100);
          // navigate("/dashboard"); // Redirect to dashboard
        } else {
          setErrorMessage(response.data.message || "Login failed");
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "An error occurred",error);
      }
    },
  });

  return (
    <CoverLayout title="Welcome back" description="Enter your email and password to sign in" image={curved9} top={28} color={"info"} bottom={5}>
      <form onSubmit={formik.handleSubmit}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          {formik.touched.email && formik.errors.email && (
            <SoftTypography variant="caption" color="error" fontWeight="regular">
              {formik.errors.email}
            </SoftTypography>
          )}
        </SoftBox>

        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
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
          <SoftButton type="submit" variant="gradient" color="info" fullWidth>
            Sign in
          </SoftButton>
        </SoftBox>

        {/* Forgot Password Link */}
        <SoftBox mt={2} display="flex" justifyContent="center">
          <SoftTypography variant="caption" color="textSecondary" sx={{ cursor: "pointer" }} onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </SoftTypography>
        </SoftBox>
      </form>
    </CoverLayout>
  );
}

export default SignIn;

