
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";
// import SoftBadge from "components/SoftBadge";
// import { useState } from "react";
// // const [filterStatus, setFilterStatus] = useState("");
// const candidatesData = [
//   {
//     id: 1,
//     name: "John Doe",
//     location: "New York",
//     timeOffered: "Full-time",
//     interviewSchedule: "2025-04-10 10:00 AM",
//     communicationRate: "Excellent",
//     personality: "Confident",
//     knowledge: "Expert",
//     status: "Shortlisted",
//     interviewStatus: "Rescheduled"
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     location: "San Francisco",
//     timeOffered: "Part-time",
//     interviewSchedule: "2025-04-12 02:00 PM",
//     communicationRate: "Good",
//     personality: "Friendly",
//     knowledge: "Intermediate",
//     status: "Pending",
//     interviewStatus: "Interviewed"
//   },
//   {
//     id: 3,
//     name: "Michael Johnson",
//     location: "Los Angeles",
//     timeOffered: "Contract",
//     interviewSchedule: "2025-04-15 09:30 AM",
//     communicationRate: "Average",
//     personality: "Calm",
//     knowledge: "Beginner",
//     status: "Rejected",
//     interviewStatus: "Missed"
//   },
//   {
//     id: 4,
//     name: "Emily Davis",
//     location: "Seattle",
//     timeOffered: "Internship",
//     interviewSchedule: "2025-04-18 01:00 PM",
//     communicationRate: "Excellent",
//     personality: "Energetic",
//     knowledge: "Advanced",
//     status: "Hired",
//     interviewStatus: "Accepted"
//   },
//   {
//     id: 5,
//     name: "Robert Brown",
//     location: "Chicago",
//     timeOffered: "Full-time",
//     interviewSchedule: "2025-04-20 11:45 AM",
//     communicationRate: "Good",
//     personality: "Analytical",
//     knowledge: "Expert",
//     status: "Shortlisted",
//     interviewStatus: "Offered"
//   },
// ];
// const filteredCandidates = candidatesData.filter((candidate) => {
//   return (
//     (candidate.name.toLowerCase().includes(search.toLowerCase()) ||
//       candidate.location.toLowerCase().includes(search.toLowerCase()) ||
//       candidate.timeOffered.toLowerCase().includes(search.toLowerCase()) ||
//       candidate.communicationRate.toLowerCase().includes(search.toLowerCase()) ||
//       candidate.personality.toLowerCase().includes(search.toLowerCase()) ||
//       candidate.knowledge.toLowerCase().includes(search.toLowerCase()) ||
//       candidate.interviewStatus.toLowerCase().includes(search.toLowerCase()) ||
//       candidate.status.toLowerCase().includes(search.toLowerCase())) &&
//     (filterStatus ? candidate.status === filterStatus : true)
//   );
// });

// const candidatesTableData = {
//   columns: [
//     { name: "name", label: "Name", align: "left" },
//     { name: "location", label: "Location", align: "left" },
//     { name: "timeOffered", label: "Time Offered", align: "center" },
//     { name: "interviewSchedule", label: "Interview Schedule", align: "center" },
//     { name: "communicationRate", label: "Communication Rate", align: "center" },
//     { name: "personality", label: "Personality", align: "center" },
//     { name: "knowledge", label: "Knowledge", align: "center" },
//     { name: "interviewStatus", label: "Interview Status", align: "center" },
//     { name: "status", label: "Status", align: "center" },
//     { name: "action", label: "Action", align: "center" },
//   ],

//   rows: candidatesData.map((candidate) => ({
//     name: (
//       <SoftTypography variant="button" fontWeight="medium" color="dark">
//         {candidate.name}
//       </SoftTypography>
//     ),
//     location: (
//       <SoftTypography variant="caption" color="secondary">
//         {candidate.location}
//       </SoftTypography>
//     ),
//     timeOffered: (
//       <SoftTypography variant="caption" color="secondary">
//         {candidate.timeOffered}
//       </SoftTypography>
//     ),
//     interviewSchedule: (
//       <SoftTypography variant="caption" color="secondary">
//         {candidate.interviewSchedule}
//       </SoftTypography>
//     ),
//     communicationRate: (
//       <SoftTypography variant="caption" color="secondary">
//         {candidate.communicationRate}
//       </SoftTypography>
//     ),
//     personality: (
//       <SoftTypography variant="caption" color="secondary">
//         {candidate.personality}
//       </SoftTypography>
//     ),
//     knowledge: (
//       <SoftTypography variant="caption" color="secondary">
//         {candidate.knowledge}
//       </SoftTypography>
//     ),
//     interviewStatus: (
//       <SoftBadge
//         variant="gradient"
//         badgeContent={candidate.interviewStatus}
//         color={
//           candidate.interviewStatus === "Accepted"
//             ? "success"
//             : candidate.interviewStatus === "Interviewed"
//             ? "info"
//             : candidate.interviewStatus === "Rescheduled"
//             ? "warning"
//             : candidate.interviewStatus === "Offered"
//             ? "primary"
//             : "secondary"
//         }
//         size="xs"
//         container
//       />
//     ),
//     status: (
//       <SoftBadge
//         variant="gradient"
//         badgeContent={candidate.status}
//         color={
//           candidate.status === "Hired"
//             ? "success"
//             : candidate.status === "Shortlisted"
//             ? "info"
//             : candidate.status === "Pending"
//             ? "warning"
//             : "secondary"
//         }
//         size="xs"
//         container
//       />
//     ),
//     action: (
//       <SoftTypography
//         component="a"
//         href="#"
//         variant="caption"
//         color="secondary"
//         fontWeight="medium"
//       >
//         Edit
//       </SoftTypography>
//     ),
//   })),
// };

