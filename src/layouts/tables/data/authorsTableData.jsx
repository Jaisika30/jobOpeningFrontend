
import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, deleteJob } from "slices/jobSlice";
import { Button, Input, Select, MenuItem, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

import JobTableContainer from "layouts/scrollbar/tableContainer";
import { tooltipStyle } from "assets/textFieldStyles";

const useJobData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = 10;
  const urlStatus = searchParams.get("status");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(urlStatus || "");

  const isLoading = useSelector((state) => state.jobs.loading);

  // Get all jobs from Redux store
  const jobsData = useSelector((state) => state.jobs?.jobs || {});

  // Determine which jobs to display based on status filter
  const jobs = useMemo(() => {
    // if (statusFilter === "Open") {
    //   return jobsData.openJobs || [];
    // }
    return jobsData.jobs || [];
  }, [jobsData, statusFilter]);

  const totalJobs = jobsData.totalJobs || 0;
  const openJobsCount = jobsData.openJobsCount || 0;
  const totalPages = jobsData.totalPages || 1;

  // Update URL when filters change
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (page > 1) newParams.set("page", page);
    if (statusFilter) newParams.set("status", statusFilter);
    if (searchQuery) newParams.set("search", searchQuery);

    navigate({ search: newParams.toString() }, { replace: true });
  }, [page, statusFilter, searchQuery]);

  // Fetch jobs when page or filters change
  useEffect(() => {
    dispatch(
      getJobs({
        page,
        limit,
        searchQuery,
        statusFilter: statusFilter || undefined // Send undefined if empty to match API
      })
    );
  }, [dispatch, page, limit, statusFilter, searchQuery]);

  // Filter jobs client-side if needed (additional filtering beyond what API provides)
  const jobData = useMemo(() => {
    if (!jobs) return [];

    let filtered = [...jobs];
    if (searchQuery.trim()) {
      filtered = filtered.filter((job) =>
        job.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [jobs, searchQuery]);

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
    urlStatus
  };
};

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const getJobTableData = (jobData, handleDelete) => {
  const { jobData: jobs, loading, totalPages, urlStatus, searchQuery,
    statusFilter,
    page,
    limit, } = useJobData();

  const theme = useTheme();
  const navigate = useNavigate();
  const darkGray = theme.palette.grey[600];


  return {
    columns: [
      { name: "jobTitle", label: "Job Title", align: "left" },
      { name: "description", label: "Description", align: "left" },
      { name: "postingDate", label: "Posting Date", align: "left" },
      { name: "status", label: "Status", align: "center" },
      { name: "totalCandidates", label: "Total Candidates", align: "center" },
      { name: "action", label: "Actions", align: "center" },
    ],
    rows: jobs.map((job) => ({
      jobTitle: (
        <Tooltip
          placement="top"
          title={<div style={{ maxWidth: "200px" }}>{job.title || ""}</div>}
          arrow
          componentsProps={tooltipStyle}
        >
          <SoftTypography
            variant="button"
            fontWeight="medium"
            color="info"
            sx={{ marginLeft: "15px", fontSize: "1rem" }}
            component={Link}
            to={`/Candidates/${job._id}?page=${page}`}
          >
            {truncateText(job.title, 20)}
          </SoftTypography>
        </Tooltip>
      ),
      description: (
        <Tooltip
          placement="top"
          title={<div style={{ maxWidth: "600px" }}>{job.description || ""}</div>}
          arrow
          componentsProps={tooltipStyle}
        >
          <SoftTypography variant="caption" color="secondary">
            {truncateText(job.description, 40)}
          </SoftTypography>
        </Tooltip>
      ),
      postingDate: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {new Date(job.postingDate).toLocaleDateString("en-GB").replaceAll('/', '-')}
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
      totalCandidates: (

        <SoftTypography
          variant="button"
          fontWeight="medium"
          color="text"
          sx={{ marginLeft: "15px", fontSize: "1rem" }}
          component={Link}

        >
          {job?.candidates?.length}
        </SoftTypography>

      ),
      action: (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Tooltip
            placement="top"
            title={<div style={{ maxWidth: "200px" }}>{"View"}</div>}
            arrow
            componentsProps={tooltipStyle}
          >
            <Link to={`/viewJob/${job._id}?page=${page}`}>
              <IconButton sx={{ color: darkGray }}>
                <VisibilityIcon />
              </IconButton>
            </Link>
          </Tooltip>
          {/* <Link
            to={`/editCandidate/${candidate._id}?page=${page}&flag=true${urlStatus ? `&status=${urlStatus}` : ''}`}
          > */}
          <Tooltip
            placement="top"
            title={<div style={{ maxWidth: "200px" }}>{"Update"}</div>}
            arrow
            componentsProps={tooltipStyle}
          >
            <Link to={`/editJob/${job._id}?page=${page}&&${urlStatus ? `status=${urlStatus}}` : ''}`}>

              <IconButton sx={{ color: darkGray }}>
                <EditIcon />
              </IconButton>

            </Link>
          </Tooltip>
          <Tooltip
            placement="top"
            title={<div style={{ maxWidth: "200px" }}>{"Delete"}</div>}
            arrow
            componentsProps={tooltipStyle}
          >
            <IconButton onClick={() => handleDelete(job._id)} sx={{ color: darkGray }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            placement="top"
            title={<div style={{ maxWidth: "200px" }}>{"Candidates"}</div>}
            arrow
            componentsProps={tooltipStyle}
          >
            <Link to={`/Candidates/${job._id}?page=${page}`}>
              <IconButton sx={{ color: darkGray }}>
                <GroupIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </div>
      ),
    })),
    pagination: {
      totalPages,
      currentPage: page,
      onPageChange: (event, value) => {
        const newParams = new URLSearchParams(window.location.search);
        newParams.set("page", value);
        navigate({ search: newParams.toString() });
      },
    },
  };
};

export { useJobData, getJobTableData };