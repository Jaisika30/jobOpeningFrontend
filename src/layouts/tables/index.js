
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
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { inputLabelStyle, dropdownIconStyle } from "assets/textFieldStyles";
import CustomPagination from "assets/CustomPagination";
import { useEffect, useState } from "react";

function Tables() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const {
    jobData,
    loading,
    setSearchQuery,
    setStatusFilter,
    searchQuery,
    statusFilter,
    page,
    setPage,
    totalPages,
    pagination,
  } = useJobData();
  const location = useLocation();
  const urlStatus = new URLSearchParams(location.search).get("status");

  useEffect(() => {

    // Update statusFilter only if urlStatus exists and is different from the current statusFilter
    if (urlStatus) {
      setStatusFilter(urlStatus.toLowerCase());
    } else {
      setStatusFilter(""); // Clear dropdown when urlStatus is not present
    }
  }, [urlStatus]);
  const isStatusDisabled = urlStatus === "Open";

  // const handleDelete = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       dispatch(deleteJob({ id }))
  //         .unwrap()
  //         .then(() => Swal.fire("Deleted!", "The job has been deleted.", "success"))
  //         // .catch(() => Swal.fire("Error!", "Something went wrong!", "error"));
  //     }
  //   });
  // };
  // const handleDelete = async (id) => {
  //   const result = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Yes, delete it!",
  //   });
  
  //   if (result.isConfirmed) {
  //     try {
  //       await dispatch(deleteJob({ id })).unwrap();
  //       console.log("Deleted job successfully:", res);
  //       Swal.fire("Deleted!", "The job has been deleted.", "success");
  
  //       // OPTIONAL: re-fetch jobs if needed
  //       dispatch(getJobs({
  //         page: 1,
  //         limit: 10,
  //         searchQuery: "",
  //         statusFilter: "",
  //       }));
  //     } catch (error) {
  //       Swal.fire("Error!", "Something went wrong while deleting.", "error");
  //     }
  //   }
  // };
  
  const handleIconClick = () => {
    setOpenDropdown(true); // Opens the Select dropdown
  };

  const handleChange = (e) => {
    setStatusFilter(e.target.value);
    setOpenDropdown(false);
  }
  const tableData = getJobTableData(jobData, pagination, setPage);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box display="flex" flexDirection="column" minHeight="auto">
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Card>
              <SoftBox p={3}>
                <SoftTypography variant="h5" textAlign="center">Jobs</SoftTypography>
              </SoftBox>


              <SoftBox
                display="flex"
                gap="10px"
                p={2}
                flexWrap="wrap"
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Left-side filters */}
                <Box
                  display="flex"
                  gap="10px"
                  flexWrap="wrap"
                  sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                  }}
                >
                  <TextField
                    type="text"
                    label="Search Here"
                    placeholder="Search by Job Title"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                      width: { xs: "100%", sm: "250px" },
                      maxWidth: "250px",
                      borderRadius: "5px",
                      height: "40px",
                      "& .MuiInputBase-root": {
                        width: "100%",
                      },
                      "& .MuiInputBase-input": {
                        width: "100%",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        fontSize: "0.85rem",
                      },
                    }}
                  />

                  <FormControl
                    sx={{
                      width: { xs: "100%", sm: "250px" },
                      maxWidth: "250px",
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
                    <InputLabel sx={{ ...inputLabelStyle }}> All Jobs</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={handleChange}
                      sx={{
                        width: "100%",
                        paddingRight: "40px",
                      }}
                      open={openDropdown}
                      onClose={() => setOpenDropdown(false)}
                      onOpen={() => setOpenDropdown(true)}
                      // disabled={isStatusDisabled}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="open">Open</MenuItem>
                      <MenuItem value="closed">Closed</MenuItem>
                      <MenuItem value="paused">Paused</MenuItem>
                    </Select>
                    <ArrowDropDownCircleIcon sx={{ ...dropdownIconStyle }} onClick={urlStatus === "Open" ? undefined : handleIconClick}
                    />
                  </FormControl>
                </Box>

                {/* Right-side buttons */}
                <Box
                  display="flex"
                  gap="10px"
                  flexWrap="wrap"
                  sx={{
                    flexDirection: { xs: "row", sm: "row" },
                    justifyContent: { xs: "flex-start", sm: "flex-end" },
                    flexWrap: { xs: "nowrap" },
                    marginTop: { xs: "10px", sm: 0 },
                  }}
                >
                  <SoftButton
                    variant="gradient"
                    color="success"
                    onClick={() => navigate("/dashboard")}
                    sx={{
                      height: "40px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "5px",
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    Back
                  </SoftButton>
                  <SoftButton
                    variant="gradient"
                    color="info"
                    onClick={() => navigate("/addJob")}
                    sx={{
                      height: "40px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "5px",
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    Add Job
                  </SoftButton>
                </Box>
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
                  <Box
                    position="fixed"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor="rgba(255,255,255,0.7)"
                    zIndex={9999}
                  >
                    <CircularProgress color="secondary" size={30} />
                    <SoftTypography variant="button" color="secondary" textAlign="center" mt={1}>
                      Loading jobs...
                    </SoftTypography>
                  </Box>
                ) : tableData.rows.length === 0 ? (
                  <Box p={4} textAlign="center">
                    <SoftTypography variant="h6" color="error">
                      No jobs available.
                    </SoftTypography>
                  </Box>
                ) : (
                  <Table columns={tableData.columns} rows={tableData.rows} />
                )}
              </SoftBox>
              <CustomPagination pagination={tableData.pagination} />
            </Card>
          </SoftBox>
        </SoftBox>
      </Box>
    </DashboardLayout>
  );
}

export default Tables;