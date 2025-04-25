import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import { getCandidates, deleteCandidate } from "slices/candidateSlice";
import { Button, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getCandidatesByJobID } from "slices/candidateSlice";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import SoftButton from "components/SoftButton";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle"; // Import icon
import { dropdownStyles, inputLabelStyle, dropdownIconStyle } from "assets/textFieldStyles";
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { tooltipStyle } from "assets/textFieldStyles";
import { getJobs } from "slices/jobSlice";
import Pagination from '@mui/material/Pagination';

const useCandidateData = ({ searchQuery, statusFilter, interviewStatusFilter }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();


  const page = React.useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get("page")) || 1;
  }, [location.search]);
  console.log("candidate page ,,.....", page);
  const limit = 5;
  const urlinterviewStatus = React.useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('interviewStatus');
  }, [location.search]);
  const urlStatus = React.useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('status');
  }, [location.search]);

  console.log("urlinterviewStatusurlinterviewStatusurlinterviewStatus::", urlinterviewStatus);
  console.log("urlStatusurlStatusurlStatus:::", urlStatus);
  // Get the correct data structure based on whether we have an ID

  const currentPage = useSelector((state) => state.candidates?.candidates?.currentPage || "");


  const allCandidates = useSelector((state) => {
    if (id) {
      console.log("With ID - candidates data:", state.candidates?.candidates);
      return state.candidates?.candidates || []; // Array of candidates for specific job
    } else if (urlStatus === 'Hired') {
      console.log("hiredCandidates:", state.candidates?.candidates?.hiredCandidates || []);
      return state.candidates?.candidates?.hiredCandidates || [];
    } else if (urlinterviewStatus === 'Scheduled') {
      console.log("scheduledCandidates:", state.candidates?.candidates?.scheduledCandidates || []);
      return state.candidates?.candidates?.ScheduledCandidates || [];
    }
    else {
      console.log("Without ID - candidates data:", state.candidates?.candidates?.candidates);
      return state.candidates?.candidates?.candidates || []; // Array of all candidates
    }
  });
  const jobs = useSelector((state) => state.jobs.jobs.jobs || []);
  const isLoading = useSelector((state) => state.candidates.loading);
  console.log("Jobssss candidaye table:::", jobs)
  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      console.log("Fetching candidates for job ID:", id);
      dispatch(getCandidatesByJobID(id));
    } else {
      console.log("Fetching all candidates");
      dispatch(getCandidates({ page, limit, searchQuery: searchQuery, statusFilter: statusFilter, interviewStatusFilter: interviewStatusFilter }));

    }
  }, [dispatch, id, page, searchQuery, statusFilter, interviewStatusFilter]);

  // Ensure we always return an array
  return { candidates: Array.isArray(allCandidates) ? allCandidates : [], loading: isLoading, page, limit };
};

