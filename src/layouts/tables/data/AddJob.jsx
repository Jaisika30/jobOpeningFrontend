
// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Card from "@mui/material/Card";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import { useDispatch, useSelector } from "react-redux";
// import { createJob } from "slices/jobSlice";
// import { toast } from "react-toastify";
// import { textFieldStyles } from "assets/textFieldStyles";
// import { InputLabel } from "@mui/material";
// import SoftButton from "components/SoftButton";
// import { dropdownStyles } from "assets/textFieldStyles";

// function AddJob() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isLoading = useSelector((state) => state.jobs.loading);
//   const titleRef = useRef();
//   const descriptionRef = useRef();
//   const locationRef = useRef();
//   const postingDateRef = useRef();
//   const statusRef = useRef();
//   const [job, setJob] = useState({
//     title: "",
//     description: "",
//     location: "",
//     postingDate: "",
//     status: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setJob((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const fieldLabels = {
//       title: "Job Title",
//       description: "Job Description",
//       location: "Location",
//       postingDate: "Posting Date",
//       status: "Status",
//     };

//     for (let field in fieldLabels) {
//       const value = job[field]?.trim?.() ?? job[field];
//       if (!value) {
//         toast.error(`Please fill in the ${fieldLabels[field]}.`);
//         return;
//       }
//     }

//     try {
//       await dispatch(createJob({ jobData: job }));
//       toast.success("Job added successfully! 🚀");
//       navigate("/jobs");
//     } catch (error) {
//       console.error("Failed to create job:", error);
//       toast.error("Error creating job. Please try again.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <DashboardLayout>
//         <DashboardNavbar />
//         <SoftBox py={3} textAlign="center">
//           <SoftTypography variant="h6">Loading job details...</SoftTypography>
//         </SoftBox>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <SoftBox py={3}>
//         <SoftBox mb={3}>
//           <Card sx={{ p: 3 }}>
//             <SoftTypography variant="h5" mb={3}>
//               Add Job Details
//             </SoftTypography>
//             <form onSubmit={handleSubmit}>
//               {/* First Row */}
//               <SoftBox
//                 mb={3}
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
//                   gap: 3,
//                 }}
//               >
//                 <TextField
//                   inputRef={titleRef}
//                   label="Title"
//                   name="title"
//                   value={job.title}
//                   onChange={handleChange}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       descriptionRef.current?.focus();
//                     }
//                   }}
//                   placeholder="Enter Job Title"
//                   sx={textFieldStyles}
//                   fullWidth
//                   variant="outlined"
//                   InputLabelProps={{
//                     sx: { fontSize: "1rem" },
//                   }}
//                 />

//                 <TextField
//                   inputRef={descriptionRef}
//                   label="Description"
//                   name="description"
//                   value={job.description}
//                   onChange={handleChange}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       locationRef.current?.focus();
//                     }
//                   }}
//                   placeholder="Enter job description"
//                   InputLabelProps={{
//                     sx: { fontSize: "1rem" },
//                   }}
//                   sx={textFieldStyles}
//                   fullWidth
//                 />

//                 <TextField
//                   inputRef={locationRef}
//                   label="Location"
//                   name="location"
//                   value={job.location}
//                   onChange={handleChange}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       postingDateRef.current?.focus();
//                     }
//                   }}
//                   placeholder="Enter location"
//                   InputLabelProps={{
//                     sx: { fontSize: "1rem" },
//                   }}
//                   sx={textFieldStyles}
//                   fullWidth
//                 />
//               </SoftBox>

//               {/* Second Row */}

