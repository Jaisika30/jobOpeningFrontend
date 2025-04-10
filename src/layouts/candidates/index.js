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


// import { useState } from "react";
// import Card from "@mui/material/Card";
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Candidate from "examples/Candidates/Candidate";
// import { Box } from "@mui/material";
// import getCandidatesTableData from "layouts/candidates/data/candidatesTable";

// function Candidates() {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(true);


//   const { topAction, columns, rows } = getCandidatesTableData(handleOpen);

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Box
//         display="flex"
//         flexDirection="column"
//         minHeight="auto"
//       >
//         <SoftBox py={3}>
//           <SoftBox mb={3}>
//             <Card>
//               <SoftBox p={3}>
//                 {/* Header */}
//                 <SoftTypography variant="h6" textAlign="center">Candidates</SoftTypography>

//                 {/* Top action on a new line */}
//                 <SoftBox mt={2}>
//                   {topAction}
//                 </SoftBox>
//               </SoftBox>

//               {/* Candidate table */}
//                 <Candidate columns={columns} rows={rows} />
//             </Card>
//           </SoftBox>
//         </SoftBox>

//       </Box>
//     </DashboardLayout>
//   );
// }

// export default Candidates;
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Candidate from "examples/Candidates/Candidate";
import { Box } from "@mui/material";
import getCandidatesTableData from "layouts/candidates/data/candidatesTable";
import { getJobById } from "slices/jobSlice";

// function Candidates() {
//   const { id } = useParams(); // Get the 'id' parameter from the URL
//   const [open, setOpen] = useState(false);
//   const data = useSelector((state) => state.job); // Access Redux state
//   const dispatch = useDispatch();
//   const handleOpen = () => setOpen(true);
//   const { topAction, columns, rows } = getCandidatesTableData(handleOpen);
//   console.log("job table idddd0", id);

//   useEffect(() => {
//     console.log("job table idddd1", id);

//     if (id) {
//       console.log("job table idddd2", id);

//       // Fetch the job title by id if 'id' is present in the URL
//       dispatch(getJobById(id));
//     }
//   }, [id, dispatch]);
//   console.log("dataaaaaaaaatatat", data)
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Box display="flex" flexDirection="column" minHeight="auto">
//         <SoftBox py={3}>
//           <SoftBox mb={3}>
//             <Card>
//               <SoftBox p={3}>
//                 {/* Header */}
//                 <SoftTypography variant="h6" textAlign="center">
//                   {id ? `Candidates for Job: ${jobTitle}` : "All Candidates"}
//                 </SoftTypography>

//                 {/* Top action on a new line */}
//                 <SoftBox mt={2}>{topAction}</SoftBox>
//               </SoftBox>

//               {/* Candidate table */}
//               <Candidate columns={columns} rows={rows} />
//             </Card>
//           </SoftBox>
//         </SoftBox>
//       </Box>
//     </DashboardLayout>
//   );
// }
function Candidates() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const jobDetail = useSelector((state) => state.jobs.job); // Get job from Redux
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const { topAction, columns, rows } = getCandidatesTableData(handleOpen);

  // Debugging logs
  console.log("Current jobDetail:", jobDetail);
  console.log("ID from URL:", id);

  useEffect(() => {
    console.log("useEffect triggered with id:", id);
    if (id) {
      dispatch(getJobById(id));
    }
  }, [id, dispatch]); // This will run when id changes

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box display="flex" flexDirection="column" minHeight="auto">
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Card>
              <SoftBox p={3}>
                {/* Header - now using jobDetail.title */}
                <SoftTypography variant="h6" textAlign="center">
                {id 
                    ? jobDetail 
                      ? `Candidates for: ${jobDetail.title}` 
                      : "Loading job details..."
                    : "All Candidates"
                  }
                </SoftTypography>

                <SoftBox mt={2}>{topAction}</SoftBox>
              </SoftBox>

              <Candidate columns={columns} rows={rows} />
            </Card>
          </SoftBox>
        </SoftBox>
      </Box>
    </DashboardLayout>
  );
}

export default Candidates;
