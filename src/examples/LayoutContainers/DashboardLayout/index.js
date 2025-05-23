// /**
// =========================================================
// * Soft UI Dashboard React - v4.0.1
// =========================================================

// * Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// import { useEffect } from "react";

// // react-router-dom components
// import { useLocation } from "react-router-dom";

// // prop-types is a library for typechecking of props.
// import PropTypes from "prop-types";

// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";

// // Soft UI Dashboard React context
// import { useSoftUIController, setLayout } from "context";

// function DashboardLayout({ children }) {
//   const [controller, dispatch] = useSoftUIController();
//   const { miniSidenav } = controller;
//   const { pathname } = useLocation();

//   useEffect(() => {
//     setLayout(dispatch, "dashboard");
//   }, [pathname]);

//   return (
//     <SoftBox
//       sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
//         p: 3,
//         position: "relative",

//         [breakpoints.up("xl")]: {
//           marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
//           transition: transitions.create(["margin-left", "margin-right"], {
//             easing: transitions.easing.easeInOut,
//             duration: transitions.duration.standard,
//           }),
//         },
//       })}
//     >
//       {children}
//     </SoftBox>
//   );
// }

// // Typechecking props for the DashboardLayout
// DashboardLayout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default DashboardLayout;
import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React context
import { useSoftUIController, setLayout } from "context";
import Footer from "examples/Footer";

// Footer Component

function DashboardLayout({ children }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);

  return (
    <SoftBox
      display="flex"
      flexDirection="column"
      minHeight="100vh" // Full height of viewport
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        position: "relative",
        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {/* Main Content Area */}
      <SoftBox
        flex="1" // Flexible height based on content
        p={3}
        sx={{
          overflowY: children && children.props && children.props.children ? "auto" : "unset", // Scroll only if content exceeds
        }}
      >
        {children}
      </SoftBox>

      {/* Footer (Always visible) */}
      <Footer />
    </SoftBox>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
