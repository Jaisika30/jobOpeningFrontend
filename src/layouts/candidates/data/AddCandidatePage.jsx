// import React, { useState } from "react";
// import {
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   Box,
//   Grid,
//   Typography,
//   InputLabel,
//   FormControl,
// } from "@mui/material";

// const AddCandidatePage = () => {
//   const [candidate, setCandidate] = useState({
//     name: "",
//     phone: "",
//     location: "",
//     timeSlot: "",
//     interviewSchedule: "",
//     communication: "",
//     personality: "",
//     knowledge: "",
//     interviewStatus: "",
//     status: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCandidate({ ...candidate, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Candidate Data:", candidate);
//     alert("Candidate details successfully added!");
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: "800px",
//         margin: "auto",
//         padding: "30px",
//         backgroundColor: "#f9f9f9",
//         boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//         borderRadius: "8px",
//       }}
//     >
//       <Typography
//         variant="h5"
//         textAlign="center"
//         sx={{ marginBottom: "30px", fontWeight: "bold" }}
//       >
//         Add Candidate
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           {/* Name Field */}
//           <Grid item xs={12}>
//             <TextField
//               name="name"
//               label="Name"
//               fullWidth
//               value={candidate.name}
//               onChange={handleChange}
//               variant="outlined"
//               sx={{
//                 backgroundColor: "#ffffff",
//                 boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
//                 borderRadius: "8px",
//               }}
//             />
//           </Grid>

//           {/* Phone Field */}
//           <Grid item xs={12}>
//             <TextField
//               name="phone"
//               label="Phone"
//               fullWidth
//               value={candidate.phone}
//               onChange={handleChange}
//               variant="outlined"
//               sx={{
//                 backgroundColor: "#ffffff",
//                 boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
//                 borderRadius: "8px",
//               }}
//             />
//           </Grid>

//           {/* Location Field */}
//           <Grid item xs={12}>
//             <TextField
//               name="location"
//               label="Location"
//               fullWidth
//               value={candidate.location}
//               onChange={handleChange}
//               variant="outlined"
//               sx={{
//                 backgroundColor: "#ffffff",
//                 boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
//                 borderRadius: "8px",
//               }}
//             />
//           </Grid>

//           {/* Time Slot Field */}
//           <Grid item xs={12}>
//             <TextField
//               name="timeSlot"
//               label="Time Slot"
//               fullWidth
//               value={candidate.timeSlot}
//               onChange={handleChange}
//               variant="outlined"
//               sx={{
//                 backgroundColor: "#ffffff",
//                 boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
//                 borderRadius: "8px",
//               }}
//             />
//           </Grid>

//           {/* Interview Schedule Field */}
//           <Grid item xs={12}>
//             <TextField
//               name="interviewSchedule"
//               label="Interview Schedule"
//               fullWidth
//               value={candidate.interviewSchedule}
//               onChange={handleChange}
//               variant="outlined"
//               sx={{
//                 backgroundColor: "#ffffff",
//                 boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
//                 borderRadius: "8px",
//               }}
//             />
//           </Grid>

