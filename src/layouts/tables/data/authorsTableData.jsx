// import React, { useEffect, useState, useMemo } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getJobs, deleteJob } from "slices/jobSlice";
// import Swal from "sweetalert2";
// import { Button, Input, Select, MenuItem, IconButton } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import GroupIcon from "@mui/icons-material/Group";
// import SoftTypography from "components/SoftTypography";
// import SoftBadge from "components/SoftBadge";
// import { useTheme } from '@mui/material/styles';
// import Tooltip from '@mui/material/Tooltip';

// import JobTableContainer from "layouts/scrollbar/tableContainer";
// import { tooltipStyle } from "assets/textFieldStyles";
// // const useJobData = () => {
// //   const [jobData, setJobData] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("");
// //   const dispatch = useDispatch();
// //   // const jobs = useSelector((state) => state.jobs.jobs.jobs);
// //   const isLoading = useSelector((state) => state.jobs.loading);
// //   const location = useLocation();
// //   const urlStatus = React.useMemo(() => {
// //     const searchParams = new URLSearchParams(location.search);
// //     return searchParams.get('status');
// //   }, [location.search]);
// //   console.log("urlStatusurlStatusurlStatus::::", urlStatus)

// //   const jobs = useSelector((state) => {
// //     if (urlStatus === 'Open') {
// //       console.log("With status - jobs data:", state.jobs.jobs?.openJobs);
// //       return state.jobs.jobs?.openJobs || [];
// //     } else {
// //       console.log("Without status - jobs data:", state.jobs.jobs?.jobs);
// //       return state.jobs.jobs?.jobs || [];
// //     }
// //   });
// //   useEffect(() => {
// //     dispatch(getJobs());
// //   }, [dispatch]);

// //   useEffect(() => {
// //     let filteredJobs = jobs || [];

// //     if (searchQuery.trim()) {
// //       filteredJobs = filteredJobs.filter((job) =>
// //         job.title.toLowerCase().includes(searchQuery.toLowerCase())
// //       );
// //     }

// //     if (statusFilter.trim()) {
// //       filteredJobs = filteredJobs.filter((job) => job.status?.trim().toLowerCase() === statusFilter.trim().toLowerCase());
// //     }

// //     setJobData(filteredJobs);
// //   }, [jobs, searchQuery, statusFilter]);

// //   return { jobData, loading: isLoading, setSearchQuery, setStatusFilter, searchQuery, statusFilter, dispatch };
// // };

// const useJobData = () => {
//   const [jobData, setJobData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const dispatch = useDispatch();
//   const isLoading = useSelector((state) => state.jobs.loading);
//   const location = useLocation();
//   const [page, setPage] = useState(1);
//   const limit = 3;

//   const urlStatus = React.useMemo(() => {
//     const searchParams = new URLSearchParams(location.search);
//     return searchParams.get('status');
//   }, [location.search]);

//   // Memoize jobs data with proper null checks
//   const jobs = useSelector((state) => {
//     if (!state.jobs?.jobs) return [];

//     if (urlStatus === 'Open') {
//       return state.jobs.jobs.openJobs || [];
//     } else {
//       return state.jobs.jobs.jobs || [];
//     }
//   });

//   // Dispatch only once on mount
//   useEffect(() => {
//     dispatch(getJobs());
//   }, [dispatch]);

//   // Filter jobs only when necessary data changes
//   useEffect(() => {
//     if (!jobs) return;

//     let filteredJobs = [...jobs]; // Create a new array to avoid mutation

//     if (searchQuery.trim()) {
//       filteredJobs = filteredJobs.filter((job) =>
//         job.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (statusFilter.trim()) {
//       filteredJobs = filteredJobs.filter(
//         (job) => job.status?.trim().toLowerCase() === statusFilter.trim().toLowerCase()
//       );
//     }

//     // Only update if the data actually changed
//     if (JSON.stringify(filteredJobs) !== JSON.stringify(jobData)) {
//       setJobData(filteredJobs);
//     }
//   }, [jobs, searchQuery, statusFilter]); // Removed jobData from dependencies to prevent loop

//   return {
//     jobData,
//     loading: isLoading,
//     setSearchQuery,
//     setStatusFilter,
//     searchQuery,
//     statusFilter,
//     dispatch,
//     page,
//     setPage
//   };
// };


