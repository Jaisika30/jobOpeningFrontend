
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getJobById, updateJob } from "slices/jobSlice";
import { toast } from "react-toastify";
import { textFieldStyles } from "assets/textFieldStyles";
import { InputLabel } from "@mui/material";
import SoftButton from "components/SoftButton";
import { dropdownStyles } from "assets/textFieldStyles";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { inputLabelStyle } from "assets/textFieldStyles";
import Box from '@mui/material/Box';
import { dropdownIconStyle } from "assets/textFieldStyles";
import { FloatingTextarea } from "assets/FloatingTextarea";
import { toastSuccess } from "assets/textFieldStyles";



function formatDate(isoString) {
  if (!isoString) return "";
  return new Date(isoString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function EditJob() {
  const { id } = useParams(); // Get Job ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jobDetail = useSelector((state) => state.jobs.job);
  const isLoading = useSelector((state) => state.jobs.loading);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const locationRef = useRef();
  const postingDateRef = useRef();
  const statusRef = useRef();

  const [job, setJob] = useState({
    title: "",
    description: "",
    postingDate: "",
    location: "",
    status: "Open", // Default value
  });

  // Fetch job details
  useEffect(() => {
    if (id) {
      dispatch(getJobById(id));
    }
  }, [dispatch, id]);

  // Update state when jobDetail is available
  useEffect(() => {
    if (jobDetail && Object.keys(jobDetail).length > 0) {
      setJob({
        title: jobDetail.title || "",
        description: jobDetail.description || "",
        location: jobDetail.location || "",
        postingDate: jobDetail.createdAt ? jobDetail.createdAt.split("T")[0] : "",
        // Proper date format
        status: jobDetail.status || "Open",
      });
    }
  }, [jobDetail]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log("update id:::", id);
    console.log("job updatedData", job)
    // dispatch(updateJob({ id, updatedData: job }));
    dispatch(updateJob({ id, updatedData: job }))

    navigate("/jobs");
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3} textAlign="center">
          <SoftTypography variant="h6">Loading job details...</SoftTypography>
        </SoftBox>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card sx={{ p: 3 }}>
            <SoftTypography variant="h5" mb={3} textAlign="center">
              Edit Job Details
            </SoftTypography>
            <form onSubmit={handleSubmit}>
              {/* Row 1: title, description, Location */}
              <SoftBox
                mb={3}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr"
                  },
                  gap: 3,
                  alignItems: "flex-start"
                }}
              >
                <TextField
                  inputRef={titleRef}
                  label="Title"
                  name="title"
                  value={job.title}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      descriptionRef.current?.focus();
                    }
                  }}
                  placeholder="Enter Job Title"
                  sx={textFieldStyles}
                  InputLabelProps={{

                    sx: { ...inputLabelStyle },
                  }}
                />

                <TextField
                  inputRef={locationRef}
                  label="Location"
                  name="location"
                  value={job.location}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      postingDateRef.current?.focus();
                    }
                  }}
                  placeholder="Enter location"
                  InputLabelProps={{
                    sx: { ...inputLabelStyle },
                  }}
                  sx={textFieldStyles}
                />
              </SoftBox>

              {/* description row*/}
              <SoftBox
                mb={3}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr",
                    md: "1fr"
                  },
                  gap: 3,
                  alignItems: "flex-start"
                }}
              >
                <SoftBox>
                  <FloatingTextarea
                    descriptionRef={descriptionRef}
                    value={job.description}
                    onChange={handleChange}
                    placeholder="Enter job description"
                    onEnter={() => locationRef.current?.focus()}
                  />
                </SoftBox>

              </SoftBox>

              {/* Second Row */}
              <SoftBox
                mb={3}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr"
                  },
                  gap: 3,
                  alignItems: "flex-start"
                }}
              >
                <TextField
                  inputRef={postingDateRef}
                  label="Posting Date"
                  name="postingDate"
                  value={job.postingDate}
                  onChange={handleChange}
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                    sx: { fontSize: "1rem" },
                  }}
                  inputProps={{
                    style: {
                      paddingRight: "0.5rem", // ensures date icon doesn't get cut off
                    },
                  }}
                  sx={{
                    "& input": {
                      fontSize: "1rem",
                    },
                    "& .MuiInputBase-root": {
                      width: "100%",
                    },
                  }}
                />

                <FormControl sx={{ ...dropdownStyles, position: "relative" }}>
                  <InputLabel id="status-label" sx={{ ...inputLabelStyle }}>
                    Select Status
                  </InputLabel>
                  <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
                    <Select
                      name="status"
                      value={job.status || ""}
                      inputRef={statusRef}
                      onChange={handleChange}
                      label="Select Status"
                      sx={{
                        width: "100%", // Ensures full width
                        paddingRight: "40px", // Creates space for the icon
                      }}
                    >
                      {['Open', 'Closed', 'Pause'].map((status) => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                      ))}
                    </Select>
                    <ArrowDropDownCircleIcon
                      sx={{
                        ...dropdownIconStyle
                      }}
                    />
                  </Box>
                </FormControl>
              </SoftBox>

              {/* Buttons */}
              <SoftBox
                mt={3}
                display="flex"
                justifyContent="flex-end"
                flexDirection={{ xs: "column", sm: "row" }}
                gap={2}
              >
                <SoftButton
                  variant="gradient"
                  color="error"
                  onClick={() => navigate("/jobs")}
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    px: 3,
                  }}
                >
                  Cancel
                </SoftButton>
                <SoftButton
                  type="submit"
                  variant="gradient"
                  color="info"
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    px: 3,
                  }}
                >
                  Edit Job
                </SoftButton>
              </SoftBox>
            </form>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default EditJob;
