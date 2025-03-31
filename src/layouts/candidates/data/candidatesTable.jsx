

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import { getCandidates, deleteCandidate } from "slices/candidateSlice";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const useCandidateData = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const candidates = useSelector((state) => state.candidates.candidates);
  const isLoading = useSelector((state) => state.candidates.loading);
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  useEffect(() => {
    dispatch(getCandidates(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (candidates.length > 0) {
      setFilteredCandidates(!id || id === ":id" ? candidates : candidates.filter((c) => c.job._id === id));
    }
  }, [candidates, id]);

  return { candidates: filteredCandidates, loading: isLoading };
};
const formatLabel = (label) => {
  return label
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add spaces before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
};
const getCandidatesTableData = () => {
  const { candidates, loading } = useCandidateData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  if (loading) return { columns: [], rows: [] };

  return {
    topAction: (
      <Button variant="contained" color="primary" onClick={() => navigate("/addCandidate")}>
        Add Candidate
      </Button>
    ),
    columns: [
      { name: "name", label: formatLabel("name"), align: "left" },
      { name: "location", label: formatLabel("location"), align: "left" },
      { name: "interviewSlot", label: formatLabel("interview  Slot"), align: "center" },
      { name: "interviewSchedule", label: formatLabel("interviewSchedule"), align: "center" },
      { name: "communication", label: formatLabel("communication"), align: "center" }, // FIXED
      { name: "personality", label: formatLabel("personality"), align: "center" },
      { name: "knowledge", label: formatLabel("knowledge"), align: "center" },
      { name: "interviewStatus", label: formatLabel("interviewStatus"), align: "center" },
      { name: "status", label: formatLabel("status"), align: "center" },
      { name: "action", label: formatLabel("action"), align: "center" },
    ],
    
    rows: candidates.map((candidate) => {
      const interviewDate = new Date(candidate.interviewSchedule).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric"
      });

      const interviewTime = new Date(candidate.interviewSchedule).toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit"
      });

      return {
        name: <SoftTypography variant="button" fontWeight="medium" color="dark">{candidate.name}</SoftTypography>,
        location: <SoftTypography variant="caption" color="secondary">{candidate.location}</SoftTypography>,
        interviewSlot: <SoftTypography variant="caption" color="secondary">{candidate.interviewSlot}</SoftTypography>,
        interviewSchedule: <SoftTypography variant="caption" color="secondary">{`${interviewDate}, ${interviewTime}`}</SoftTypography>,
        communication: <SoftTypography variant="caption" color="secondary">{candidate.communication}</SoftTypography>,
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
          <>
            <Link to={`/viewCandidate/${candidate._id}`}>
              <IconButton color="primary">
                <VisibilityIcon />
              </IconButton>
            </Link>
            <Link to={`/editcandidate/${candidate._id}`}>
              <IconButton color="secondary">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton color="error" onClick={() => handleDelete(candidate._id)}>
              <DeleteIcon />
            </IconButton>
          </>
        ),
      };
    }),
  };
};

export default getCandidatesTableData;