// const truncateText = (text, maxLength) => {
//   if (!text) return ""; // Handle empty/null text
//   return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
// };
// const getJobTableData = (jobData, handleDelete) => {
//   // Access theme
//   const theme = useTheme();
//   const darkGray = theme.palette.grey[600]; // Define the dark gray color
//   const totalPages = useSelector((state) => state.jobs.jobs.totalPages || 1);
//   console.log("totalPagestotalPagestotalPages Jobs/:::", totalPages);
//   return {
//     columns: [
//       { name: "jobTitle", label: "Job Title", align: "left" },
//       { name: "description", label: "Description", align: "left" },
//       { name: "postingDate", label: "Posting Date", align: "left" },
//       { name: "status", label: "Status", align: "center" },
//       { name: "action", label: "Actions", align: "center" },
//     ],
//     rows: jobData.map((job) => ({
//       jobTitle: (
//         <Tooltip title={
//           <div style={{
//             display: 'inline-block',
//             maxWidth: '200px'
//           }}>
//             {job.title || ""}
//           </div>} arrow
//           componentsProps={tooltipStyle}
//           placement="top">
//           <SoftTypography
//             variant="button"
//             fontWeight="medium"
//             color="info"
//             sx={{ marginLeft: "15px", fontSize: "1rem" }}
//             component={Link}
//             to={`/Candidates/${job._id}`}

//           >
//             {truncateText(job.title, 20)}
//           </SoftTypography>
//         </Tooltip>

//       ),
//       description: (

//         <Tooltip title={
//           <div style={{
//             display: 'inline-block',
//             maxWidth: '600px'
//           }}>
//             {job.description || ""}
//           </div>} arrow
//           componentsProps={tooltipStyle}
//           placement="top">
//           <SoftTypography variant="caption" color="secondary">
//             {truncateText(job.description, 40)}
//           </SoftTypography>
//         </Tooltip>
//       ),
//       postingDate: (
//         <SoftTypography variant="caption" color="secondary" fontWeight="medium">
//           {new Date(job.postingDate).toLocaleDateString("en-GB")}
//         </SoftTypography>
//       ),
//       status: (
//         <SoftBadge
//           variant="gradient"
//           badgeContent={job.status}
//           color={job.status === "Open" ? "success" : "secondary"}
//           size="xs"
//           container
//         />
//       ),
//       action: (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             margin: 0,
//             padding: 0,
//           }}
//         >
//           <Link to={`/viewJob/${job._id}`} title="View">
//             <IconButton sx={{ fontSize: "24px", color: darkGray }}>
//               <VisibilityIcon sx={{ fontSize: "24px" }} />
//             </IconButton>
//           </Link>
//           <Link to={`/editJob/${job._id}`} title="Edit">
//             <IconButton sx={{ fontSize: "24px", color: darkGray }}>
//               <EditIcon sx={{ fontSize: "24px" }} />
//             </IconButton>
//           </Link>
//           <IconButton
//             title="Delete"
//             onClick={() => handleDelete(job._id)}
//             sx={{ fontSize: "24px", color: darkGray }}
//           >
//             <DeleteIcon sx={{ fontSize: "24px" }} />
//           </IconButton>
//           <Link to={`/Candidates/${job._id}`} title="Candidates">
//             <IconButton sx={{ fontSize: "24px", color: darkGray }}>
//               <GroupIcon sx={{ fontSize: "24px" }} />
//             </IconButton>
//           </Link>
//         </div>
//       ),
//     })),
//     pagination: {
//       totalPages,       // number
//       currentPage: page, // number
//       onPageChange: (e, value) => setPage(value) // function
//     }
//   };
// };

// export { useJobData, getJobTableData };


import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

import JobTableContainer from "layouts/scrollbar/tableContainer";
import { tooltipStyle } from "assets/textFieldStyles";

// const useJobData = () => {
//   const [jobData, setJobData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const dispatch = useDispatch();
//   const isLoading = useSelector((state) => state.jobs.loading);
//   const location = useLocation();
//   const [searchParams] = useSearchParams();

//   const current = parseInt(searchParams.get('page')) || 1;
//   const [page, setPage] = useState(current);
//   const [limit, setLimit] = useState(5); // Set your desired limit

//   const urlStatus = React.useMemo(() => {
//     const searchParams = new URLSearchParams(location.search);
//     return searchParams.get('status');
//   }, [location.search]);

//   const jobs = useSelector((state) => {
//     if (!state.jobs?.jobs) return [];

//     if (urlStatus === 'Open') {
//       return state.jobs.jobs.openJobs || [];
//     } else {
//       return state.jobs.jobs.jobs || [];
//     }
//   });
//   const totalPages = useSelector((state) => state.jobs.jobs?.totalPages || 1,)
//   const totalJobs = useSelector((state) => state.jobs.jobs?.totalJobs || 0)
//   const currentPage = useSelector((state) => state.jobs.jobs?.currentPage || 0)

//   useEffect(() => {
//     // Reset to page 1 when filters change
//     setPage(1);
//   }, [searchQuery, statusFilter]);
//   // Dispatch with pagination parameters
//   useEffect(() => {
//     console.log("pageeee current page", page)
//     dispatch(getJobs({ page, limit, status: statusFilter, search: searchQuery }));
//     console.log("jobsjobsjobs::::", jobs)
//   }, [dispatch, page, limit, statusFilter, searchQuery]);