//           {/* Communication Dropdown */}
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel>Communication</InputLabel>
//               <Select
//                 name="communication"
//                 value={candidate.communication}
//                 onChange={handleChange}
//                 sx={{
//                   backgroundColor: "#ffffff",
//                   boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
//                   borderRadius: "8px",
//                 }}
//               >
//                 {[1, 2, 3, 4, 5].map((value) => (
//                   <MenuItem key={value} value={value}>
//                     {value}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Personality Dropdown */}
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel>Personality</InputLabel>
//               <Select
//                 name="personality"
//                 value={candidate.personality}
//                 onChange={handleChange}
//                 sx={{
//                   backgroundColor: "#ffffff",
//                   boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
//                   borderRadius: "8px",
//                 }}
//               >
//                 {[1, 2, 3, 4, 5].map((value) => (
//                   <MenuItem key={value} value={value}>
//                     {value}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Knowledge Dropdown */}
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel>Knowledge</InputLabel>
//               <Select
//                 name="knowledge"
//                 value={candidate.knowledge}
//                 onChange={handleChange}
//                 sx={{
//                   backgroundColor: "#ffffff",
//                   boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
//                   borderRadius: "8px",
//                 }}
//               >
//                 {[1, 2, 3, 4, 5].map((value) => (
//                   <MenuItem key={value} value={value}>
//                     {value}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Interview Status Dropdown */}
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel>Interview Status</InputLabel>
//               <Select
//                 name="interviewStatus"
//                 value={candidate.interviewStatus}
//                 onChange={handleChange}
//                 sx={{
//                   backgroundColor: "#ffffff",
//                   boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
//                   borderRadius: "8px",
//                 }}
//               >
//                 {[
//                   "Offered",
//                   "Accepted",
//                   "Missed",
//                   "Interviewed",
//                   "Rescheduled",
//                 ].map((status) => (
//                   <MenuItem key={status} value={status}>
//                     {status}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Status Dropdown */}
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel>Status</InputLabel>
//               <Select
//                 name="status"
//                 value={candidate.status}
//                 onChange={handleChange}
//                 sx={{
//                   backgroundColor: "#ffffff",
//                   boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
//                   borderRadius: "8px",
//                 }}
//               >
//                 {["Pending", "Shortlisted", "Rejected", "Hired", "Applied"].map(
//                   (status) => (
//                     <MenuItem key={status} value={status}>
//                       {status}
//                     </MenuItem>
//                   )
//                 )}
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Submit Button */}
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               sx={{
//                 padding: "10px",
//                 fontSize: "16px",
//                 fontWeight: "bold",
//                 boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//               }}
//             >
//               Add Candidate
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default AddCandidatePage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function AddCandidatePage() {
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState({
    name: "",
    phone: "",
    location: "",
    timeSlot: "",
    interviewSchedule: "",
    communication: "",
    personality: "",
    knowledge: "",
    interviewStatus: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding candidate:", candidate);
    // Simulate API call or dispatch action
    navigate("/candidates"); // Redirect after submission
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card sx={{ p: 3 }}>
            <SoftTypography variant="h5" mb={3}>
              Add Candidate
            </SoftTypography>
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <SoftBox mb={3}>
                <SoftTypography variant="body1" mb={1}>
                  Name
                </SoftTypography>
                <TextField
                  fullWidth
                  name="name"
                  value={candidate.name}
                  onChange={handleChange}
                  margin="none"
                  sx={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                  }}
                />
              </SoftBox>

              {/* Phone Field */}
              <SoftBox mb={3}>
                <SoftTypography variant="body1" mb={1}>
                  Phone
                </SoftTypography>
                <TextField
                  fullWidth
                  name="phone"
                  value={candidate.phone}
                  onChange={handleChange}
                  margin="none"
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
                  value={candidate.location}
                  onChange={handleChange}
                  margin="none"
                  sx={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                  }}
                />
              </SoftBox>

              {/* Time Slot Field */}
              <SoftBox mb={3}>
                <SoftTypography variant="body1" mb={1}>
                  Time Slot
                </SoftTypography>
                <TextField
                  fullWidth
                  name="timeSlot"
                  value={candidate.timeSlot}
                  onChange={handleChange}
                  margin="none"
                  sx={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                  }}
                />
              </SoftBox>

              {/* Interview Schedule Field */}
              <SoftBox mb={3}>
                <SoftTypography variant="body1" mb={1}>
                  Interview Schedule
                </SoftTypography>
                <TextField
                  fullWidth
                  name="interviewSchedule"
                  value={candidate.interviewSchedule}
                  onChange={handleChange}
                  margin="none"
                  sx={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                  }}
                />
              </SoftBox>

              {/* Communication Dropdown */}
              <SoftBox mb={3}>
                <SoftTypography variant="body1" mb={1}>
                  Communication
                </SoftTypography>
                <FormControl fullWidth>
                  <InputLabel>Communication</InputLabel>
                  <Select
                    name="communication"
                    value={candidate.communication}
                    onChange={handleChange}
                    sx={{
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "5px",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </SoftBox>

              {/* Personality Dropdown */}
              <SoftBox mb={3}>
                <SoftTypography variant="body1" mb={1}>
                  Personality
                </SoftTypography>
                <FormControl fullWidth>
                  <InputLabel>Personality</InputLabel>
                  <Select
                    name="personality"
                    value={candidate.personality}
                    onChange={handleChange}
                    sx={{
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "5px",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </SoftBox>

              {/* Knowledge Dropdown */}
              <SoftBox mb={3}>
                <SoftTypography variant="body1" mb={1}>
                  Knowledge
                </SoftTypography>
                <FormControl fullWidth>
                  <InputLabel>Knowledge</InputLabel>
                  <Select
                    name="knowledge"
                    value={candidate.knowledge}
                    onChange={handleChange}
                    sx={{
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "5px",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </SoftBox>

              {/* Interview Status Dropdown */}
              <SoftBox mb={3}>
                <SoftTypography variant="body1" mb={1}>
                  Interview Status
                </SoftTypography>
                <FormControl fullWidth>
                  <InputLabel>Interview Status</InputLabel>
                  <Select
                    name="interviewStatus"
                    value={candidate.interviewStatus}
                    onChange={handleChange}
                    sx={{
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "5px",
                    }}
                  >
                    {[
                      "Offered",
                      "Accepted",
                      "Missed",
                      "Interviewed",
                      "Rescheduled",
                    ].map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </SoftBox>

              {/* Status Dropdown */}
              <SoftBox mb={3}>
                <SoftTypography variant="body1" mb={1}>
                  Status
                </SoftTypography>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={candidate.status}
                    onChange={handleChange}
                    sx={{
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "5px",
                    }}
                  >
                    {[
                      "Pending",
                      "Shortlisted",
                      "Rejected",
                      "Hired",
                      "Applied",
                    ].map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </SoftBox>

              {/* Submit Button */}
              <SoftBox mt={3} display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Add Candidate
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/candidates")}
                >
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

export default AddCandidatePage