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

// // @mui material components
// import Grid from "@mui/material/Grid";

// // @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import PinterestIcon from "@mui/icons-material/Pinterest";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";

// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";

// function Footer() {
//   return (
//     <SoftBox component="footer" py={6}>
//       <Grid container justifyContent="center">
//         <Grid item xs={10} lg={8}>
//           <SoftBox display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
//             <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
//               <SoftTypography component="a" href="#" variant="body2" color="secondary">
//                 Company
//               </SoftTypography>
//             </SoftBox>
//             <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
//               <SoftTypography component="a" href="#" variant="body2" color="secondary">
//                 About Us
//               </SoftTypography>
//             </SoftBox>
//             <SoftBox mr={{ xs: 0, lg: 3, xl: 6 }}>
//               <SoftTypography component="a" href="#" variant="body2" color="secondary">
//                 Team
//               </SoftTypography>
//             </SoftBox>
//             <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
//               <SoftTypography component="a" href="#" variant="body2" color="secondary">
//                 Product
//               </SoftTypography>
//             </SoftBox>
//             <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
//               <SoftTypography component="a" href="#" variant="body2" color="secondary">
//                 Blog
//               </SoftTypography>
//             </SoftBox>
//             <SoftBox>
//               <SoftTypography component="a" href="#" variant="body2" color="secondary">
//                 Pricing
//               </SoftTypography>
//             </SoftBox>
//           </SoftBox>
//         </Grid>
//         <Grid item xs={12} lg={8}>
//           <SoftBox display="flex" justifyContent="center" mt={1} mb={3}>
//             <SoftBox mr={3} color="secondary">
//               <FacebookIcon fontSize="small" />
//             </SoftBox>
//             <SoftBox mr={3} color="secondary">
//               <TwitterIcon fontSize="small" />
//             </SoftBox>
//             <SoftBox mr={3} color="secondary">
//               <InstagramIcon fontSize="small" />
//             </SoftBox>
//             <SoftBox mr={3} color="secondary">
//               <PinterestIcon fontSize="small" />
//             </SoftBox>
//             <SoftBox color="secondary">
//               <LinkedInIcon fontSize="small" />
//             </SoftBox>
//           </SoftBox>
//         </Grid>
//         <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
//           <SoftTypography variant="body2" color="secondary">
//             Copyright &copy; 2021 Soft by Creative Tim.
//           </SoftTypography>
//         </Grid>
//       </Grid>
//     </SoftBox>
//   );
// }

// export default Footer;
// @mui material components


import { Divider, Link, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// function Footer() {
//   return (
//     <SoftBox component="footer" py={3}>
//       <hr style={{ border: "1px solid #ddd", marginTop: "20px" }} />
//       <Grid container justifyContent="space-between" alignItems="center" mt={4} sx={{ padding: "0px 20px" }}>
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
    <footer  style={{ width: "98%", padding: "16px 4px", borderTop: "1px solid #ddd" , marginTop:"20px" }}>
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
export default Footer;