// export default candidatesTableData;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import { getCandidates } from "slices/candidateSlice";
import { Button, Modal, TextField } from "@mui/material";



// Custom hook to fetch and filter candidate data
// const useCandidateData = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams(); // Get ID from URL params
//   const candidates = useSelector((state) => state.candidates.candidates);
//   const isLoading = useSelector((state) => state.candidates.loading);
//   const [filteredCandidates, setFilteredCandidates] = useState([]);
//   console.log(candidates);

//   console.log(id)
//   useEffect(() => {
//     dispatch(getCandidates(id)); // Fetch all candidates
//   }, [dispatch]);

//   // useEffect(() => {
//   //   if (candidates.length > 0) {
//   //     console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyy")
//   //     console.log("candidates filtering",candidates)
//   //     setFilteredCandidates(id ? candidates.filter((c) => c._id === id) : candidates);
//   //     console.log("filteredCandidates::::::",filteredCandidates);
//   //   }
//   // }, [candidates, id]);

//   useEffect(() => {
//     if (candidates.length > 0) {
//       console.log("Candidates received:", candidates);

//       // Show all candidates if id is undefined, null, or ":id"
//       if (!id || id === ":id") {
//         setFilteredCandidates(candidates);
//       } else {
//         setFilteredCandidates(candidates.filter((c) => c.job._id === id));
//       }

//       console.log("Filtered Candidates:", filteredCandidates);
//     }
//   }, [candidates, id]);


//   return { candidates: filteredCandidates, loading: isLoading };
// };

// // Function to structure candidate table data
// const getCandidatesTableData = () => {
//   const { candidates, loading } = useCandidateData(); // Fetch data
//   const dispatch = useDispatch(); 
//   const [open, setOpen] = useState(false);
//   const [newCandidate, setNewCandidate] = useState({ name: "", location: "", timeOffered: "" });

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleChange = (e) => {
//     setNewCandidate({ ...newCandidate, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     await dispatch(addCandidate(newCandidate));
//     dispatch(getCandidates());
//     handleClose();
//   };
//   if (loading) return { columns: [], rows: [] }; // Prevent rendering empty rows

//   return {
//     topAction: (
//       <Button variant="contained" color="primary" onClick={handleOpen}>
//         Add Candidate
//       </Button>
//     ),
//     columns: [
//       { name: "name", label: "Name", align: "left" },
//       { name: "location", label: "Location", align: "left" },
//       { name: "timeOffered", label: "Time Offered", align: "center" },
//       { name: "interviewSchedule", label: "Interview Schedule", align: "center" },
//       { name: "communicationRate", label: "Communication Rate", align: "center" },
//       { name: "personality", label: "Personality", align: "center" },
//       { name: "knowledge", label: "Knowledge", align: "center" },
//       { name: "interviewStatus", label: "Interview Status", align: "center" },
//       { name: "status", label: "Status", align: "center" },
//       { name: "action", label: "Action", align: "center" },
//     ],

    // rows: candidates.map((candidate) => ({
    //   name: <SoftTypography variant="button" fontWeight="medium" color="dark">{candidate.name}</SoftTypography>,
    //   location: <SoftTypography variant="caption" color="secondary">{candidate.location}</SoftTypography>,
    //   timeOffered: <SoftTypography variant="caption" color="secondary">{candidate.timeOffered}</SoftTypography>,
    //   interviewSchedule: <SoftTypography variant="caption" color="secondary">{candidate.interviewSchedule}</SoftTypography>,
    //   communicationRate: <SoftTypography variant="caption" color="secondary">{candidate.communicationRate}</SoftTypography>,
    //   personality: <SoftTypography variant="caption" color="secondary">{candidate.personality}</SoftTypography>,
    //   knowledge: <SoftTypography variant="caption" color="secondary">{candidate.knowledge}</SoftTypography>,
    //   interviewStatus: (
    //     <SoftBadge
    //       variant="gradient"
    //       badgeContent={candidate.interviewStatus}
    //       color={
    //         candidate.interviewStatus === "Accepted" ? "success" :
    //           candidate.interviewStatus === "Interviewed" ? "info" :
    //             candidate.interviewStatus === "Rescheduled" ? "warning" :
    //               candidate.interviewStatus === "Offered" ? "primary" : "secondary"
    //       }
    //       size="xs"
    //       container
    //     />
    //   ),
    //   status: (
    //     <SoftBadge
    //       variant="gradient"
    //       badgeContent={candidate.status}
    //       color={
    //         candidate.status === "Hired" ? "success" :
    //           candidate.status === "Shortlisted" ? "info" :
    //             candidate.status === "Pending" ? "warning" : "secondary"
    //       }
    //       size="xs"
    //       container
    //     />
    //   ),
    //   action: (
    //     <SoftTypography component="a" href="#" variant="caption" color="secondary" fontWeight="medium">
    //       Edit
    //     </SoftTypography>
    //   ),
    
    // })),
//     modal: (
//       <Modal open={open} onClose={handleClose}>
//         <div style={{ padding: 20, background: "white", margin: "10% auto", width: 300 }}>
//           <h3>Add Candidate</h3>
//           <TextField fullWidth label="Name" name="name" onChange={handleChange} margin="normal" />
//           <TextField fullWidth label="Location" name="location" onChange={handleChange} margin="normal" />
//           <TextField fullWidth label="Time Offered" name="timeOffered" onChange={handleChange} margin="normal" />
//           <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>Submit</Button>
//         </div>
//       </Modal>
//     ),
//   };
// };

// export default getCandidatesTableData;

const useCandidateData = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const candidates = useSelector((state) => state.candidates.candidates);
  const isLoading = useSelector((state) => state.candidates.loading);
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  useEffect(() => {
    dispatch(getCandidates(id)); 
  }, [dispatch, id]); // <-- Ensure id is a dependency

  useEffect(() => {
    if (candidates.length > 0) {
      setFilteredCandidates(!id || id === ":id" ? candidates : candidates.filter((c) => c.job._id === id));
    }
  }, [candidates, id]);

  useEffect(() => {
    console.log("Updated Filtered Candidates:", filteredCandidates);
  }, [filteredCandidates]); // Log only after state update

  return { candidates: filteredCandidates, loading: isLoading };
};

