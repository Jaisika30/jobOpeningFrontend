

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import SoftTypography from "components/SoftTypography";
// import SoftBadge from "components/SoftBadge";
// import { useDispatch, useSelector } from "react-redux";
// import { getJobs } from "slices/jobSlice";
// import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
// import { FaUsers } from "react-icons/fa6";

// const useJobData = () => {
//   const [jobData, setJobData] = useState([]);
//   const dispatch = useDispatch();
//   const jobs = useSelector((state) => state.jobs.jobs); // Redux state
//   const isLoading = useSelector((state) => state.jobs.loading);

//   // Fetch jobs when the component mounts
//   useEffect(() => {
//     dispatch(getJobs());
//   }, [dispatch]);

//   // Update jobData when jobs change
//   useEffect(() => {
//     if (jobs.length > 0) {
//       setJobData(jobs);
//     }
//   }, [jobs]);

//   return { jobData, loading: isLoading };
// };

// const getJobTableData = (jobData) => ({
//   columns: [
//     { name: "jobTitle", label: "Job Title", align: "left" },
//     { name: "description", label: "Description", align: "left" },
//     { name: "postingDate", label: "Posting Date", align: "center" },
//     { name: "status", label: "Status", align: "center" },
//     { name: "action", label: "Actions", align: "center" },
//   ],

//   rows: jobData.map((job) => ({
//     jobTitle: (
//       <SoftTypography
//         variant="button"
//         fontWeight="medium"
//         color="primary"
//         component={Link}
//         to={`/Candidates/${job._id}`}
//       >
//         {job.title}
//       </SoftTypography>
//     ),
//     description: (
//       <SoftTypography variant="caption" color="secondary">
//         {job.description}
//       </SoftTypography>
//     ),
//     postingDate: (
//       <SoftTypography variant="caption" color="secondary" fontWeight="medium">
//         {new Date(job.postingDate).toLocaleDateString()} {/* Format date */}
//       </SoftTypography>
//     ),
//     status: (
//       <SoftBadge
//         variant="gradient"
//         badgeContent={job.status}
//         color={job.status === "Open" ? "success" : "secondary"}
//         size="xs"
//         container
//       />
//     ),
//     action: (
//       <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
//         {/* View Icon */}
//         <Link to={`/job-details/${job._id}`} title="View">
//           <FaEye color="blue" style={{ cursor: "pointer" }} />
//         </Link>

//         {/* Edit Icon */}
//         <Link to={`/editJob/${job._id}`} title="Edit">
//           <FaEdit color="green" style={{ cursor: "pointer" }} />
//         </Link>

//         {/* Delete Icon */}
//         <FaTrash
//           color="red"
//           style={{ cursor: "pointer" }}
//           title="Delete"
//           onClick={() => handleDelete(job._id)}
//         />
//          <Link to={`/Candidates/${job._id}`} title="Candidates">
//           <FaUsers color="blue" style={{ cursor: "pointer" , fontSize:"28px" }} />
//         </Link>

//       </div>
//     ),
//   })),
// });

// // Delete function (implement actual API call in your component)
// const handleDelete = (jobId) => {
//   if (window.confirm("Are you sure you want to delete this job?")) {
//     console.log(`Job ${jobId} deleted!`); // Replace with API call
//   }
// };

// export { useJobData, getJobTableData };


import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "slices/jobSlice";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { Input, Select, MenuItem } from "@mui/material";

// const useJobData = () => {
//   const [jobData, setJobData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const dispatch = useDispatch();
//   const jobs = useSelector((state) => state.jobs.jobs);
//   const isLoading = useSelector((state) => state.jobs.loading);

//   useEffect(() => {
//     dispatch(getJobs());
//   }, [dispatch]);

//   useEffect(() => {
//     let filteredJobs = jobs;

//     if (searchQuery) {
//       filteredJobs = filteredJobs.filter((job) =>
//         job.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (statusFilter) {
//       filteredJobs = filteredJobs.filter((job) => job.status === statusFilter);
//     }

//     setJobData(filteredJobs);
//   }, [jobs, searchQuery, statusFilter]);

//   return {
//     jobData,
//     loading: isLoading,
//     setSearchQuery,
//     setStatusFilter,
//     searchQuery,
//     statusFilter,
//   };
// };