const getCandidatesTableData = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [interviewStatusFilter, setInterviewStatusFilter] = useState("");
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const { candidates, loading, page, limit } = useCandidateData({
    searchQuery,
    statusFilter,
    interviewStatusFilter,

  });
  console.log("pageeeee candidate:::", page)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const { id } = useParams();
  const darkGray = theme.palette.grey[600];

  const location = useLocation();
  const urlStatus = React.useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('status');
  }, [location.search]);

  const urlinterviewStatus = React.useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('interviewStatus');
  }, [location.search]);

  const filteredCandidates = useMemo(() => {
    let result = candidates || [];

    if (searchQuery.trim()) {
      result = result.filter((candidate) =>
        candidate.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [candidates, searchQuery]);


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
        dispatch(deleteCandidate(id));
        Swal.fire("Deleted!", "The candidate has been deleted.", "success");
      }
    });
  };
  const truncateText = (text, maxLength) => {
    if (!text) return ""; // Handle empty/null text
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };
  // const total = 50;
  // const limit = 5;
  // const totalCandidates = useSelector((state) => state.candidates?.candidates?.totalCandidates || "");
  const hiredCount = useSelector((state) => state.candidates?.candidates?.hiredCount || 0);
  const scheduledCount = useSelector((state) => state.candidates?.candidates?.scheduledCount || 0);
  // const totalPages = urlStatus === 'Hired'
  //   ? Math.ceil(hiredCount / limit) || 1 : useSelector((state) => state.candidates?.candidates?.totalPages || 1);
  const totalPages =
    urlStatus === "Hired"
      ? Math.ceil(hiredCount / limit) || 1
      : urlinterviewStatus === "Scheduled"
        ? Math.ceil(scheduledCount / limit) || 1
        : useSelector((state) => state.candidates?.candidates?.totalPages || 1);

  console.log("tota;;;;;pages:::::", totalPages);
  const noCandidatesFound = filteredCandidates.length === 0 || filteredCandidates.length < 0;
  const handleIconClick = () => {
    setOpenDropdown(true); // Opens the Select dropdown
  };
  const handleStatusIconClick = () => {
    setOpenStatusDropdown(true); // Opens the Select dropdown
  };
  const handleChange = (e) => {
    setInterviewStatusFilter(e.target.value);
    setOpenDropdown(false);
  }
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value)
    setOpenStatusDropdown(false);
  }
  return {
    topAction: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
          marginBottom: "16px",
          flexWrap: "wrap",
          width: "96%"
        }}
      >
        {/* Left side: Search and Filters */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            InputLabelProps={{
              sx: { fontSize: "0.85rem" },
            }}
            sx={{
              width: "200px",
              maxWidth: "200px",
              minWidth: "200px",
              borderRadius: "5px",
              display: "flex",
              "& .MuiInputBase-root": {
                width: "100%",
                display: "flex",
              },
              "& .MuiInputBase-input": {
                width: "180px",
                maxWidth: "180px",
                minWidth: "180px",
              },
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Interview Status Filter */}

          <FormControl
            sx={{
              width: "200px",
              maxWidth: "200px",
              minWidth: "200px",
              borderRadius: "5px",
              display: "flex",
              "& .MuiInputBase-root": {
                width: "100%",
                display: "flex",
              },
              "& .MuiInputBase-input": {
                width: "180px",
                maxWidth: "180px",
                minWidth: "180px",
              },
            }}
          >
            <InputLabel sx={{ ...inputLabelStyle }}>Interview Status</InputLabel>
            <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
              <Select
                value={interviewStatusFilter}
                onChange={handleChange}
                label="Interview Status"
                sx={{ width: "100%", paddingRight: "40px" }}
                open={openDropdown}
                onClose={() => setOpenDropdown(false)}
                onOpen={() => setOpenDropdown(true)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Accepted">Accepted</MenuItem>
                <MenuItem value="Interviewed">Interviewed</MenuItem>
                <MenuItem value="Missed">Missed</MenuItem>
                <MenuItem value="Offered">Offered</MenuItem>
                <MenuItem value="Rescheduled">Rescheduled</MenuItem>
                <MenuItem value="Scheduled">Scheduled</MenuItem>
              </Select>
              <ArrowDropDownCircleIcon sx={{ ...dropdownIconStyle }} onClick={handleIconClick} />
            </Box>
          </FormControl>

          {/* Status Filter */}
          <FormControl
            sx={{
              width: "200px",
              maxWidth: "200px",
              minWidth: "200px",
              borderRadius: "5px",
              display: "flex",
              "& .MuiInputBase-root": {
                width: "100%",
                display: "flex",
              },
              "& .MuiInputBase-input": {
                width: "180px",
                maxWidth: "180px",
                minWidth: "180px",
              },
            }}
          >
            <InputLabel sx={{ ...inputLabelStyle }}>Status</InputLabel>
            <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
              <Select
                value={statusFilter}
                onChange={handleStatusChange}
                label="Status"
                sx={{ width: "100%", paddingRight: "40px" }}
                open={openStatusDropdown}
                onClose={() => setOpenStatusDropdown(false)}
                onOpen={() => setOpenStatusDropdown(true)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Contacted">Contacted</MenuItem>
                <MenuItem value="Final Round">Final Round</MenuItem>
                <MenuItem value="Hired">Hired</MenuItem>
                <MenuItem value="Moved to Round 2">Moved to Round 2</MenuItem>
                <MenuItem value="Moved to Round 3">Moved to Round 3</MenuItem>
                <MenuItem value="On Hold">On Hold</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
                <MenuItem value="Shortlisted">Shortlisted</MenuItem>
              </Select>
              <ArrowDropDownCircleIcon sx={{ ...dropdownIconStyle }} onClick={handleStatusIconClick} />
            </Box>
          </FormControl>
        </div>

        {/* Right side: Buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <SoftButton variant="gradient" color="success" onClick={() => navigate(urlStatus === "Hired" || urlinterviewStatus === "Scheduled" ? "/dashboard" : "/Jobs")}>
            Back
          </SoftButton>
          <SoftButton variant="gradient" color="info" onClick={() => navigate(id ? `/addCandidate/${id}` : "/addCandidate")}>
            Add Candidate
          </SoftButton>
        </div>
      </div>


    ),
    columns: [
      { name: "name", label: "Name", align: "left" },
      ...(urlStatus == "Hired" || !id
        ? [{ name: "job", label: "Jobs", align: "left" }]
        : []),
       
      { name: "location", label: "Location", align: "left" },
      { name: "interviewSlot", label: "Time Offered", align: "left" },
      { name: "interviewStatus", label: "Interview Status", align: "center" },
      { name: "status", label: "Status", align: "center" },
      ...(urlStatus !== "Hired"
        ? [{ name: "comments", label: "Comments", align: "left" }]
        : []),
      { name: "action", label: "Action", align: "center" },
    ],
    rows: loading
      ? [{
        name: (
          <Box position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bgcolor="rgba(255,255,255,0.7)" // Semi-transparent background
            zIndex={9999}>
            <CircularProgress color="secondary" size={30} />
            <SoftTypography variant="button" color="secondary" textAlign="center" mt={1}>
              Loading candidates...
            </SoftTypography>
          </Box>
        ),
        job: "",
        location: "",
        interviewSlot: "",
        interviewStatus: "",
        status: "",
        comments: "",
        action: ""
      }]
      : noCandidatesFound
        ? [{
          name: (
            <Box display="flex" justifyContent="center" width="100%" >
              <SoftTypography variant="h7" color="error" textAlign="center">
                No Candidates available.
              </SoftTypography>
            </Box>

          ),
          job: "",
          location: "",
          interviewSlot: "",
          interviewStatus: "",
          status: "",
          comments: "",
          // action: (
          //   <Button
          //     variant="contained"
          //     onClick={handleResetFilters}
          //     style={{ backgroundColor: 'red', color: 'white' }}
          //   >
          //     Reset Filters
          //   </Button>
          // )
        }]
        : filteredCandidates?.map((candidate) => ({
          name: (
            <Tooltip
              placement="top"
              title={
                <div style={{
                  display: 'inline-block',
                  maxWidth: '200px'
                }}>
                  {candidate?.name || ""}
                </div>}
              arrow
              componentsProps={tooltipStyle}
            >
              <SoftTypography variant="button" fontWeight="medium" color="dark">
                {truncateText(candidate?.name, 15)}
              </SoftTypography>
            </Tooltip>
          ),
          job: (
            <Tooltip
              placement="top"
              title={
                <div style={{
                  display: 'inline-block',
                  maxWidth: '200px'
                }}>
                  {candidate?.job?.title || ""}
                </div>}
              arrow
              componentsProps={tooltipStyle}
            >
              <SoftTypography variant="caption" color="secondary">
                {truncateText(candidate?.job?.title, 15)}
              </SoftTypography>
            </Tooltip>
          ),
          location: (
            <Tooltip
              placement="top"
              title={
                <div style={{
                  display: 'inline-block',
                  maxWidth: '200px'
                }}>
                  {candidate.location || ""}
                </div>}
              arrow
              componentsProps={tooltipStyle}
            >
              <SoftTypography variant="caption" color="secondary">
                {truncateText(candidate.location, 20)}
              </SoftTypography>
            </Tooltip>
          ),
          interviewSlot: (
            <Tooltip
              placement="top"
              title={
                <div style={{
                  display: 'inline-block',
                  maxWidth: '200px'
                }}>
                  {candidate.interviewSlot || ""}
                </div>}
              arrow
              componentsProps={tooltipStyle}
            >
              <SoftTypography variant="caption" color="secondary">
                {truncateText(candidate.interviewSlot, 20)}
              </SoftTypography>
            </Tooltip>
          ),
          interviewStatus: (
            <SoftBadge
              variant="gradient"
              badgeContent={candidate.interviewStatus}
              color={
                candidate.interviewStatus === "Accepted" ? "success" :
                  candidate.interviewStatus === "Rejected" ? "error" :
                    candidate.interviewStatus === "Pending" ? "warning" :
                      candidate.interviewStatus === "Offered" ? "info" :
                        candidate.interviewStatus === "Interviewed" ? "secondary" :
                          candidate.interviewStatus === "Rescheduled" ? "warning" :
                            candidate.interviewStatus === "Missed" ? "error" :
                              "light" // default/fallback
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
                  candidate.status === "Rejected" ? "error" :
                    candidate.status === "Contacted" ? "info" :
                      candidate.status === "Moved to Round 2" ? "primary" :
                        candidate.status === "Moved to Round 3" ? "primary" :
                          candidate.status === "Shortlisted" ? "secondary" :
                            candidate.status === "Final Round" ? "warning" :
                              candidate.status === "On Hold" ? "warning" :
                                "default"
              }
              size="xs"
              container
            />
          ),
          comments: (
            <Tooltip title={candidate.comments || ""} arrow placement="top" componentsProps={tooltipStyle}>
              <SoftTypography variant="caption" color="secondary">
                {truncateText(candidate.comments, 15)}
              </SoftTypography>
            </Tooltip>
          ),

          action: (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to={`/viewCandidate/${candidate._id}`}>
                <IconButton sx={{ color: darkGray }}>
                  <VisibilityIcon />
                </IconButton>
              </Link>
              <Link to={`/editCandidate/${candidate._id}?page=${page}&&flag=true`}>
                <IconButton sx={{ color: darkGray }}>
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton sx={{ color: darkGray }} onClick={() => handleDelete(candidate._id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ),
        }))
    ,
    pagination: {
      totalPages,       // number
      currentPage: page,
      onPageChange: (event, value) => {
        const newParams = new URLSearchParams(window.location.search);
        newParams.set('page', value);
        navigate({ search: newParams.toString() });
      },
    }
  };
};


export default getCandidatesTableData;