//   // Filter jobs only when necessary data changes
//   useEffect(() => {
//     if (!jobs) return;

//     let filteredJobs = [...jobs]; // Create a new array to avoid mutation

//     if (searchQuery.trim()) {
//       filteredJobs = filteredJobs.filter((job) =>
//         job.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (statusFilter.trim()) {
//       filteredJobs = filteredJobs.filter(
//         (job) => job.status?.trim().toLowerCase() === statusFilter.trim().toLowerCase()
//       );
//     }

//     // Only update if the data actually changed
//     if (JSON.stringify(filteredJobs) !== JSON.stringify(jobData)) {
//       setJobData(filteredJobs);
//     }
//   }, [jobs, searchQuery, statusFilter]);

//   return {
//     jobData,
//     loading: isLoading,
//     setSearchQuery,
//     setStatusFilter,
//     searchQuery,
//     statusFilter,
//     dispatch,
//     page,
//     setPage,
//     limit,
//     totalPages,
//     totalJobs,

//   };
// };


const useJobData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page')) || 1;
  console.log("tabl page ,,.....", page);
  const limit = 5;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [jobData, setJobData] = useState([]);

  const isLoading = useSelector((state) => state.jobs.loading);
  const urlStatus = new URLSearchParams(location.search).get('status');

  // const jobs = useSelector((state) => {
  //   const data = state.jobs?.jobs || {};
  //   return urlStatus === 'Open' ? data.openJobs || [] : data.jobs || [];
  // });
  const jobs = useSelector((state) => {
    if (!state.jobs?.jobs) return [];

    if (urlStatus === 'Open') {
      return state.jobs.jobs.openJobs || [];
    } else {
      return state.jobs.jobs.jobs || [];
    }
  });
  const openJobsCount = useSelector((state) => state.jobs.jobs?.openJobsCount || 1);

  const totalPages = urlStatus === 'Open' ? Math.ceil(openJobsCount / limit) || 1 : useSelector((state) => state.jobs.jobs?.totalPages || 1);
  const totalJobs = useSelector((state) => state.jobs.jobs?.totalJobs || 0);

  // 🔄 Sync page in URL when filters change
  useEffect(() => {
    if (searchQuery || statusFilter) {
      const newParams = new URLSearchParams(location.search);
      newParams.set('page', 1);
      navigate({ search: newParams.toString() }, { replace: true });
    }
  }, [searchQuery, statusFilter]);

  // ⬇ Fetch jobs when page, search or status changes
  useEffect(() => {
    dispatch(getJobs({ page, limit, searchQuery: searchQuery, statusFilter: statusFilter }));
  }, [dispatch, page, limit, statusFilter, searchQuery]);

  // 🔍 Filter jobs client-side if needed
  useEffect(() => {
    if (!jobs) return;

    let filtered = [...jobs];
    if (searchQuery.trim()) {
      filtered = filtered.filter(job =>
        job.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter.trim()) {
      filtered = filtered.filter(
        job => job.status?.trim().toLowerCase() === statusFilter.trim().toLowerCase()
      );
    }

    if (JSON.stringify(filtered) !== JSON.stringify(jobData)) {
      setJobData(filtered);
    }
  }, [jobs, searchQuery, statusFilter]);

  return {
    jobData,
    loading: isLoading,
    setSearchQuery,
    setStatusFilter,
    searchQuery,
    statusFilter,
    page,
    limit,
    totalPages,
    totalJobs,
  };
};


