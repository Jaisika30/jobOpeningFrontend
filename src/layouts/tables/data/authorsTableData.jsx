import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, deleteJob } from "slices/jobSlice";
import Swal from "sweetalert2";
import { Button, Input, Select, MenuItem, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";

const useJobData = () => {
  const [jobData, setJobData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const isLoading = useSelector((state) => state.jobs.loading);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  useEffect(() => {
    let filteredJobs = jobs || [];

    if (searchQuery.trim()) {
      filteredJobs = filteredJobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter.trim()) {
      filteredJobs = filteredJobs.filter((job) => job.status?.trim().toLowerCase() === statusFilter.trim().toLowerCase());
    }

    setJobData(filteredJobs);
  }, [jobs, searchQuery, statusFilter]);

  return { jobData, loading: isLoading, setSearchQuery, setStatusFilter, searchQuery, statusFilter, dispatch };
};

// const JobTableUI = () => {
//   const { jobData, loading, setSearchQuery, setStatusFilter, searchQuery, statusFilter, dispatch, handleDelete } = useJobData();

//   console.log(typeof (handleDelete));
//   return (
//     <>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px", alignItems: "center", justifyContent: "space-between" }}>
//         <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//           <Input
//             type="text"
//             placeholder="Search by Job Title"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             style={{ backgroundColor: "#e6f7ff", color: "#000", padding: "10px", maxWidth: "400px", borderRadius: "5px", border: "1px solid #2196f3" }}
//           />
//           <Select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             displayEmpty
//             style={{ backgroundColor: "#ffefdb", color: "#000", padding: "10px", maxWidth: "200px", borderRadius: "5px", border: "1px solid #ff9800" }}
//           >
//             <MenuItem value="">All Status</MenuItem>
//             <MenuItem value="open">Open</MenuItem>
//             <MenuItem value="closed">Closed</MenuItem>
//           </Select>
//         </div>
//         <Button style={{ backgroundColor: "#4caf50", color: "#fff", padding: "10px 15px", borderRadius: "5px", fontWeight: "bold", display: "flex" }}>
//           Add Job
//         </Button>
//       </div>

//       {loading ? <p>Loading jobs...</p> : <JobTable jobData={jobData} handleDelete={handleDelete} />}
//     </>
//   );
// };

// const JobTable = ({ jobData, handleDelete }) => {
//   const tableData = getJobTableData(jobData, handleDelete = { handleDelete });

//   return (
//     <table border="1" style={{ width: "100%", textAlign: "left", backgroundColor: "#fff", borderCollapse: "collapse" }}>
//       <thead>
//         <tr style={{ backgroundColor: "#4682b4", color: "#fff" }}>
//           {tableData.columns.map((col) => (
//             <th key={col.name} style={{ padding: "10px" }}>{col.label}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {tableData.rows.map((row, index) => (
//           <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
//             {tableData.columns.map((col) => (
//               <td key={col.name} style={{ padding: "10px" }}>{row[col.name]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

const getJobTableData = (jobData, handleDelete) => ({
  columns: [
    { name: "jobTitle", label: "Job Title", align: "left" },
    { name: "description", label: "Description", align: "left" },
    { name: "postingDate", label: "Posting Date", align: "center" },
    { name: "status", label: "Status", align: "center" },
    { name: "action", label: "Actions", align: "center" },
  ],
  rows: jobData.map((job) => ({
    jobTitle: <SoftTypography variant="button" fontWeight="medium" color="primary" component={Link} to={`/Candidates/${job._id}`}>{job.title}</SoftTypography>,
    description: <SoftTypography variant="caption" color="secondary">{job.description}</SoftTypography>,
    postingDate: <SoftTypography variant="caption" color="secondary" fontWeight="medium">{new Date(job.postingDate).toLocaleDateString("en-GB")}</SoftTypography>,
    status: <SoftBadge variant="gradient" badgeContent={job.status} color={job.status === "Open" ? "success" : "secondary"} size="xs" container />,
    action: (
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <Link to={`/viewJob/${job._id}`} title="View"><IconButton color="primary"><VisibilityIcon sx={{ color: "blue" }} /></IconButton></Link>
        <Link to={`/editJob/${job._id}`} title="Edit"><IconButton color="success"><EditIcon /></IconButton></Link>
        <IconButton color="error" title="Delete" onClick={() => handleDelete(job._id)}><DeleteIcon /></IconButton>
        <Link to={`/Candidates/${job._id}`} title="Candidates"><IconButton color="primary"><GroupIcon fontSize="large" /></IconButton></Link>
      </div>
    ),
  })),
});

export { useJobData, getJobTableData };