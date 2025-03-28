

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Card from "@mui/material/Card";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// // import { getJobById, updateJob } from "layouts/tables/data/jobService";

// function EditJob() {
//   const { id } = useParams(); // Get Job ID from URL
//   const navigate = useNavigate();
//   const [job, setJob] = useState({ title: "", description: "", location: "" });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchJob() {
//       console.log("Fetching job with ID:", id);
//       // Simulating API Call
//       setTimeout(() => {
//         setJob({ title: "Sample Job", description: "Sample Description", location: "Remote" });
//         setLoading(false);
//       }, 1000);
//     }
//     fetchJob();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setJob((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Updating job:", job);
//     navigate("/jobs");
//   };

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <DashboardNavbar />
//         <SoftBox py={3} textAlign="center">
//           <SoftTypography variant="h6">Loading job details...</SoftTypography>
//         </SoftBox>
//         <Footer />
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <SoftBox py={3}>
//         <SoftBox mb={3}>
//           <Card sx={{ p: 3 }}>
//             <SoftTypography variant="h5" mb={2}>Edit Job</SoftTypography>
//             <form onSubmit={handleSubmit}>
//               <TextField
//                 fullWidth
//                 label="Job Title"
//                 name="title"
//                 value={job.title}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 label="Description"
//                 name="description"
//                 value={job.description}
//                 onChange={handleChange}
//                 margin="normal"
//                 multiline
//                 rows={4}
//               />
//               <TextField
//                 fullWidth
//                 label="Location"
//                 name="location"
//                 value={job.location}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//               <SoftBox mt={3} display="flex" justifyContent="space-between">
//                 <Button variant="contained" color="primary" type="submit">
//                   Save Changes
//                 </Button>
//                 <Button variant="outlined" color="secondary" onClick={() => navigate("/jobs")}>
//                   Cancel
//                 </Button>
//               </SoftBox>
//             </form>
//           </Card>
//         </SoftBox>
//       </SoftBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default EditJob;


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

function EditJob() {
  const { id } = useParams(); // Get Job ID from URL
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    postingDate: "",
    status: "opened", // Default value
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      console.log("Fetching job with ID:", id);
      // Simulating API Call
      setTimeout(() => {
        setJob({
          title: "Sample Job",
          description: "Sample Description",
          postingDate: "2025-03-28",
          status: "opened",
        });
        setLoading(false);
      }, 1000);
    }
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updating job:", job);
    navigate("/jobs");
  };

  if (loading) {
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
                  fullWidth
                  name="description"
                  value={job.description}
                  onChange={handleChange}
                  margin="none"
                  multiline
                  rows={4}
                  sx={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
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
                <FormControl
                  fullWidth
                  sx={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                  }}
                >
                  <Select
                    name="status"
                    value={job.status}
                    onChange={handleChange}
                  >
                    <MenuItem value="opened">Opened</MenuItem>
                    <MenuItem value="closed">Closed</MenuItem>
                  </Select>
                </FormControl>
              </SoftBox>
              <SoftBox mt={3} display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" type="submit">
                  Save Changes
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

