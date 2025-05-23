/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import { Grid, Typography } from "@mui/material";

// function Footer({ company, links }) {
//   const { href, name } = company;
//   const { size } = typography;

//   const renderLinks = () =>
//     links.map((link) => (
//       <SoftBox key={link.name} component="li" px={2} lineHeight={1}>
//         <Link href={link.href} target="_blank">
//           <SoftTypography variant="button" fontWeight="regular" color="text">
//             {link.name}
//           </SoftTypography>
//         </Link>
//       </SoftBox>
//     ));

//   return (
//     <SoftBox
//       width="100%"
//       display="flex"
//       flexDirection={{ xs: "column", lg: "row" }}
//       justifyContent="space-between"
//       alignItems="center"
//       px={1.5}
//     >
//       <SoftBox
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         flexWrap="wrap"
//         color="text"
//         fontSize={size.sm}
//         px={1.5}
//       >
//         &copy; {new Date().getFullYear()}, made with
//         <SoftBox fontSize={size.md} color="text" mb={-0.5} mx={0.25}>
//           <Icon color="inherit" fontSize="inherit">
//             favorite
//           </Icon>
//         </SoftBox>
//         by
//         <Link href={href} target="_blank">
//           <SoftTypography variant="button" fontWeight="medium">
//             &nbsp;{name}&nbsp;
//           </SoftTypography>
//         </Link>
//         for a better web.
//       </SoftBox>
//       <SoftBox
//         component="ul"
//         sx={({ breakpoints }) => ({
//           display: "flex",
//           flexWrap: "wrap",
//           alignItems: "center",
//           justifyContent: "center",
//           listStyle: "none",
//           mt: 3,
//           mb: 0,
//           p: 0,

//           [breakpoints.up("lg")]: {
//             mt: 0,
//           },
//         })}
//       >
//         {renderLinks()}
//       </SoftBox>
//     </SoftBox>
//   );
// }

// function Footer({ company, links }) {
//   // Fallback for company
//   const { href = "", name = "" } = company || {};
//   const { size } = typography;

//   // Safely render links
//   const renderLinks = () =>
//     Array.isArray(links) && links.length > 0
//       ? links.map((link) => (
//           <SoftBox key={link.name} component="li" px={2} lineHeight={1}>
//             <Link href={link.href} target="_blank">
//               <SoftTypography variant="button" fontWeight="regular" color="text">
//                 {link.name}
//               </SoftTypography>
//             </Link>
//           </SoftBox>
//         ))
//       : null;

//   return (
//     <SoftBox
//       width="100%"
//       display="flex"
//       flexDirection={{ xs: "column", lg: "row" }}
//       justifyContent="space-between"
//       alignItems="center"
//       px={1.5}
//     >
//       <SoftBox
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         flexWrap="wrap"
//         color="text"
//         fontSize={size.sm}
//         px={1.5}
//       >
//         &copy; {new Date().getFullYear()}, made with
//         <SoftBox fontSize={size.md} color="text" mb={-0.5} mx={0.25}>
//           <Icon color="inherit" fontSize="inherit">
//             favorite
//           </Icon>
//         </SoftBox>
//         by
//         <Link href={href} target="_blank">
//           <SoftTypography variant="button" fontWeight="medium">
//             &nbsp;{name}&nbsp;
//           </SoftTypography>
//         </Link>
//         for a better web.
//       </SoftBox>
//       <SoftBox
//         component="ul"
//         sx={({ breakpoints }) => ({
//           display: "flex",
//           flexWrap: "wrap",
//           alignItems: "center",
//           justifyContent: "center",
//           listStyle: "none",
//           mt: 3,
//           mb: 0,
//           p: 0,

//           [breakpoints.up("lg")]: {
//             mt: 0,
//           },
//         })}
//       >
//         {renderLinks()}
//       </SoftBox>
//     </SoftBox>
//   );
// }
// function Footer() {
//   return (
//     <SoftBox component="footer" >
//       <hr style={{ border: "1px solid #ddd"}} />
//       <Grid container justifyContent="space-between" alignItems="center"  >
//         <Grid item>
//           <SoftTypography variant="body2" color="secondary" fontWeight="bold">
//             © 2025 Anthem Infotech Private Limited. All rights reserved.
//           </SoftTypography>
//         </Grid>
//         <Grid item>
//           <SoftTypography variant="body2" color="secondary" fontWeight="bold">
//             Powered by Anthem Infotech Pvt. Ltd.
//           </SoftTypography>
//         </Grid>
//       </Grid>
//     </SoftBox>
//   );
// }

function Footer() {
  return (
    <footer style={{ width: "100%", padding: "16px 8px", borderTop: "1px solid #ddd" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()}{" "}
            <span style={{ fontWeight: 500 }}>
              Anthem Infotech Private Limited. All rights reserved.
            </span>
          </Typography>

        </Grid>
        <Grid item>
          {/* Add clickable link */}
          <Typography variant="body2" color="textSecondary">
            Powered by
            <Link href="https://antheminfotech.com/" target="_blank" rel="noopener" style={{ textDecoration: "none", color: "inherit", fontWeight: "500" }}>
              &nbsp;Anthem Infotech Pvt. Ltd.
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
}
// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "https://www.creative-tim.com/", name: "Creative Tim" },
  links: [
    { href: "https://www.creative-tim.com/", name: "Creative Tim" },
    { href: "https://www.creative-tim.com/presentation", name: "About Us" },
    { href: "https://www.creative-tim.com/blog", name: "Blog" },
    { href: "https://www.creative-tim.com/license", name: "License" },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
