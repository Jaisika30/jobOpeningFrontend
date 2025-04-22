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
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Candidate from "examples/Candidates/Candidate";
import { Box, InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import getCandidatesTableData from "layouts/candidates/data/candidatesTable";
import { getJobById } from "slices/jobSlice";
import { inputLabelStyle } from "assets/textFieldStyles";
import { dropdownIconStyle } from "assets/textFieldStyles";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle"; // Import icon
import { getJobs } from "slices/jobSlice";
import CustomPagination from "assets/CustomPagination";


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
  const [openDropdown, setOpenDropdown] = useState(false);
  const jobDetail = useSelector((state) => state.jobs.job); // Get job from Redux
  const dispatch = useDispatch();
  const [selectedJob, setSelectedJob] = useState("");
  const navigate = useNavigate();
  const selectRef = useRef();
  const handleOpen = () => setOpen(true);
  const { topAction, columns, rows, pagination } = getCandidatesTableData(handleOpen);
  const location = useLocation();
  const urlStatus = React.useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('status');
  }, [location.search]);
  // Debugging logs
  console.log("Pagination config:", pagination);
  console.log("Current jobDetail:", jobDetail);
  console.log("ID from URL:", id);
  const jobs = useSelector((state) => state.jobs.jobs.jobs || []);
  const sortedJobs = [...jobs].sort((a, b) => a.title.localeCompare(b.title));
  console.log("Jobssss candidaye table:::", jobs)
  useEffect(() => {
    dispatch(getJobs({
      page: 1,
      limit: 5,
      searchQuery: "",
      statusFilter: "",
    }));
  }, [dispatch]);
  useEffect(() => {
    console.log("useEffect triggered with id:", id);
    if (id) {
      dispatch(getJobById(id));
    }
  }, [id, dispatch]); // This will run when id changes
  const handleChange = (event) => {
    const jobId = event.target.value;
    setSelectedJob(jobId);
    console.log("JobIddd", jobId);
    if (jobId) {
      navigate(`/Candidates/${jobId}?flag=true`);
    }
    setOpenDropdown(false);
  };
  const handleIconClick = () => {
    setOpenDropdown(true); // Opens the Select dropdown
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box display="flex" flexDirection="column" minHeight="auto">
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Card>
              <SoftBox p={3}>
                {/* Header - now using jobDetail.title */}
                <div style={{ textAlign: "center", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                  <SoftTypography variant="h5">
                    {id
                      ? jobDetail
                        ? `Candidates For: ${jobDetail.title}`
                        : "Loading job details..."
                      : "Candidates"}
                  </SoftTypography>
                  {
                    urlStatus != "Hired" && !id ? <FormControl
                      sx={{
                        width: "200px",
                        maxWidth: "200px",
                        borderRadius: "5px",
                        display: "flex",
                        "& .MuiInputBase-root": {
                          width: "100%",
                          display: "flex",
                        },
                        "& .MuiInputBase-input": {
                          width: "180px",
                          maxWidth: "180px",
                          minWidth: "180px",
                        },
                      }}
                    >
                      <InputLabel sx={{ ...inputLabelStyle }}>All Jobs</InputLabel>
                      <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
                        <Select
                          value={""}
                          sx={{ width: "100%", paddingRight: "40px" }}
                          open={openDropdown}
                          onChange={handleChange}
                          onClose={() => setOpenDropdown(false)}
                          onOpen={() => setOpenDropdown(true)}
                        >

                          {/* <MenuItem value="">All</MenuItem> */}
                          {sortedJobs.map((job) => (
                            <MenuItem key={job._id} value={job._id} >
                              {job.title}
                            </MenuItem>
                          ))}
                        </Select>
                        <ArrowDropDownCircleIcon sx={{ ...dropdownIconStyle }} onClick={handleIconClick} />
                      </Box>
                    </FormControl> : ""
                  }

                </div>

                <SoftBox mt={4}>{topAction}</SoftBox>
              </SoftBox>

              <Candidate columns={columns} rows={rows} />
              <CustomPagination pagination={pagination} />
            </Card>
          </SoftBox>
        </SoftBox>
      </Box>
    </DashboardLayout>
  );



  // return (
  //   <DashboardLayout>
  //     <DashboardNavbar />
  //     <Box display="flex" flexDirection="column" minHeight="auto">
  //       <SoftBox py={3}>
  //         <SoftBox mb={3}>
  //           <Card>
  //             {/* Your header content */}

  //             {/* Table without pagination */}
  //             <Candidate columns={columns} rows={rows} />

  //             {/* Separate pagination component */}
  //             <CustomPagination pagination={pagination} />
  //           </Card>
  //         </SoftBox>
  //       </SoftBox>
  //     </Box>
  //   </DashboardLayout>
  // );
}

export default Candidates;
