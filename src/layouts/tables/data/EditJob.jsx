
import React, { useState, useEffect } from "react";
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
import Footer from "examples/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getJobById, updateJob } from "slices/jobSlice";
import { toast } from "react-toastify";
import textFieldStyles from "assets/textFieldStyles";

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

  const [job, setJob] = useState({
    title: "",
    description: "",
    postingDate: "",
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
    console.log("update id:::",id);
    console.log("job updatedData",job)
    // dispatch(updateJob({ id, updatedData: job }));
    dispatch(updateJob({ id, updatedData: job }))
    .unwrap()
    .then(() => {
        toast.success("Job updated successfully!");
        navigate("/jobs");
    })
    .catch((error) => {
        toast.error("Failed to update job. Please try again.");
        console.error("Update error:", error);
    });
    navigate("/jobs");
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
              Edit Job
            </SoftTypography>
            <form>
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
                  sx={textFieldStyles}
                />
              </SoftBox>

              <SoftBox mb={3} sx={{ width: "100%" }}>
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
                   sx={textFieldStyles}
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
                <FormControl
                  fullWidth
                  sx={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                  }}
                >
                  <Select name="status" value={job.status} onChange={handleChange}>
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </FormControl>
              </SoftBox>

              <SoftBox mt={3} display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                  Edit Job
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

export default EditJob;