const truncateText = (text, maxLength) => {
  if (!text) return ""; // Handle empty/null text
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

// const getJobTableData = (jobData, handleDelete, pagination) => {
//   const theme = useTheme();
//   const darkGray = theme.palette.grey[600]; // Define the dark gray color
//   // const { page, setPage, totalPages } = pagination;
//   const { candidates, loading, totalPages, page, setPage } = useJobData();

//   return {
//     columns: [
//       { name: "jobTitle", label: "Job Title", align: "left" },
//       { name: "description", label: "Description", align: "left" },
//       { name: "postingDate", label: "Posting Date", align: "left" },
//       { name: "status", label: "Status", align: "center" },
//       { name: "action", label: "Actions", align: "center" },
//     ],
//     rows: jobData.map((job) => ({
//       jobTitle: (
//         <Tooltip title={
//           <div style={{
//             display: 'inline-block',
//             maxWidth: '200px'
//           }}>
//             {job.title || ""}
//           </div>} arrow
//           componentsProps={tooltipStyle}
//           placement="top">
//           <SoftTypography
//             variant="button"
//             fontWeight="medium"
//             color="info"
//             sx={{ marginLeft: "15px", fontSize: "1rem" }}
//             component={Link}
//             to={`/Candidates/${job._id}`}
//           >
//             {truncateText(job.title, 20)}
//           </SoftTypography>
//         </Tooltip>
//       ),
//       description: (
//         <Tooltip title={
//           <div style={{
//             display: 'inline-block',
//             maxWidth: '600px'
//           }}>
//             {job.description || ""}
//           </div>} arrow
//           componentsProps={tooltipStyle}
//           placement="top">
//           <SoftTypography variant="caption" color="secondary">
//             {truncateText(job.description, 40)}
//           </SoftTypography>
//         </Tooltip>
//       ),
//       postingDate: (
//         <SoftTypography variant="caption" color="secondary" fontWeight="medium">
//           {new Date(job.postingDate).toLocaleDateString("en-GB")}
//         </SoftTypography>
//       ),
//       status: (
//         <SoftBadge
//           variant="gradient"
//           badgeContent={job.status}
//           color={job.status === "Open" ? "success" : "secondary"}
//           size="xs"
//           container
//         />
//       ),
//       action: (
//         <div style={{
//           display: "flex",
//           justifyContent: "center",
//           margin: 0,
//           padding: 0,
//         }}>
//           <Link to={`/viewJob/${job._id}`} title="View">
//             <IconButton sx={{ fontSize: "24px", color: darkGray }}>
//               <VisibilityIcon sx={{ fontSize: "24px" }} />
//             </IconButton>
//           </Link>
//           <Link to={`/editJob/${job._id}`} title="Edit">
//             <IconButton sx={{ fontSize: "24px", color: darkGray }}>
//               <EditIcon sx={{ fontSize: "24px" }} />
//             </IconButton>
//           </Link>
//           <IconButton
//             title="Delete"
//             onClick={() => handleDelete(job._id)}
//             sx={{ fontSize: "24px", color: darkGray }}
//           >
//             <DeleteIcon sx={{ fontSize: "24px" }} />
//           </IconButton>
//           <Link to={`/Candidates/${job._id}`} title="Candidates">
//             <IconButton sx={{ fontSize: "24px", color: darkGray }}>
//               <GroupIcon sx={{ fontSize: "24px" }} />
//             </IconButton>
//           </Link>
//         </div>
//       ),
//     })),
//     pagination: {
//       totalPages,
//       currentPage: page,
//       onPageChange: (event, value) => setPage(value)
//     }
//   };
// };
const getJobTableData = (jobData, handleDelete) => {
  const {
    jobData: jobs,
    loading,
    totalPages,
    page,
  } = useJobData();

  const theme = useTheme();
  const navigate = useNavigate();
  const darkGray = theme.palette.grey[600];

  return {
    columns: [
      { name: "jobTitle", label: "Job Title", align: "left" },
      { name: "description", label: "Description", align: "left" },
      { name: "postingDate", label: "Posting Date", align: "left" },
      { name: "status", label: "Status", align: "center" },
      { name: "action", label: "Actions", align: "center" },
    ],
    rows: jobs.map((job) => ({
      jobTitle: (
        <Tooltip title={<div style={{ maxWidth: '200px' }}>{job.title || ""}</div>} arrow>
          <SoftTypography
            variant="button"
            fontWeight="medium"
            color="info"
            sx={{ marginLeft: "15px", fontSize: "1rem" }}
            component={Link}
            to={`/Candidates/${job._id}`}
          >
            {truncateText(job.title, 20)}
          </SoftTypography>
        </Tooltip>
      ),
      description: (
        <Tooltip title={<div style={{ maxWidth: '600px' }}>{job.description || ""}</div>} arrow>
          <SoftTypography variant="caption" color="secondary">
            {truncateText(job.description, 40)}
          </SoftTypography>
        </Tooltip>
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to={`/viewJob/${job._id}`}><IconButton sx={{ color: darkGray }}><VisibilityIcon /></IconButton></Link>
          {/* <Link to={`/editJob/${job._id}`}><IconButton sx={{ color: darkGray }}><EditIcon /></IconButton></Link> */}
          <Link to={`/editJob/${job._id}?page=${page}`}>
            <IconButton sx={{ color: darkGray }}>
              <EditIcon />
            </IconButton>
          </Link>

          <IconButton onClick={() => handleDelete(job._id)} sx={{ color: darkGray }}><DeleteIcon /></IconButton>
          <Link to={`/Candidates/${job._id}`}><IconButton sx={{ color: darkGray }}><GroupIcon /></IconButton></Link>
        </div>
      ),
    })),
    pagination: {
      totalPages,
      currentPage: page,
      onPageChange: (event, value) => {
        const newParams = new URLSearchParams(window.location.search);
        newParams.set('page', value);
        navigate({ search: newParams.toString() });
      },
    },
  };
};
export { useJobData, getJobTableData };