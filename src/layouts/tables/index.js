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
import Table from "examples/Tables/Table";
import { Input, Select, MenuItem, TextField, InputLabel, FormControl } from "@mui/material";
import { useJobData, getJobTableData } from "layouts/tables/data/authorsTableData";
import { useDispatch } from "react-redux";
import { deleteJob } from "slices/jobSlice";
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { textFieldStyles } from "assets/textFieldStyles";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { inputLabelStyle, dropdownIconStyle } from "assets/textFieldStyles";
function Tables() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        dispatch(deleteJob({ id }))
          .unwrap()
          .then(() => Swal.fire("Deleted!", "The job has been deleted.", "success"))
          .catch(() => Swal.fire("Error!", "Something went wrong!", "error"));
      }
    });
  };
  const tableData = getJobTableData(jobData, handleDelete);

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
              <SoftBox p={3}>
                <SoftTypography variant="h5" textAlign="center">Jobs</SoftTypography>
              </SoftBox>

              {/* Search and Filter UI */}
              <SoftBox display="flex" gap="10px" p={2} flexWrap="wrap" >
                <TextField
                  type="text"
                  label="Search Here"
                  placeholder="Search by Job Title"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    width: "250px",
                    maxWidth: "250px",
                    // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                    display: "flex",
                    height: "10px",
                    "& .MuiInputBase-root": {
                      width: "250px",
                      display: "flex",
                    },
                    "& .MuiInputBase-input": {
                      width: "220px",
                      maxWidth: "220px",
                      minWidth: "220px",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: "0.85rem", // 👈 sets the label font size
                    },
                  }}
                />
                {/* <FormControl sx={{
                  width: "250px",
                  maxWidth: "250px",
                  minWidth: "250px",
                  // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "5px",
                  display: "flex",
                  "& .MuiInputBase-root": {
                    width: "100%",
                    display: "flex",
                  },
                  "& .MuiInputBase-input": {
                    width: "200px",
                    maxWidth: "200px",
                    minWidth: "200px",
                  },
                }}>
                  <InputLabel sx={{ fontSize: "1rem", }}>All Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <MenuItem value="">All </MenuItem>
                    <MenuItem value="open">Open</MenuItem>
                    <MenuItem value="closed">Closed</MenuItem>
                  </Select>
                </FormControl> */}
                <FormControl
                  sx={{
                    width: "250px",
                    maxWidth: "250px",
                    minWidth: "250px",
                    // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                    display: "flex",
                    position: "relative",
                    
                    "& .MuiInputBase-root": {
                      width: "100%",
                      display: "flex",
                      height: "40px !important",
                    },
                    "& .MuiInputBase-input": {
                      width: "200px",
                      maxWidth: "200px",
                      minWidth: "200px",
                    },
                  }}

                >
                  <InputLabel sx={{ ...inputLabelStyle }}>Status</InputLabel>

                  {/* Wrap Select and Icon in a container to align them correctly */}
                  <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      sx={{
                        width: "100%", // Ensures full width
                        paddingRight: "40px", // Creates space for the icon
                      }}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="open">Open</MenuItem>
                      <MenuItem value="closed">Closed</MenuItem>
                      <MenuItem value="paused">Paused</MenuItem>
                    </Select>

                    {/* Manually add the icon inside the box, positioning it correctly */}
                    <ArrowDropDownCircleIcon
                      sx={{
                        ...dropdownIconStyle
                      }}
                    />
                  </Box>
                </FormControl>
                <SoftButton
                  variant="gradient"
                  color="info"
                  onClick={() => navigate("/addJob")}
                  sx={{
                    height: "40px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                    marginLeft: "auto", // Aligns the button to the right
                    marginRight: "30px",
                  }}
                >
                  Add Job
                </SoftButton>
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
                  <Box position="fixed"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  bgcolor="rgba(255,255,255,0.7)" // Semi-transparent background
                  zIndex={9999}>
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
    </DashboardLayout>
  );
}

export default Tables;
