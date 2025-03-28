

// // import SoftTypography from "components/SoftTypography";
// // import SoftBadge from "components/SoftBadge";
// // import { Link } from "react-router-dom";


// //  Sample job data
// // const jobData = [
// //   {
// //     id: 1,
// //     title: "Frontend Developer",
// //     description: "Responsible for creating user interfaces and experiences.",
// //     postingDate: "2025-01-15",
// //     status: "Open",
// //     department: "Engineering",
// //     location: "San Francisco",
// //   },
// //   {
// //     id: 2,
// //     title: "Backend Developer",
// //     description: "Focuses on server-side logic and database management.",
// //     postingDate: "2025-02-01",
// //     status: "Closed",
// //     department: "Engineering",
// //     location: "New York",
// //   },
// //   {
// //     id: 3,
// //     title: "Product Manager",
// //     description: "Oversees product lifecycle and strategy.",
// //     postingDate: "2025-01-20",
// //     status: "Open",
// //     department: "Product Management",
// //     location: "Seattle",
// //   }
// // ];

// // //  Define table structure
// // const authorsTableData = {

// //   columns: [
// //     { name: "jobTitle", label: "Job Title", align: "left" },
// //     { name: "description", label: "Description", align: "left" },
// //     { name: "postingDate", label: "Posting Date", align: "center" },
// //     { name: "status", label: "Status", align: "center" },
// //     { name: "action", label: "Action", align: "center" },
// //   ],

// //   // Dynamically generate rows from jobData
// //   rows: jobData.map((job) => ({
// //     jobTitle: (
// //       <SoftTypography
// //         variant="button"
// //         fontWeight="medium"
// //         color="primary"
// //         component={Link}
// //         to={`/Candidates/${job.id}`} 
// //       >
// //         {job.title}
// //       </SoftTypography>
// //     ),
// //     description: (
// //       <SoftTypography variant="caption" color="secondary">
// //         {job.description}
// //       </SoftTypography>
// //     ),
// //     postingDate: (
// //       <SoftTypography variant="caption" color="secondary" fontWeight="medium">
// //         {job.postingDate}
// //       </SoftTypography>
// //     ),
// //     status: (
// //       <SoftBadge
// //         variant="gradient"
// //         badgeContent={job.status}
// //         color={job.status === "Open" ? "success" : "secondary"}
// //         size="xs"
// //         container
// //       />
// //     ),
// //     action: (
// //       <SoftTypography
// //         component="a"
// //         href="#"
// //         variant="caption"
// //         color="secondary"
// //         fontWeight="medium"
// //       >
// //         Edit
// //       </SoftTypography>
// //     ),
// //   })),
// // };

// // export default authorsTableData;


// // import { useEffect } from "react";
// // import SoftTypography from "components/SoftTypography";
// // import SoftBadge from "components/SoftBadge";
// // import { Link } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getJobs } from "slices/jobSlice";

// // const authorsTableData = () => {
// //   const dispatch = useDispatch();
// //   const jobs = useSelector((state) => state.jobs.data); // Get job data from Redux state
// //   const loading = useSelector((state) => state.jobs.loading);

// //   useEffect(() => {
// //     console.log("hiii honey");
// //     const getJobs = async () => {

// //       const response = await axios.get(`${API_URL}/jobs/getJobs`, {
// //         headers: {
// //           Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTE0M2FkYTllZjhhZjhjODM5ZDc5NCIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc0Mjk2Mzc5OCwiZXhwIjoxNzQzMDUwMTk4fQ.Tn6IqwPoSkrVYOWMqD0d14SuUHvfme3fAkvD4xclq1Y', // Attach token in headers
// //         },
// //       });
// //       console.log(response);
// //     }
// //     getJobs();
// //     // dispatch(getJobs()); // Fetch jobs when the component mounts
// //   }, [dispatch]);

// //   const columns = [
// //     { name: "jobTitle", label: "Job Title", align: "left" },
// //     { name: "description", label: "Description", align: "left" },
// //     { name: "postingDate", label: "Posting Date", align: "center" },
// //     { name: "status", label: "Status", align: "center" },
// //     { name: "action", label: "Action", align: "center" },
// //   ];

// //   const rows = jobs.map((job) => ({
// //     jobTitle: (
// //       <SoftTypography
// //         variant="button"
// //         fontWeight="medium"
// //         color="primary"
// //         component={Link}
// //         to={`/Candidates/${job.id}`}
// //       >
// //         {job.title}
// //       </SoftTypography>
// //     ),
// //     description: (
// //       <SoftTypography variant="caption" color="secondary">
// //         {job.description}
// //       </SoftTypography>
// //     ),
// //     postingDate: (
// //       <SoftTypography variant="caption" color="secondary" fontWeight="medium">
// //         {job.postingDate}
// //       </SoftTypography>
// //     ),
// //     status: (
// //       <SoftBadge
// //         variant="gradient"
// //         badgeContent={job.status}
// //         color={job.status === "Open" ? "success" : "secondary"}
// //         size="xs"
// //         container
// //       />
// //     ),
// //     action: (
// //       <SoftTypography
// //         component="a"
// //         href="#"
// //         variant="caption"
// //         color="secondary"
// //         fontWeight="medium"
// //       >
// //         Edit
// //       </SoftTypography>
// //     ),
// //   }));

// //   return { columns, rows };
// // };

// // export default authorsTableData;
// import React from 'react';

// import { useEffect, useState } from "react";
// import SoftTypography from "components/SoftTypography";
// import SoftBadge from "components/SoftBadge";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { getJobs } from "slices/jobSlice";
// import { FaEdit } from "react-icons/fa";
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
//     { name: "action", label: "Action", align: "center" },
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
//       <SoftTypography
//         component="a"
//         href="#"
//         variant="caption"
//         color="secondary"
//         fontWeight="medium"
//       >
//        <FaEdit/>
//       </SoftTypography>
      
      
//     ),
//   })),
// });

// export { useJobData, getJobTableData };

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "slices/jobSlice";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

const useJobData = () => {
  const [jobData, setJobData] = useState([]);
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs); // Redux state
  const isLoading = useSelector((state) => state.jobs.loading);

  // Fetch jobs when the component mounts
  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  // Update jobData when jobs change
  useEffect(() => {
    if (jobs.length > 0) {
      setJobData(jobs);
    }
  }, [jobs]);

  return { jobData, loading: isLoading };
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
        {new Date(job.postingDate).toLocaleDateString()} {/* Format date */}
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
        {/* View Icon */}
        <Link to={`/job-details/${job._id}`} title="View">
          <FaEye color="blue" style={{ cursor: "pointer" }} />
        </Link>

        {/* Edit Icon */}
        <Link to={`/editJob/${job._id}`} title="Edit">
          <FaEdit color="green" style={{ cursor: "pointer" }} />
        </Link>

        {/* Delete Icon */}
        <FaTrash
          color="red"
          style={{ cursor: "pointer" }}
          title="Delete"
          onClick={() => handleDelete(job._id)}
        />
         <Link to={`/Candidates/${job._id}`} title="Candidates">
          <FaUsers color="blue" style={{ cursor: "pointer" , fontSize:"28px" }} />
        </Link>
        
      </div>
    ),
  })),
});

// Delete function (implement actual API call in your component)
const handleDelete = (jobId) => {
  if (window.confirm("Are you sure you want to delete this job?")) {
    console.log(`Job ${jobId} deleted!`); // Replace with API call
  }
};

export { useJobData, getJobTableData };



