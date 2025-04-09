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
// import Card from "@mui/material/Card";

// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";

// // Soft UI Dashboard React examples
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import Candidate from "examples/Candidates/Candidate";

// // Data
// import candidatesTableData from "layouts/candidates/data/candidatesTable";

// function Candidates() {
//   const { columns, rows } = candidatesTableData;

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <SoftBox py={3}>
//         <SoftBox mb={3}>
//           <Card>
//             <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
//               <SoftTypography variant="h6">Authors table</SoftTypography>
//             </SoftBox>
//             <SoftBox
//               sx={{
//                 "& .MuiTableRow-root:not(:last-child)": {
//                   "& td": {
//                     borderBottom: ({ borders: { borderWidth, borderColor } }) =>
//                       `${borderWidth[1]} solid ${borderColor}`,
//                   },
//                 },
//               }}
//             >
//                   <Candidate columns={columns} rows={rows} />

//               {/* <Table columns={columns} rows={rows} /> */}
//             </SoftBox>
//           </Card>
//         </SoftBox>
//       </SoftBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Candidates;


// import Card from "@mui/material/Card";
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import Candidate from "examples/Candidates/Candidate";
// import getCandidatesTableData from "layouts/candidates/data/candidatesTable";

// function Candidates() {
//   const { columns, rows } = getCandidatesTableData(); // Get dynamic table data

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <SoftBox py={3}>
//         <SoftBox mb={3}>
//           <Card>
//             <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
//               <SoftTypography variant="h6">Candidates Table</SoftTypography>
//             </SoftBox>
//             <SoftBox
//               sx={{
//                 "& .MuiTableRow-root:not(:last-child)": {
//                   "& td": {
//                     borderBottom: ({ borders: { borderWidth, borderColor } }) =>
//                       `${borderWidth[1]} solid ${borderColor}`,
//                   },
//                 },
//               }}
//             >
//               <Candidate columns={columns} rows={rows} />
//             </SoftBox>
//           </Card>
//         </SoftBox>
//       </SoftBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Candidates;


import { useState } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Candidate from "examples/Candidates/Candidate";
import { Box } from "@mui/material";
import getCandidatesTableData from "layouts/candidates/data/candidatesTable";

function Candidates() {
  const [open, setOpen] = useState(false);
  const [newCandidate, setNewCandidate] = useState({ name: "", location: "", timeOffered: "" });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewCandidate({ ...newCandidate, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, field) => {
    setNewCandidate((prev) => ({
      ...prev,
      [field]: date, // Updates the correct field
    }));
  };
  
  const handleSubmit = () => {
    console.log("Submitting new candidate:", newCandidate);
    handleClose();
  };

  const { topAction, columns, rows } = getCandidatesTableData(handleOpen);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box
      display="flex"
      flexDirection="column"
      minHeight="auto"
    >
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Candidates</SoftTypography>
              {topAction} {/* Render the Add Candidate button */}
            </SoftBox>
            <SoftBox>
              <Candidate columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </Box>
    </DashboardLayout>
  );
}

export default Candidates;
