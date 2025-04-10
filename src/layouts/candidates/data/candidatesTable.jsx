import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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


// const useCandidateData = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const allCandidates = useSelector((state) => state.candidates.candidates);
//   const isLoading = useSelector((state) => state.candidates.loading);

//   useEffect(() => {
//     dispatch(getCandidates(id)); // Pass the ID to the API call if needed
//   }, [dispatch, id]);

//   // Filter candidates based on ID if present
//   const candidates = useMemo(() => {
//     if (!id) return allCandidates;
//     return allCandidates.filter(candidate => 
//       candidate.id === id || // Adjust this condition based on your data structure
//       candidate.job === id || // Or whatever field links candidates to the ID
//       candidate.relatedId === id
//     );
//   }, [allCandidates, id]);

//   return { candidates, loading: isLoading };
// };

const useCandidateData = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allCandidates = useSelector((state) => state.candidates.candidates);
  const isLoading = useSelector((state) => state.candidates.loading);
  useEffect(() => {
    if (id) {
      console.log("iddddddd", id)
      console.log("allcandidates:::::::::", allCandidates);
      dispatch(getCandidatesByJobID(id));
      if (allCandidates.length === 0) {
        console.log("no candidate available.")
      } // Fetch candidates for specific job
    } else {
      console.log("helooooooo");
      dispatch(getCandidates()); // Fetch all candidates
    }
  }, [dispatch, id]);

  // No need to filter here since the API should return the correct data
  return { candidates: allCandidates, loading: isLoading };
};
const getCandidatesTableData = () => {
  const { candidates, loading } = useCandidateData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [interviewStatusFilter, setInterviewStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const theme = useTheme();
  const darkGray = theme.palette.grey[600];
  const handleResetFilters = () => {
    setInterviewStatusFilter("");
    setSearchQuery("");
    setStatusFilter("");
  };

  const filteredCandidates = useMemo(() => {
    let result = candidates || [];

    if (searchQuery.trim()) {
      result = result.filter((candidate) =>
        candidate.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter) {
      result = result.filter((candidate) =>
        candidate.status?.trim().toLowerCase() === statusFilter.trim().toLowerCase()
      );
    }

    if (interviewStatusFilter) {
      result = result.filter((candidate) =>
        candidate.interviewStatus?.trim().toLowerCase() === interviewStatusFilter.trim().toLowerCase()
      );
    }

    return result;
  }, [candidates, searchQuery, statusFilter, interviewStatusFilter]);

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

  const noCandidatesFound = filteredCandidates.length === 0 || filteredCandidates.length < 0;

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
          width:"96%"
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
                onChange={(e) => setInterviewStatusFilter(e.target.value)}
                label="Interview Status"
                sx={{ width: "100%", paddingRight: "40px" }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Accepted">Accepted</MenuItem>
                <MenuItem value="Interviewed">Interviewed</MenuItem>
                <MenuItem value="Missed">Missed</MenuItem>
                <MenuItem value="Rescheduled">Rescheduled</MenuItem>
                <MenuItem value="Offered">Offered</MenuItem>
              </Select>
              <ArrowDropDownCircleIcon sx={{ ...dropdownIconStyle }} />
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
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
                sx={{ width: "100%", paddingRight: "40px" }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Contacted">Contacted</MenuItem>
                <MenuItem value="Moved to Round 2">Moved to Round 2</MenuItem>
                <MenuItem value="Moved to Round 3">Moved to Round 3</MenuItem>
                <MenuItem value="Shortlisted">Shortlisted</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
                <MenuItem value="Final Round">Final Round</MenuItem>
                <MenuItem value="Hired">Hired</MenuItem>
                <MenuItem value="On Hold">On Hold</MenuItem>
              </Select>
              <ArrowDropDownCircleIcon sx={{ ...dropdownIconStyle }} />
            </Box>
          </FormControl>
        </div>

        {/* Right side: Buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <SoftButton variant="gradient" color="success" onClick={() => navigate("/Jobs")}>
            Back
          </SoftButton>
          <SoftButton variant="gradient" color="info" onClick={() => navigate("/addCandidate")}>
            Add Candidate
          </SoftButton>
        </div>
      </div>

    ),
    columns: [
      { name: "name", label: "Name", align: "left" },
      { name: "location", label: "Location", align: "left" },
      { name: "interviewStatus", label: "Interview Status", align: "center" },
      { name: "status", label: "Status", align: "center" },
      { name: "comments", label: "Comments", align: "center" },
      { name: "interviewSlot", label: "Time Offered", align: "center" },
      { name: "action", label: "Action", align: "center" },
    ],
    rows: loading
      ? [{
        name: (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" mt={2}>
            <CircularProgress color="primary" size={30} />
            <SoftTypography variant="button" color="secondary" textAlign="center" mt={1}>
              Loading candidates...
            </SoftTypography>
          </Box>
        ),
        location: "",
        interviewStatus: "",
        status: "",
        comments: "",
        interviewSlot:"",
        action: ""
      }]
      : noCandidatesFound
        ? [{
          name: (
            <SoftTypography variant="h6" color="secondary" align="center">
              No candidates match the criteria.
            </SoftTypography>
          ),
          location: "",
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
        : filteredCandidates.map((candidate) => ({
          name: (
            <SoftTypography variant="button" fontWeight="medium" color="dark">
              {candidate.name}
            </SoftTypography>
          ),
          location: (
            <SoftTypography variant="caption" color="secondary">
              {truncateText(candidate.location, 20)}

            </SoftTypography>
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
            <SoftTypography variant="caption" color="secondary">
              {truncateText(candidate.comments, 30)}

            </SoftTypography>
          ),
          interviewSlot:(
            <SoftTypography variant="caption" color="secondary">
            {candidate.interviewSlot}

          </SoftTypography>
          ),
          action: (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to={`/viewCandidate/${candidate._id}`}>
                <IconButton sx={{ color: darkGray }}>
                  <VisibilityIcon />
                </IconButton>
              </Link>
              <Link to={`/editCandidate/${candidate._id}`}>
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

  };
};


export default getCandidatesTableData;