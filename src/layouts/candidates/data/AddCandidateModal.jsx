// import React from "react";
// import { Modal, TextField, Button } from "@mui/material";

// const AddCandidateModal = ({ open, handleClose, handleSubmit, handleChange, newCandidate }) => {
//   return (
//     <Modal open={open} onClose={handleClose}>
//       <div style={{ padding: 20, background: "white", margin: "10% auto", width: 300 }}>
//         <h3>Add Candidate</h3>
//         <TextField
//           fullWidth
//           label="Name"
//           name="name"
//           value={newCandidate.name}
//           onChange={handleChange}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="Location"
//           name="location"
//           value={newCandidate.location}
//           onChange={handleChange}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="Time Offered"
//           name="timeOffered"
//           value={newCandidate.timeOffered}
//           onChange={handleChange}
//           margin="normal"
//         />
//         <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
//           Submit
//         </Button>
//       </div>
//     </Modal>
//   );
// };

// export default AddCandidateModal;


// import React from "react";
// import { Modal, TextField, Button, Box, Grid, MenuItem, Typography } from "@mui/material";
// // import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DatePicker } from "@mui/x-date-pickers";


// const interviewStatusOptions = ["Offered", "Accepted", "Missed", "Interviewed", "Rescheduled"];
// const statusOptions = ["Pending", "Shortlisted", "Rejected", "Hired", "Applied"];

// const AddCandidateModal = ({ open, handleClose, handleSubmit, handleChange, newCandidate, handleDateChange }) => {
//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box
//         sx={{
//           backgroundColor: "white",
//           width: 450,
//           padding: 4,
//           margin: "3% auto",
//           borderRadius: 2,
//           boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//         }}
//       >
//         <Typography variant="h5" textAlign="center" fontWeight="bold" gutterBottom>
//           Add Candidate
//         </Typography>

//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Name"
//               name="name"
//               value={newCandidate.name}
//               onChange={handleChange}
//               variant="outlined"
//               required
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Phone"
//               name="phone"
//               value={newCandidate.phone}
//               onChange={handleChange}
//               variant="outlined"
//               required
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Location"
//               name="location"
//               value={newCandidate.location}
//               onChange={handleChange}
//               variant="outlined"
//               required
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Interview Slot"
//               name="interviewSlot"
//               value={newCandidate.interviewSlot}
//               onChange={handleChange}
//               variant="outlined"
//               placeholder="e.g., 10:00AM - 10:20AM"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <DatePicker
//               label="Interview Schedule"
//               value={newCandidate.interviewSchedule}
//               onChange={(date) => handleDateChange(date, "interviewSchedule")}
//               renderInput={(params) => <TextField fullWidth {...params} variant="outlined" />}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               type="number"
//               label="Communication (1-10)"
//               name="communication"
//               value={newCandidate.communication}
//               onChange={handleChange}
//               variant="outlined"
//               inputProps={{ min: 1, max: 10 }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               type="number"
//               label="Personality (1-10)"
//               name="personality"
//               value={newCandidate.personality}
//               onChange={handleChange}
//               variant="outlined"
//               inputProps={{ min: 1, max: 10 }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               type="number"
//               label="Knowledge (1-10)"
//               name="knowledge"
//               value={newCandidate.knowledge}
//               onChange={handleChange}
//               variant="outlined"
//               inputProps={{ min: 1, max: 10 }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               select
//               fullWidth
//               label="Interview Status"
//               name="interviewStatus"
//               value={newCandidate.interviewStatus}
//               onChange={handleChange}
//               variant="outlined"
//             >
//               {interviewStatusOptions.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               select
//               fullWidth
//               label="Status"
//               name="status"
//               value={newCandidate.status}
//               onChange={handleChange}
//               variant="outlined"
//             >
//               {statusOptions.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>

//           <Grid item xs={6}>
//             <Button fullWidth variant="outlined" color="secondary" onClick={handleClose}>
//               Cancel
//             </Button>
//           </Grid>
//           <Grid item xs={6}>
//             <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
//               Submit
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Modal>
//   );
// };

// export default AddCandidateModal;


import React from "react";
import { Modal, TextField, Button, Box, Grid, MenuItem, Typography, Select, InputLabel, FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Dropdown options
const interviewStatusOptions = ["Offered", "Accepted", "Missed", "Interviewed", "Rescheduled"];
const statusOptions = ["Pending", "Shortlisted", "Rejected", "Hired", "Applied"];
const ratingOptions = [1, 2, 3, 4, 5]; // For communication, personality, and knowledge

const AddCandidateModal = ({ open, handleClose, handleSubmit, handleChange, newCandidate, handleDateChange }) => {
  
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          backgroundColor: "#fff",
          width: 500,
          padding: 4,
          margin: "5% auto",
          borderRadius: 2,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography variant="h5" textAlign="center" fontWeight="bold" gutterBottom>
          Add Candidate
        </Typography>

        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField fullWidth label="Name" name="name" value={newCandidate.name} onChange={handleChange} variant="outlined" required />
          </Grid>

          {/* Phone */}
          <Grid item xs={12}>
            <TextField fullWidth label="Phone" name="phone" value={newCandidate.phone} onChange={handleChange} variant="outlined" required />
          </Grid>

          {/* Location */}
          <Grid item xs={12}>
            <TextField fullWidth label="Location" name="location" value={newCandidate.location} onChange={handleChange} variant="outlined" required />
          </Grid>

          {/* Interview Slot (Text Field) */}
          <Grid item xs={12}>
            <TextField fullWidth label="Interview Slot" name="interviewSlot" value={newCandidate.interviewSlot} onChange={handleChange} variant="outlined" placeholder="e.g., 10:00AM - 10:20AM" />
          </Grid>

          {/* Interview Schedule (DatePicker) */}
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Interview Schedule"
                value={newCandidate.interviewSchedule}
                onChange={(date) => handleDateChange(date, "interviewSchedule")}
                renderInput={(params) => <TextField fullWidth {...params} variant="outlined" />}
              />
            </LocalizationProvider>
          </Grid>

          {/* Interview Status (Dropdown) */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Interview Status</InputLabel>
              <Select name="interviewStatus" value={newCandidate.interviewStatus} onChange={handleChange} label="Interview Status">
                {interviewStatusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Personality (Dropdown) */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Personality</InputLabel>
              <Select name="personality" value={newCandidate.personality} onChange={handleChange} label="Personality">
                {ratingOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Knowledge (Dropdown) */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Knowledge</InputLabel>
              <Select name="knowledge" value={newCandidate.knowledge} onChange={handleChange} label="Knowledge">
                {ratingOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Communication (Dropdown) */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Communication</InputLabel>
              <Select name="communication" value={newCandidate.communication} onChange={handleChange} label="Communication">
                {ratingOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Candidate Status (Dropdown) */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select name="status" value={newCandidate.status} onChange={handleChange} label="Status">
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddCandidateModal;