//               <SoftBox
//                 mb={3}
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns: { 
//                       xs: "1fr", 
//                       sm: "repeat(2, 1fr)",
//                       md: "repeat(3, 1fr)"
//                   },
//                   gap: 3,
//                   alignItems: "flex-start"
//               }}
//               >
//                 <TextField
//                   inputRef={postingDateRef}
//                   label="Posting Date"
//                   name="postingDate"
//                   value={job.postingDate}
//                   onChange={handleChange}
//                   type="date"
//                   sx={{
//                     ...textFieldStyles,
//                     width: "360px",                 // Fixed width for date field
//                     "& .MuiInputBase-root": {
//                       width: "100%",
//                     },
//                   }}
//                   InputLabelProps={{
//                     shrink: true,
//                     sx: { fontSize: "1rem" },
//                   }}
//                 />

//                 <FormControl
//                   sx={{
//                     ...dropdownStyles,
//                     width: "340px",
//                   }}
//                 >
//                   <InputLabel id="status-label" sx={{ fontSize: "1rem" }}>
//                     Select Status
//                   </InputLabel>
//                   <Select
//                     name="status"
//                     value={job.status || ""}
//                     inputRef={statusRef}
//                     onChange={handleChange}
//                     label="Select Status"
//                     sx={{ width: "100%" }}
//                   >
//                     {['Open', 'Closed'].map((status) => (
//                       <MenuItem key={status} value={status}>{status}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </SoftBox>
//               <SoftBox
//                 mt={3}
//                 display="flex"
//                 justifyContent="space-between"
//                 flexDirection={{ xs: "column", sm: "row" }}
//                 gap={2}
//               >
//                 <SoftButton
//                   type="submit"
//                   variant="gradient"
//                   color="info"
//                   sx={{
//                     width: 'auto', // Ensures content-based width
//                     px: 3, // Adds horizontal padding
//                   }}
//                 >
//                   Addd Job
//                 </SoftButton>
//                 <SoftButton
//                   variant="gradient"
//                   color="error"
//                   onClick={() => navigate("/jobs")}
//                   sx={{
//                     width: 'auto', // Ensures content-based width
//                     px: 3, // Adds horizontal padding
//                   }}
//                 >
//                   Cancel
//                 </SoftButton>
//               </SoftBox>
//             </form>
//           </Card>
//         </SoftBox>
//       </SoftBox>
//     </DashboardLayout>
//   );
// }

// export default AddJob;
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "slices/jobSlice";
import { toast } from "react-toastify";
import { textFieldStyles } from "assets/textFieldStyles";
import { InputLabel } from "@mui/material";
import SoftButton from "components/SoftButton";
import { dropdownStyles } from "assets/textFieldStyles";
import { inputLabelStyle } from "assets/textFieldStyles";
import { dropdownIconStyle } from "assets/textFieldStyles";
// import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

import Box from '@mui/material/Box';
import { FloatingTextarea } from "assets/FloatingTextarea";


// function AddJob() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isLoading = useSelector((state) => state.jobs.loading);
//   const titleRef = useRef();
//   const descriptionRef = useRef();
//   const locationRef = useRef();
//   const postingDateRef = useRef();
//   const statusRef = useRef();

//   const [job, setJob] = useState({
//     title: "",
//     description: "",
//     location: "", // Added location field
//     postingDate: "",
//     status: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setJob((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // User-friendly field names for error messages
//     const fieldLabels = {
//       title: "Job Title",
//       description: "Job Description",
//       location: "Location",
//       postingDate: "Posting Date",
//       status: "Status",
//     };

//     for (let field in fieldLabels) {
//       const value = job[field]?.trim?.() ?? job[field];
//       if (!value) {
//         toast.error(`Please fill in the ${fieldLabels[field]}.`);
//         return;
//       }
//     }

//     // Submit if everything's filled
//     try {
//       await dispatch(createJob({ jobData: job }));
//       toast.success("Job added successfully! 🚀");
//       navigate("/jobs");
//     } catch (error) {
//       console.error("Failed to create job:", error);
//       toast.error("Error creating job. Please try again.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <DashboardLayout>
//         <DashboardNavbar />
//         <SoftBox py={3} textAlign="center">
//           <SoftTypography variant="h6">Loading job details...</SoftTypography>
//         </SoftBox>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <SoftBox py={3}>
//         <SoftBox mb={3}>
//           <Card sx={{ p: 3 }}>
//             <SoftTypography variant="h5" mb={3} textAlign="center">
//               Add Job Details
//             </SoftTypography>
//             <form onSubmit={handleSubmit}>
//               {/* Row 1: title, description, Location */}
//               <SoftBox
//                 mb={3}
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns: {
//                     xs: "1fr",
//                     sm: "1fr 1fr",
//                     md: "1fr 1fr"
//                   },
//                   gap: 3,
//                   alignItems: "flex-start"
//                 }}
//               >
//                 <TextField
//                   inputRef={titleRef}
//                   label="Title"
//                   name="title"
//                   value={job.title}
//                   onChange={handleChange}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       descriptionRef.current?.focus();
//                     }
//                   }}
//                   placeholder="Enter Job Title"
//                   sx={textFieldStyles}
//                   InputLabelProps={{
//                     sx: { ...inputLabelStyle },
//                   }}
//                 />

//                 {/* <TextField
//                   inputRef={descriptionRef}
//                   label="Description"
//                   name="description"
//                   value={job.description}
//                   onChange={handleChange}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       locationRef.current?.focus();
//                     }
//                   }}
//                   placeholder="Enter job description"
//                   InputLabelProps={{
//                     sx: { ...inputLabelStyle },
//                   }}
//                   sx={textFieldStyles}
//                 /> */}

//                 <TextField
//                   inputRef={locationRef}
//                   label="Location"
//                   name="location"
//                   value={job.location}
//                   onChange={handleChange}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       postingDateRef.current?.focus();
//                     }
//                   }}
//                   placeholder="Enter location"
//                   InputLabelProps={{
//                     sx: { ...inputLabelStyle },
//                   }}
//                   sx={textFieldStyles}
//                 />
//               </SoftBox>
//               {/* description row*/}

//               <SoftBox
//                 mb={3}
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns: {
//                     xs: "1fr",
//                     sm: "1fr",
//                     md: "1fr"
//                   },
//                   gap: 3,
//                   alignItems: "flex-start"
//                 }}
//               >


//                 <TextField
//                   inputRef={descriptionRef}
//                   label="Description"
//                   name="description"
//                   value={job.description}
//                   onChange={handleChange}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       locationRef.current?.focus();
//                     }
//                   }}
//                   placeholder="Enter job description"
//                   InputLabelProps={{
//                     sx: { ...inputLabelStyle },
//                   }}
//                   sx={textFieldStyles}
//                 />


//               </SoftBox>

//               {/* Second Row */}
//               <SoftBox
//                 mb={3}
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns: {
//                     xs: "1fr",
//                     sm: "1fr 1fr",
//                     md: "1fr 1fr"
//                   },
//                   gap: 3,
//                   alignItems: "flex-start"
//                 }}
//               >

//                 <TextField
//                   inputRef={postingDateRef}
//                   label="Posting Date"
//                   name="postingDate"
//                   value={job.postingDate}
//                   onChange={handleChange}
//                   type="date"
//                   fullWidth
//                   InputLabelProps={{
//                     shrink: true,
//                     sx: { fontSize: "1rem" },
//                   }}
//                   inputProps={{
//                     style: {
//                       paddingRight: "0.5rem", // ensures date icon doesn't get cut off
//                     },
//                   }}
//                   sx={{
//                     "& input": {
//                       fontSize: "1rem",
//                     },
//                     "& .MuiInputBase-root": {
//                       width: "100%",
//                     },

//                     // Don't add other layout-related custom styles that might mess with the input type="date"
//                   }}
//                 />


//                 <FormControl sx={{ ...dropdownStyles, position: "relative" }}>
//                   <InputLabel id="status-label" sx={{ ...inputLabelStyle }}>
//                     Select Status
//                   </InputLabel>
//                   <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>

//                     <Select
//                       name="status"
//                       value={job.status || ""}
//                       inputRef={statusRef}
//                       onChange={handleChange}
//                       label="Select Status"
//                       sx={{
//                         width: "100%", // Ensures full width
//                         paddingRight: "40px", // Creates space for the icon
//                       }}
//                     >
//                       {['Open', 'Closed'].map((status) => (
//                         <MenuItem key={status} value={status}>{status}</MenuItem>
//                       ))}
//                     </Select>
//                     <ArrowDropDownCircleIcon
//                       sx={{
//                         ...dropdownIconStyle
//                       }}
//                     />
//                   </Box>
//                 </FormControl>
//               </SoftBox>

//               {/* Buttons */}
//               <SoftBox
//                 mt={3}
//                 display="flex"
//                 justifyContent="space-between"
//                 flexDirection={{ xs: "column", sm: "row" }}
//                 gap={2}
//               >
//                 <SoftButton
//                   type="submit"
//                   variant="gradient"
//                   color="info"
//                   sx={{
//                     width: { xs: '100%', sm: 'auto' },
//                     px: 3,
//                   }}
//                 >
//                   Add Job
//                 </SoftButton>

//                 <SoftButton
//                   variant="gradient"
//                   color="error"
//                   onClick={() => navigate("/jobs")}
//                   sx={{
//                     width: { xs: '100%', sm: 'auto' },
//                     px: 3,
//                   }}
//                 >
//                   Cancel
//                 </SoftButton>
//               </SoftBox>
//             </form>
//           </Card>
//         </SoftBox>
//       </SoftBox>
//     </DashboardLayout>
//   );
// }
function AddJob() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.jobs.loading);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const locationRef = useRef();
  const postingDateRef = useRef();
  const statusRef = useRef();
  const [openDropdown, setOpenDropdown] = useState(false);

  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "", // Added location field
    postingDate: "",
    status: "Open",
  });

  // State for character count
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
    setOpenDropdown(false);
    // Update character count for description
    if (name === "description") {
      setCharCount(value.length);
    }

  };

  // TextArea styles
  const textAreaStyles = {
    width: "100%",
    minHeight: 100,
    maxHeight: 300,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#c6c6c6",
    borderRadius: "8px",
    overflow: "auto",
    resize: "vertical",
    padding: "10px",
    fontFamily: "inherit",
    fontSize: "1rem",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",

  };

  // Character counter styles
  const counterContainer = {
    marginTop: "4px",
    width: "100%",
    backgroundColor: "#ddd",
    height: "15px",
    borderRadius: "4px",
    overflow: "hidden"
  };

  const counterFill = (percent) => ({
    width: `${percent}%`,
    height: "15px",
    backgroundColor: percent < 65 ? "#508003" : percent < 90 ? "#ff6600" : "red"
  });

  // const counterText = {
  //   width: "max-content",
  //   height: "15px",
  //   lineHeight: "15px",
  //   color: "#eee",
  //   float: "left",
  //   paddingLeft: "10px",
  //   fontSize: "13px"
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // User-friendly field names for error messages
    const fieldLabels = {
      title: "Job Title",
      description: "Job Description",
      location: "Location",
      postingDate: "Posting Date",
      // status: "Status",
    };

    for (let field in fieldLabels) {
      const value = job[field]?.trim?.() ?? job[field];
      if (!value) {
        toast.error(`Please fill in the ${fieldLabels[field]}.`);
        return;
      }
    }

    // Submit if everything's filled
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
      </DashboardLayout>
    );
  }
  const handleIconClick = () => {
    setOpenDropdown(true); // Opens the Select dropdown
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card sx={{ p: 3 }}>
            <SoftTypography variant="h5" mb={3} textAlign="center">
              Add Job Details
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
                      value={job.status}
                      inputRef={statusRef}
                      onChange={handleChange}
                      label="Select Status"
                      sx={{
                        width: "100%", // Ensures full width
                        paddingRight: "40px", // Creates space for the icon
                      }}
                      open={openDropdown}
                      onClose={() => setOpenDropdown(false)}
                      onOpen={() => setOpenDropdown(true)}
                    >
                      {['Open', 'Closed', 'Paused'].map((status) => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                      ))}
                    </Select>
                    <ArrowDropDownCircleIcon
                      sx={{
                        ...dropdownIconStyle
                      }}
                      onClick={handleIconClick}
                    />
                  </Box>
                </FormControl>
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
                    id={"job"}
                    name={"description"}
                    descriptionRef={descriptionRef}
                    value={job.description}
                    onChange={handleChange}
                    placeholder="Enter job description"
                    onEnter={() => locationRef.current?.focus()}
                    label={"Description"}
                  />
                </SoftBox>

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
                  Add Job
                </SoftButton>


              </SoftBox>
            </form>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}
export default AddJob;