const getCandidatesTableData = (handleOpen) => {
  const { candidates, loading } = useCandidateData();
  const dispatch = useDispatch();
  
  if (loading) return { columns: [], rows: [] };

  return {
    topAction: (
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Candidate
      </Button>
    ),
    columns: [
            { name: "name", label: "Name", align: "left" },
            { name: "location", label: "Location", align: "left" },
            { name: "timeOffered", label: "Time Offered", align: "center" },
            { name: "interviewSchedule", label: "Interview Schedule", align: "center" },
            { name: "communicationRate", label: "Communication Rate", align: "center" },
            { name: "personality", label: "Personality", align: "center" },
            { name: "knowledge", label: "Knowledge", align: "center" },
            { name: "interviewStatus", label: "Interview Status", align: "center" },
            { name: "status", label: "Status", align: "center" },
            { name: "action", label: "Action", align: "center" },
          ],
          rows: candidates.map((candidate) => ({
            name: <SoftTypography variant="button" fontWeight="medium" color="dark">{candidate.name}</SoftTypography>,
            location: <SoftTypography variant="caption" color="secondary">{candidate.location}</SoftTypography>,
            timeOffered: <SoftTypography variant="caption" color="secondary">{candidate.timeOffered}</SoftTypography>,
            interviewSchedule: <SoftTypography variant="caption" color="secondary">{candidate.interviewSchedule}</SoftTypography>,
            communicationRate: <SoftTypography variant="caption" color="secondary">{candidate.communicationRate}</SoftTypography>,
            personality: <SoftTypography variant="caption" color="secondary">{candidate.personality}</SoftTypography>,
            knowledge: <SoftTypography variant="caption" color="secondary">{candidate.knowledge}</SoftTypography>,
            interviewStatus: (
              <SoftBadge
                variant="gradient"
                badgeContent={candidate.interviewStatus}
                color={
                  candidate.interviewStatus === "Accepted" ? "success" :
                    candidate.interviewStatus === "Interviewed" ? "info" :
                      candidate.interviewStatus === "Rescheduled" ? "warning" :
                        candidate.interviewStatus === "Offered" ? "primary" : "secondary"
                }
                size="xs"
                container
              />
            ),
            status: (
              <SoftBadge
                variant="gradient"
                badgeContent={candidate.status}
                color={
                  candidate.status === "Hired" ? "success" :
                    candidate.status === "Shortlisted" ? "info" :
                      candidate.status === "Pending" ? "warning" : "secondary"
                }
                size="xs"
                container
              />
            ),
            action: (
              <SoftTypography component="a" href="#" variant="caption" color="secondary" fontWeight="medium">
                Edit
              </SoftTypography>
            ),
          
          })),
   
  };
};

export default getCandidatesTableData;
