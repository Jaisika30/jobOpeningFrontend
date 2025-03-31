

// import React, { useCallback, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getJobs, deleteJob } from "slices/jobSlice";
// import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
// import { FaUsers } from "react-icons/fa6";
// import { Input, Select, MenuItem } from "@mui/material";
// import SoftTypography from "components/SoftTypography";
// import SoftBadge from "components/SoftBadge";

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
//     let filteredJobs = jobs || [];

//     if (searchQuery.trim()) {
//       filteredJobs = filteredJobs.filter((job) =>
//         job.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (statusFilter) {
//       filteredJobs = filteredJobs.filter(
//         (job) => job.status?.trim().toLowerCase() === statusFilter.trim().toLowerCase()
//       );
//     }

//     setJobData(filteredJobs);
//   }, [jobs, searchQuery, statusFilter]);

//   const handleSearch = useCallback((query) => setSearchQuery(query), []);
//   const handleStatusChange = useCallback((status) => setStatusFilter(status), []);

//   return {
//     jobData,
//     loading: isLoading,
//     setSearchQuery: handleSearch,
//     setStatusFilter: handleStatusChange,
//     searchQuery,
//     statusFilter,
//   };
// };

// const handleDelete = (jobId, dispatch) => {
//   console.log("dispatch........", dispatch)
//   console.log("Deleting Jobbbbbbbbb: ", jobId);
//   dispatch(deleteJob(jobId));

// };


// const getJobTableData = (jobData , dispatch) => ({
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
//     description: <SoftTypography variant="caption" color="secondary">{job.description}</SoftTypography>,
//     postingDate: (
//       <SoftTypography variant="caption" color="secondary" fontWeight="medium">
//         {new Date(job.postingDate).toLocaleDateString("en-GB")}
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
//         <Link to={`/job-details/${job._id}`} title="View">
//           <FaEye color="blue" style={{ cursor: "pointer" }} />
//         </Link>
//         <Link to={`/editJob/${job._id}`} title="Edit">
//           <FaEdit color="green" style={{ cursor: "pointer" }} />
//         </Link>
//         <FaTrash
//           color="red"
//           style={{ cursor: "pointer" }}
//           title="Delete"
//           onClick={() => dispatch(deleteJob(job._id))}
//         />
//         <Link to={`/Candidates/${job._id}`} title="Candidates">
//           <FaUsers color="blue" style={{ cursor: "pointer", fontSize: "28px" }} />
//         </Link>
//       </div>
//     ),
//   })),
// });

// const JobTableUI = () => {
//   const dispatch = useDispatch(); // ✅ Use useDispatch() inside the component
//   const {
//     jobData,
//     loading,
//     setSearchQuery,
//     setStatusFilter,
//     searchQuery,
//     statusFilter,
//   } = useJobData();

//   return (
//     <div>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
//         <Input
//           type="text"
//           placeholder="Search by Job Title"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} displayEmpty>
//           <MenuItem value="">All Status</MenuItem>
//           <MenuItem value="open">Open</MenuItem>
//           <MenuItem value="closed">Closed</MenuItem>
//         </Select>
//       </div>
//       {loading ? (
//         <p>Loading jobs...</p>
//       ) : (
//         <table border="1">
//           <thead>
//             <tr>
//               {getJobTableData(jobData, dispatch).columns.map((col) => (
//                 <th key={col.name}>{col.label}</th>
//               ))}

//             </tr>
//           </thead>
//           <tbody>
//             {getJobTableData(jobData, dispatch).rows.map((row, index) => (
//               <tr key={index}>
//                 {getJobTableData(jobData, dispatch).columns.map((col) => (
//                   <td key={col.name}>{row[col.name]}</td>
//                 ))}
//               </tr>
//             ))}

//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export { useJobData, JobTableUI, getJobTableData };
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, deleteJob } from "slices/jobSlice";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { Input, Select, MenuItem } from "@mui/material";
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

    if (statusFilter) {
      filteredJobs = filteredJobs.filter(
        (job) => job.status?.trim().toLowerCase() === statusFilter.trim().toLowerCase()
      );
    }

    setJobData(filteredJobs);
  }, [jobs, searchQuery, statusFilter]);

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

const getJobTableData = (jobData, dispatch) => ({
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
    description: <SoftTypography variant="caption" color="secondary">{job.description}</SoftTypography>,
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
          onClick={() => dispatch(deleteJob(job._id))}
        />
        <Link to={`/Candidates/${job._id}`} title="Candidates">
          <FaUsers color="blue" style={{ cursor: "pointer", fontSize: "28px" }} />
        </Link>
      </div>
    ),
  })),
});

const JobTableUI = () => {
  const dispatch = useDispatch();
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
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
        <Input
          type="text"
          placeholder="Search by Job Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} displayEmpty>
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="open">Open</MenuItem>
          <MenuItem value="closed">Closed</MenuItem>
        </Select>
      </div>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              {getJobTableData(jobData, dispatch).columns.map((col) => (
                <th key={col.name}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getJobTableData(jobData, dispatch).rows.map((row, index) => (
              <tr key={index}>
                {getJobTableData(jobData, dispatch).columns.map((col) => (
                  <td key={col.name}>{row[col.name]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export { useJobData, JobTableUI, getJobTableData };