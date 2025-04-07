// // /**
// // =========================================================
// // * Soft UI Dashboard React - v4.0.1
// // =========================================================

// // * Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
// // * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// // Coded by www.creative-tim.com

// //  =========================================================

// // * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// // */

// // // @mui material components
// // import Card from "@mui/material/Card";

// // // Soft UI Dashboard React components
// // import SoftBox from "components/SoftBox";
// // import SoftTypography from "components/SoftTypography";

// // // Soft UI Dashboard React examples
// // import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// // import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// // import Footer from "examples/Footer";
// // import Table from "examples/Tables/Table";

// // // Data
// // import authorsTableData from "layouts/tables/data/authorsTableData";
// // import projectsTableData from "layouts/tables/data/projectsTableData";

// // function Tables() {
// //   const { columns, rows } = authorsTableData;
// //   console.log("Columns:::", columns, "rows:::", rows)
// //   // const { columns: prCols, rows: prRows } = projectsTableData;

// //   return (
// //     <DashboardLayout>
// //       <DashboardNavbar />
// //       <SoftBox py={3}>
// //         <SoftBox mb={3}>
// //           <Card>
// //             <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
// //               <SoftTypography variant="h6">Authors table</SoftTypography>
// //             </SoftBox>
// //             <SoftBox
// //               sx={{
// //                 "& .MuiTableRow-root:not(:last-child)": {
// //                   "& td": {
// //                     borderBottom: ({ borders: { borderWidth, borderColor } }) =>
// //                       `${borderWidth[1]} solid ${borderColor}`,
// //                   },
// //                 },
// //               }}
// //             >
// //               <Table columns={columns} rows={rows} />

// //               {/* <Table columns={columns} rows={rows} /> */}
// //             </SoftBox>
// //           </Card>
// //         </SoftBox>

// //       </SoftBox>
// //       <Footer />
// //     </DashboardLayout>
// //   );
// // }

// // export default Tables;

// import Card from "@mui/material/Card";
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import Table from "examples/Tables/Table";
// import { useJobData, getJobTableData } from "layouts/tables/data/authorsTableData";

// function Tables() {
//   const { jobData, loading } = useJobData();
//   const tableData = getJobTableData(jobData);
  
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <SoftBox py={3}>
//         <SoftBox mb={3}>
//           <Card>
//             <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
//               <SoftTypography variant="h6">Job Listings</SoftTypography>
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
//               {loading ? (
//                 <SoftTypography variant="button" color="secondary" textAlign="center">
//                   Loading jobs...
//                 </SoftTypography>
//               ) : (
//                 <Table columns={tableData.columns} rows={tableData.rows} />
//               )}
//             </SoftBox>
//           </Card>
//         </SoftBox>
//       </SoftBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Tables;

import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import { Input, Select, MenuItem } from "@mui/material";
import { useJobData, getJobTableData } from "layouts/tables/data/authorsTableData";
import { useDispatch } from "react-redux";
import { deleteJob } from "slices/jobSlice";
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function Tables() {
  const dispatch = useDispatch();
  const { jobData, loading, setSearchQuery, setStatusFilter, searchQuery, statusFilter } = useJobData();
  const handleDelete = (id) => {
     Swal.fire({
       title: "Are you sure?",
       text: "You won't be able to revert this!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#d33",
       cancelButtonColor: "#3085d6",
       confirmButtonText: "Yes, delete it!",
     }).then((result) => {
       if (result.isConfirmed) {
         dispatch(deleteJob({id}))
           .unwrap()
           .then(() => Swal.fire("Deleted!", "The job has been deleted.", "success"))
           .catch(() => Swal.fire("Error!", "Something went wrong!", "error"));
       }
     });
   };
  const tableData = getJobTableData(jobData,handleDelete);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Job Listings</SoftTypography>
            </SoftBox>

            {/* Search and Filter UI */}
            <SoftBox display="flex" gap="10px" p={2} flexWrap="wrap">
              <Input
                type="text"
                placeholder="Search by Job Title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  backgroundColor: "#e6f7ff",
                  padding: "10px",
                  width: "100%",
                  maxWidth: "600px",
                  borderRadius: "5px",
                  border: "1px solid #2196f3",
                }}
              />
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
                sx={{
                  backgroundColor: "#ffefdb",
                  padding: "10px",
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "5px",
                  border: "1px solid #ff9800",
                }}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="open">open</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </SoftBox>

            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              {loading ? (
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={2}>
                <CircularProgress color="secondary" size={30} />
                <SoftTypography variant="button" color="secondary" textAlign="center" mt={1}>
                  Loading jobs...
                </SoftTypography>
              </Box>
              ) : (
                <Table columns={tableData.columns} rows={tableData.rows} />
              )}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