const useJobData = () => {
  const [jobData, setJobData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const isLoading = useSelector((state) => state.jobs.loading);

  // Fetch jobs on component mount
  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  // Filtering jobs based on search & status
  useEffect(() => {
    let filteredJobs = jobs || [];

    if (searchQuery.trim()) {
      filteredJobs = filteredJobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // if (statusFilter) {
    //   console.log(":::::::::",filteredJobs);
    //   console.log(":statusFilter:",statusFilter);
    //     filteredJobs = filteredJobs.filter((job) => {
    //       console.log(job.status);
    //       return   job.status === statusFilter
    //     });
    //     console.log("filteredJobs::::",filteredJobs)
    // }
    if (statusFilter && statusFilter !== "") {
      filteredJobs = filteredJobs.filter((job) =>{
        console.log("job.status:::",job.status , "Status Filter:::", statusFilter)
       return job.status?.trim().toLowerCase() === statusFilter.trim().toLowerCase();
      });
    }

console.log("filtereddddddddddJobs:::::",filteredJobs)
    setJobData(filteredJobs);
  }, [jobs, searchQuery, statusFilter]);

  // Optimized state setters
  const handleSearch = useCallback((query) => setSearchQuery(query), []);
  const handleStatusChange = useCallback((status) => setStatusFilter(status), []);

  return {
    jobData,
    loading: isLoading,
    setSearchQuery: handleSearch,
    setStatusFilter: handleStatusChange,
    searchQuery,
    statusFilter,
  };
};

const JobTableUI = () => {
  const {
    jobData,
    loading,
    setSearchQuery,
    setStatusFilter,
    searchQuery,
    statusFilter,
  } = useJobData();

  return (
    <div>
      {/* Search and Filter Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <Input
          type="text"
          placeholder="Search by Job Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            backgroundColor: "#e6f7ff", // Light cyan background
            color: "#000", // Black text
            padding: "10px",
            width: "100%",
            maxWidth: "600px",
            borderRadius: "5px",
            border: "1px solid #2196f3", // Blue border
          }}
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          displayEmpty
          style={{
            backgroundColor: "#ffefdb", // Light orange background
            color: "#000", // Black text
            padding: "10px",
            width: "100%",
            maxWidth: "300px",
            borderRadius: "5px",
            border: "1px solid #ff9800", // Orange border
          }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="open">Open</MenuItem>
          <MenuItem value="closed">Closed</MenuItem>
        </Select>
      </div>

      {/* Table Display */}
      {loading ? <p>Loading jobs...</p> : <JobTable jobData={jobData} />}
    </div>
  );
};

const JobTable = ({ jobData }) => {
  const tableData = getJobTableData(jobData);
  return (
    <table
      border="1"
      style={{
        width: "100%",
        textAlign: "left",
        backgroundColor: "#fff", // White background
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#4682b4", color: "#fff" }}>
          {/* Blue headers */}
          {tableData.columns.map((col) => (
            <th key={col.name} style={{ padding: "10px" }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.rows.map((row, index) => (
          <tr
            key={index}
            style={{
              backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
            }}
          >
            {tableData.columns.map((col) => (
              <td key={col.name} style={{ padding: "10px" }}>
                {row[col.name]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const getJobTableData = (jobData) => ({
  columns: [
    { name: "jobTitle", label: "Job Title", align: "left" },
    { name: "description", label: "Description", align: "left" },
    { name: "postingDate", label: "Posting Date", align: "center" },
    { name: "status", label: "Status", align: "center" },
    { name: "action", label: "Actions", align: "center" },
  ],

  rows: jobData.map((job) => ({
    jobTitle: (
      <SoftTypography
        variant="button"
        fontWeight="medium"
        color="primary"
        component={Link}
        to={`/Candidates/${job._id}`}
      >
        {job.title}
      </SoftTypography>
    ),
    description: (
      <SoftTypography variant="caption" color="secondary">
        {job.description}
      </SoftTypography>
    ),
    postingDate: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {new Date(job.postingDate).toLocaleDateString("en-GB")}
      </SoftTypography>
    ),
    status: (
      <SoftBadge
        variant="gradient"
        badgeContent={job.status}
        color={job.status === "Open" ? "success" : "secondary"}
        size="xs"
        container
      />
    ),
    action: (
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <Link to={`/job-details/${job._id}`} title="View">
          <FaEye color="blue" style={{ cursor: "pointer" }} />
        </Link>
        <Link to={`/editJob/${job._id}`} title="Edit">
          <FaEdit color="green" style={{ cursor: "pointer" }} />
        </Link>
        <FaTrash
          color="red"
          style={{ cursor: "pointer" }}
          title="Delete"
          onClick={() => handleDelete(job._id)}
        />
        <Link to={`/Candidates/${job._id}`} title="Candidates">
          <FaUsers
            color="blue"
            style={{ cursor: "pointer", fontSize: "28px" }}
          />
        </Link>
      </div>
    ),
  })),
});

const handleDelete = (jobId) => {
  if (window.confirm("Are you sure you want to delete this job?")) {
    console.log(`Job ${jobId} deleted!`);
  }
};

export { useJobData, JobTableUI, getJobTableData };

