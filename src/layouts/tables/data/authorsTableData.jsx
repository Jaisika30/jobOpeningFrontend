


import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "slices/jobSlice";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { Input, Select, MenuItem } from "@mui/material";
import { deleteJob } from "slices/jobSlice";
import Swal from "sweetalert2";
import { Button } from "@mui/material";


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

    if (statusFilter && statusFilter !== "") {
      filteredJobs = filteredJobs.filter((job) => {
        console.log("job.status:::", job.status, "Status Filter:::", statusFilter)
        return job.status?.trim().toLowerCase() === statusFilter.trim().toLowerCase();
      });
    }

    console.log("filtereddddddddddJobs:::::", filteredJobs)
    setJobData(filteredJobs);
  }, [jobs, searchQuery, statusFilter]);

  // Optimized state setters
  const handleSearch = useCallback((query) => setSearchQuery(query), []);
  const handleStatusChange = useCallback((status) => setStatusFilter(status), []);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteJob(id))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "The job has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong!", "error");
          });
      }
    });
  };

  return {
    jobData,
    loading: isLoading,
    setSearchQuery: handleSearch,
    setStatusFilter: handleStatusChange,
    searchQuery,
    statusFilter,
    handleDelete
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
    handleDelete
  } = useJobData();

  return (
    <>
    {/* Search and Filter Section */}
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search by Job Title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              backgroundColor: "#e6f7ff",
              color: "#000",
              padding: "10px",
              width: "100%",
              maxWidth: "400px",
              borderRadius: "5px",
              border: "1px solid #2196f3",
            }}
          />
  
          {/* Status Filter */}
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            style={{
              backgroundColor: "#ffefdb",
              color: "#000",
              padding: "10px",
              width: "100%",
              maxWidth: "200px",
              borderRadius: "5px",
              border: "1px solid #ff9800",
            }}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </Select>
        </div>
  
        {/* Add Job Button */}
        <Button
          onClick={handleAddJob}
          style={{
            backgroundColor: "#4caf50",
            color: "#fff",
            padding: "10px 15px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            display:"flex"
          }}
        >
          + Add Job
        </Button>
      </div>
  
      {/* Table Display */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <JobTable jobData={jobData} handleDelete={handleDelete} />
      )}
    </div>
  </>
  

  );
};

const JobTable = ({ jobData, handleDelete }) => {
  const tableData = getJobTableData(jobData, handleDelete);
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

const getJobTableData = (jobData, handleDelete) => ({
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
        to={`/Candidate/${job._id}`}
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
        <Link to={`/viewJob/${job._id}`} title="View">
          <FaEye color="blue" style={{ cursor: "pointer" }} />
        </Link>
        <Link to={`/editJob/${job._id}`} title="Edit">
          <FaEdit color="green" style={{ cursor: "pointer" }} />
        </Link>
        <FaTrash
          color="red"
          style={{ cursor: "pointer" }}
          title="Delete"
          onClick={() => handleDelete(job._id)} // Ensures correct function reference
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




export { useJobData, JobTableUI, getJobTableData };

