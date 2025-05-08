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
// import React from "react"
// import { useState, useEffect, useMemo } from "react";

// // react-router components
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// // @mui material components
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";

// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";

// // Soft UI Dashboard React examples
// import Sidenav from "examples/Sidenav";
// import Configurator from "examples/Configurator";

// // Soft UI Dashboard React themes
// import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";

// // RTL plugins
// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

// // Soft UI Dashboard React routes
// import routes from "routes";

// // Soft UI Dashboard React contexts
// import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// // Images
// import brand from "assets/images/logo-ct.png";
// import SoftTypography from "components/SoftTypography";

// export default function App() {
//   const [controller, dispatch] = useSoftUIController();
//   const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
//   const [onMouseEnter, setOnMouseEnter] = useState(false);
//   const [rtlCache, setRtlCache] = useState(null);
//   const { pathname } = useLocation();

//   // Cache for the rtl
//   useMemo(() => {
//     const cacheRtl = createCache({
//       key: "rtl",
//       stylisPlugins: [rtlPlugin],
//     });

//     setRtlCache(cacheRtl);
//   }, []);

//   // Open sidenav when mouse enter on mini sidenav
//   const handleOnMouseEnter = () => {
//     if (miniSidenav && !onMouseEnter) {
//       setMiniSidenav(dispatch, false);
//       setOnMouseEnter(true);
//     }
//   };

//   // Close sidenav when mouse leave mini sidenav
//   const handleOnMouseLeave = () => {
//     if (onMouseEnter) {
//       setMiniSidenav(dispatch, true);
//       setOnMouseEnter(false);
//     }
//   };

//   // Change the openConfigurator state
//   const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

//   // Setting the dir attribute for the body element
//   useEffect(() => {
//     document.body.setAttribute("dir", direction);
//   }, [direction]);

//   // Setting page scroll to 0 when changing the route
//   useEffect(() => {
//     document.documentElement.scrollTop = 0;
//     document.scrollingElement.scrollTop = 0;
//   }, [pathname]);

//   const getRoutes = (allRoutes) =>
//     allRoutes.flatMap((route, index) => {
//       if (route.collapse) {
//         return getRoutes(route.collapse);
//       }

//       if (route.route) {
//         return (
//           <Route 
//             exact 
//             path={route.route} 
//             element={route.component} 
//             key={route.key || `route-${index}`} // Ensure unique key
//           />
//         );
//       }

//       return [];
//     });


//   const configsButton = (
//     <SoftBox
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       width="3.5rem"
//       height="3.5rem"
//       bgColor="white"
//       shadow="sm"
//       borderRadius="50%"
//       position="fixed"
//       right="2rem"
//       bottom="2rem"
//       zIndex={99}
//       color="dark"
//       sx={{ cursor: "pointer" }}
//       onClick={handleConfiguratorOpen}
//     >
//       <Icon fontSize="default" color="inherit">
//         settings
//       </Icon>
//     </SoftBox>
//   );

//   return direction === "rtl" ? (
//     <CacheProvider value={rtlCache}>
//       <ThemeProvider theme={themeRTL}>
//         <CssBaseline />
//         {layout === "dashboard" && (
//           <>
//             <Sidenav
//   color={sidenavColor}
//   brand={brand}
//   brandName={
//     <SoftTypography 
//       variant="caption"  // Makes text smaller
//       sx={{ fontSize: "0.875rem", marginLeft: "1rem" }} // Adjust size & margin
//     >
//       Anthem Infotech Pvt. Ltd.
//     </SoftTypography>
//   }
//   routes={routes}
//   onMouseEnter={handleOnMouseEnter}
//   onMouseLeave={handleOnMouseLeave}
// />
//             <Configurator />
//             {configsButton}
//           </>
//         )}
//         {layout === "vr" && <Configurator />}
//         <Routes>
//           {getRoutes(routes)}
//           <Route path="*" element={<Navigate to="/dashboard" />} />
//         </Routes>
//       </ThemeProvider>
//     </CacheProvider>
//   ) : (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {layout === "dashboard" && (
//         <>
//           <Sidenav
//             color={sidenavColor}
//             brand={brand}
//             // brandName="Anthem Infotech Pvt. Ltd."
//             routes={routes}
//             onMouseEnter={handleOnMouseEnter}
//             onMouseLeave={handleOnMouseLeave}
//           />
//           <Configurator />
//           {configsButton}
//         </>
//       )}
//       {layout === "vr" && <Configurator />}
//       <Routes>
//         {getRoutes(routes)}
//         <Route path="*" element={<Navigate to="/dashboard" />} />
//       </Routes>
//     </ThemeProvider>
//   );
// }
import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import SoftBox from "components/SoftBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Routes
import routes from "routes";

// Contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { AuthProvider } from "protect/AuthContext";

// Images
import brand from "assets/images/logo-ct.png";
import SoftTypography from "components/SoftTypography";
import { CustomToastContainer } from "assets/ToastConatiner";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the RTL
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enters on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leaves mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the `dir` attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Scroll to the top when changing routes
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // Generate routes
  const getRoutes = (allRoutes) =>
    allRoutes.flatMap((route, index) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key || `route-${index}`}
          />
        );
      }

      return [];
    });

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );

  return (

    <AuthProvider>
      {direction === "rtl" ? (
        <CacheProvider value={rtlCache}>
          <ThemeProvider theme={themeRTL}>
            <CssBaseline />
            <ToastContainer position="top-center" autoClose={3000} />
            {/* Show Sidenav only for dashboard layout */}
            {layout === "dashboard" && (
              <>
                <Sidenav
                  color={sidenavColor}
                  brand={brand}
                  // brandName="Soft UI Dashboard"
                  routes={routes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
                <Configurator />
                {configsButton}
              </>
            )}

            {layout === "vr" && <Configurator />}

            <SoftBox
              sx={{
                height: '100vh',
                overflowY: 'auto',
                overflowX: 'visible',
                padding: 2, // optional
              }}
            >
              <Routes>
                {getRoutes(routes)}
                <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
              </Routes>
            </SoftBox>
          </ThemeProvider>
        </CacheProvider>
      ) : (
        <ThemeProvider theme={themeRTL}>
          <CssBaseline />
          <ToastContainer position="top-center" autoClose={3000} />

          {/* Show Sidenav only for dashboard layout */}
          {layout === "dashboard" && (
            <>
              <Sidenav
                color={sidenavColor}
                brand={brand}
                // brandName="Soft UI Dashboard"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
            </>
          )}

          {layout === "vr" && <Configurator />}

          <SoftBox
            sx={{
              height: '100vh',         // Full height of the viewport
              overflowY: 'auto',       // Only vertical scroll when needed
              overflowX: 'visible',     // Prevent horizontal scroll
              padding: 2,              // Optional spacing
            }}
          >
            <Routes>
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
            </Routes>
          </SoftBox>
        </ThemeProvider>
      )}
    </AuthProvider>
  );
}
