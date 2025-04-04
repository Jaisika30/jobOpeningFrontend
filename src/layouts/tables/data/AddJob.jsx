import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import Footer from "examples/Footer";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "slices/jobSlice";
import { toast } from "react-toastify";

function AddJob() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.jobs.loading);

  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "", // Added location field
    postingDate: "",
    status: "Open",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // Prevent form from refreshing the page

  //   try {
  //     await dispatch(createJob({ jobData: job }));
  //     navigate("/jobs");
  //   } catch (error) {
  //     console.error("Failed to create job:", error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh

    try {
      await dispatch(createJob({ jobData: job }));
      toast.success("Job added successfully! 🚀");
      navigate("/jobs");
    } catch (error) {
      console.error("Failed to create job:", error);
      toast.error("Error creating job. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3} textAlign="center">
          <SoftTypography variant="h6">Loading job details...</SoftTypography>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card sx={{ p: 3 }}>
            <SoftTypography variant="h5" mb={3}>
              Add Job Details
            </SoftTypography>
            <form onSubmit={handleSubmit}>
              <SoftBox mb={3}>
                <SoftTypography variant="body1" mb={1}>
                  Job Title
                </SoftTypography>
                <TextField
                  fullWidth
                  name="title"
                  value={job.title}
                  onChange={handleChange}
                  margin="none"
                  sx={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                  }}
                />
              </SoftBox>

              <SoftBox mb={3}>
                <SoftTypography variant="body1" mb={1}>
                  Description
                </SoftTypography>
                <TextField
                  name="description"
                  value={job.description}
                  onChange={handleChange}
                  margin="none"
                  multiline
                  rows={4}
                  fullWidth
                  sx={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                  }}
                />
              </SoftBox>

              {/* Location Field */}
              <SoftBox mb={3}>
                <SoftTypography variant="body1" mb={1}>
                  Location
                </SoftTypography>
                <TextField
                  fullWidth
                  name="location"
                  value={job.location}
                  onChange={handleChange}
                  margin="none"
                  placeholder="Enter job location"
                  sx={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                    "& .MuiInputBase-input": {
                      width: "300px !important", // custom width of the input text area
                    },
                  }}
                />
              </SoftBox>

              <SoftBox mb={3}>
                <SoftTypography variant="body1" mb={1}>
                  Posting Date
                </SoftTypography>
                <TextField
                  fullWidth
                  name="postingDate"
                  type="date"
                  value={job.postingDate}
                  onChange={handleChange}
                  margin="none"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                  }}
                />
              </SoftBox>

              <SoftBox mb={3}>
                <SoftTypography variant="body1" mb={1}>
                  Status
                </SoftTypography>
                <FormControl fullWidth>
                  <Select
                    name="status"
                    value={job.status}
                    onChange={handleChange}
                    sx={{
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "5px",
                    }}
                  >
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </FormControl>
              </SoftBox>

              <SoftBox mt={3} display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" type="submit">
                  Add Job
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate("/jobs")}>
                  Cancel
                </Button>
              </SoftBox>
            </form>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddJob;
