
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "slices/jobSlice";
import { createCandidate } from "slices/candidateSlice";
import { getCandidateById } from "slices/candidateSlice";
import { updateCandidate } from "slices/candidateSlice";
import { textFieldStyles } from "assets/textFieldStyles";
import SoftButton from "components/SoftButton";
import { dropdownStyles } from "assets/textFieldStyles";

function ViewCandidate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const jobs = useSelector((State) => State.jobs.jobs);
    const candidatee = useSelector((State) => State.candidates.candidate);
    const [phoneError, setPhoneError] = useState('');

    const phoneRef = useRef();
    const locationRef = useRef();
    const jobRef = useRef();
    const slotRef = useRef();
    const scheduleRef = useRef();
    const status = useRef();
    const personalityRef = useRef();
    const knowledgeRef = useRef();
    const interviewStatusRef = useRef();
    const statusRef = useRef();
    const communicationRef = useRef();

    const [candidate, setCandidate] = useState({
        name: "",
        phone: "",
        location: "",
        interviewSlot: "",
        interviewSchedule: "",
        communication: "",
        personality: "",
        knowledge: "",
        interviewStatus: "",
        status: "",
        job: "",
        comments: ""
    });

    // Populate form fields when candidate data is available
    useEffect(() => {
        if (candidatee) {
            setCandidate({
                name: candidatee.name || "",
                phone: candidatee.phone || "",
                location: candidatee.location || "",
                interviewSlot: candidatee.interviewSlot || "",
                interviewSchedule: candidatee.interviewSchedule
                    ? new Date(candidatee.interviewSchedule).toISOString().split("T")[0]
                    : "",
                communication: candidatee.communication || "",
                personality: candidatee.personality || "",
                knowledge: candidatee.knowledge || "",
                interviewStatus: candidatee.interviewStatus || "",
                status: candidatee.status || "",
                job: candidatee.job?.title || "",
                comments: candidatee.comments || "",
            });
        }
    }, [candidatee]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCandidate((prev) => ({ ...prev, [name]: value }));
    };
    useEffect(() => {
        dispatch(getJobs({
            page: 1,
            limit: 10,
            searchQuery: "",
            statusFilter: "",
        }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getCandidateById(id));
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateCandidate({ id, updatedData: candidate })); // Dispatch update action
        navigate("/candidates"); // Redirect after updating
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <SoftBox mb={3}>
                    <Card sx={{ p: 3 }}>
                        <SoftTypography variant="h5" mb={3} textAlign="center">
                            View Candidate
                        </SoftTypography>
                        <form onSubmit={handleSubmit}>
                            {/* Row 1: Name, Phone, Location */}
                            <SoftBox
                                mb={3}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "1fr",
                                        sm: "repeat(2, 1fr)",
                                        md: "repeat(3, 1fr)"
                                    },
                                    gap: 3,
                                    alignItems: "flex-start"
                                }}
                            >

                                <SoftBox>
                                    <SoftTypography variant="subtitle1" fontWeight="bold" fontSize="1rem">
                                        Name
                                    </SoftTypography>
                                    <SoftTypography variant="body2" sx={{ fontSize: "0.85rem" }}>
                                        {candidate.name}
                                    </SoftTypography>
                                </SoftBox>
                                <SoftBox>
                                    <SoftTypography variant="subtitle1" fontWeight="bold" fontSize="1rem">
                                        Phone
                                    </SoftTypography>
                                    <SoftTypography variant="body2" sx={{ fontSize: "0.85rem" }}>
                                        {candidate.phone}
                                    </SoftTypography>
                                </SoftBox>

                                <SoftBox>
                                    <SoftTypography variant="subtitle1" fontWeight="bold" fontSize="1rem">
                                        Location
                                    </SoftTypography>
                                    <SoftTypography variant="body2" sx={{ fontSize: "0.85rem" }}>
                                        {candidate.location}
                                    </SoftTypography>
                                </SoftBox>


                            </SoftBox>

                            {/* Row 2: Job Title, Time Slot, Interview Schedule */}
                            <SoftBox
                                mb={3}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "1fr",
                                        sm: "repeat(2, 1fr)",
                                        md: "repeat(3, 1fr)"
                                    },
                                    gap: 3,
                                    alignItems: "flex-start"
                                }}
                            >

                                <SoftBox>
                                    <SoftTypography variant="subtitle1" fontWeight="bold" fontSize="1rem">
                                        Job
                                    </SoftTypography>
                                    <SoftTypography variant="body2" sx={{ fontSize: "0.85rem" }}>
                                        {candidate.job}
                                    </SoftTypography>
                                </SoftBox>
                                <SoftBox>
                                    <SoftTypography variant="subtitle1" fontWeight="bold" fontSize="1rem">
                                        Time Slot
                                    </SoftTypography>
                                    <SoftTypography variant="body2" sx={{ fontSize: "0.85rem" }}>
                                        {candidate.interviewSlot}
                                    </SoftTypography>
                                </SoftBox>
                                <SoftBox>
                                    <SoftTypography variant="subtitle1" fontWeight="bold" fontSize="1rem">
                                        Interview Schedule
                                    </SoftTypography>
                                    <SoftTypography variant="body2" sx={{ fontSize: "0.85rem" }}>
                                        {candidate.interviewSchedule}
                                    </SoftTypography>
                                </SoftBox>

                            </SoftBox>

                            {/* Row 3: Communication, Personality, Knowledge */}
                            <SoftBox
                                mb={3}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "1fr",
                                        sm: "repeat(2, 1fr)",
                                        md: "repeat(3, 1fr)"
                                    },
                                    gap: 3,
                                    alignItems: "flex-start"
                                }}
                            >
                                <SoftBox>
                                    <SoftTypography variant="subtitle1" fontWeight="bold" fontSize="1rem">
                                        Communication
                                    </SoftTypography>
                                    <SoftTypography variant="body2" sx={{ fontSize: "0.85rem" }}>
                                    {candidate.communication?.trim() || "---"}
                                    </SoftTypography>
                                </SoftBox>
                                <SoftBox>
                                    <SoftTypography variant="subtitle1" fontWeight="bold" fontSize="1rem">
                                        Personality
                                    </SoftTypography>
                                    <SoftTypography variant="body2" sx={{ fontSize: "0.85rem" }}>
                                        {candidate.personality.trim() || "---"}
                                    </SoftTypography>
                                </SoftBox>
                                <SoftBox>
                                    <SoftTypography variant="subtitle1" fontWeight="bold" fontSize="1rem">
                                        Knowledge
                                    </SoftTypography>
                                    <SoftTypography variant="body2" sx={{ fontSize: "0.85rem" }}>
                                        {candidate.knowledge.trim() || "---"}
                                    </SoftTypography>
                                </SoftBox>

                            </SoftBox>

                            {/* Row 4: Interview Status, Status */}
                            {/* <SoftBox
                                mb={3}

                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "1fr",
                                        sm: "repeat(2, 1fr)",
                                        md: "repeat(3, 1fr)"
                                    },
                                    gap: 3,
                                    alignItems: "flex-start"
                                }}
                            >
                                <SoftBox>
                                    <SoftTypography variant="subtitle1" fontWeight="bold" fontSize="1rem">
                                        Interview Status
                                    </SoftTypography>
                                    <SoftTypography variant="body2" sx={{ fontSize: "0.85rem" }}>
                                        {candidate.interviewStatus}
                                    </SoftTypography>
                                </SoftBox>
                                <SoftBox>
                                    <SoftTypography variant="subtitle1" fontWeight="bold" fontSize="1rem">
                                        Status
                                    </SoftTypography>
                                    <SoftTypography variant="body2" sx={{ fontSize: "0.85rem" }}>
                                        {candidate.status}
                                    </SoftTypography>
                                </SoftBox>
                                <SoftBox>
                                    <SoftTypography variant="subtitle1" fontWeight="bold" fontSize="1rem">
                                        Comments
                                    </SoftTypography>
                                    <SoftTypography variant="body2" sx={{ fontSize: "0.85rem" }}>
                                        {candidate.comments}
                                    </SoftTypography>
                                </SoftBox>

                            </SoftBox> */}

                            <SoftBox
                                mb={3}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "1fr",
                                        sm: "repeat(2, 1fr)",
                                        md: "repeat(3, 1fr)",
                                    },
                                    gap: 3,
                                    alignItems: "flex-start",
                                }}
                            >
                                {/** Repeat for each field */}
                                <SoftBox sx={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                                    <SoftTypography variant="subtitle1" fontWeight="bold" fontSize="1rem">
                                        Interview Status
                                    </SoftTypography>
                                    <SoftTypography variant="body2" sx={{ fontSize: "0.85rem", wordBreak: "break-word" }}>
                                        {candidate.interviewStatus.trim() || "---"}
                                    </SoftTypography>
                                </SoftBox>

                                <SoftBox sx={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                                    <SoftTypography variant="subtitle1" fontWeight="bold" fontSize="1rem">
                                        Status
                                    </SoftTypography>
                                    <SoftTypography variant="body2" sx={{ fontSize: "0.85rem", wordBreak: "break-word" }}>
                                        {candidate.status.trim() || "---"}
                                    </SoftTypography>
                                </SoftBox>

                                <SoftBox sx={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                                    <SoftTypography variant="subtitle1" fontWeight="bold" fontSize="1rem">
                                        Comments
                                    </SoftTypography>
                                    <SoftTypography variant="body2" sx={{ fontSize: "0.85rem", wordBreak: "break-word" }}>
                                        {candidate.comments.trim() || "---"}
                                    </SoftTypography>
                                </SoftBox>
                            </SoftBox>


                            {/* Buttons */}
                            <SoftBox
                                mt={3}
                                display="flex"
                                justifyContent="flex-end"
                                flexDirection={{ xs: "column", sm: "row" }}
                                gap={2}
                            >

                                <SoftButton
                                    variant="gradient"
                                    color="error"
                                    onClick={() => navigate("/Candidate")}
                                    sx={{
                                        width: { xs: '100%', sm: 'auto' },
                                        px: 3,
                                    }}
                                >
                                    Back
                                </SoftButton>
                                <SoftButton
                                    variant="gradient"
                                    color="info"
                                    onClick={() => navigate(`/editCandidate/${candidate._id}`)}
                                    sx={{
                                        width: { xs: '100%', sm: 'auto' },
                                        px: 3,
                                    }}
                                >
                                    Edit Candidate
                                </SoftButton>
                            </SoftBox>
                        </form>
                    </Card>
                </SoftBox>
            </SoftBox>
        </DashboardLayout>
    );
}

export default ViewCandidate