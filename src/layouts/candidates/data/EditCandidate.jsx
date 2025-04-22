
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "slices/jobSlice";
import { createCandidate } from "slices/candidateSlice";
import { getCandidateById } from "slices/candidateSlice";
import { updateCandidate } from "slices/candidateSlice";
import { toast } from "react-toastify";
import SoftButton from "components/SoftButton";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { textFieldStyles, dropdownStyles, inputLabelStyle, dropdownIconStyle } from "assets/textFieldStyles";
import Box from '@mui/material/Box';

function EditCandidatePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const jobs = useSelector((State) => State.jobs.jobs.jobs);
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
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");
    const flag = localStorage.getItem("flag");
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
    const [slotError, setSlotError] = useState(false);

    const timeSlotRegex = /^(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\s*\|\s*(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)\s*-\s*(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

    useEffect(() => {
        dispatch(getJobs());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getCandidateById(id));
    }, [dispatch]);

    // Populate form fields when candidate data is available
    useEffect(() => {
        console.log("candidateeeeeeeee:::::", candidatee);
        console.log("jobsxxxxxxxxxxccccccccccccccccccccsssssss:::::", jobs);
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
                job: candidatee.job?._id || "",
                comments: candidatee.comments || ""
            });
        }
    }, [candidatee]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCandidate((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("candidateData:::::", candidate);

        try {
            dispatch(updateCandidate({ id, updatedData: candidate })); // Dispatch update action
            toast.success("Candidate updated successfully! 🎉"); // Success toast
            console.log("candidate.job...........candidate.job", candidate.job);
            localStorage.removeItem("flag");
            // navigate(`/jobs?page=${page}`);
            if (flag) {

                navigate(candidate.job ? `/Candidates/${candidate.job}` : `/Candidate`);
            } else {
                navigate('/Candidate');
            }
            // navigate(`/Candidates/${candidate.job}`); // Redirect after updating
        } catch (error) {
            console.error("Failed to update candidate:", error);
            toast.error("Error updating candidate. Please try again."); // Error toast
        }
    };
    const handlePhoneChange = (e) => {
        // Allow only numbers
        const numericValue = e.target.value.replace(/[^0-9]/g, "");

        setCandidate({
            ...candidate,
            phone: numericValue
        });

        setPhoneError(''); // Clear error when typing
    };
    return (

        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <SoftBox mb={3}>
                    <Card sx={{ p: 3 }}>
                        <SoftTypography variant="h5" mb={3} textAlign="center">
                            Edit Candidate
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
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={candidate.name}
                                    onChange={handleChange}
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), phoneRef.current?.focus())}
                                    placeholder="Enter candidate name"
                                    sx={textFieldStyles}
                                    InputLabelProps={{ sx: { fontSize: "1rem" } }}
                                />

                                <TextField
                                    inputRef={phoneRef}
                                    label="Phone"
                                    name="phone"
                                    value={candidate.phone}
                                    onChange={handlePhoneChange}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            if (/^\d{10}$/.test(candidate.phone)) {
                                                locationRef.current?.focus();
                                            } else {
                                                setPhoneError("Phone must be 10 digits");
                                            }
                                        }
                                    }}
                                    placeholder="Enter phone number"
                                    error={!!phoneError}
                                    helperText={phoneError}
                                    InputLabelProps={{ sx: { fontSize: "1rem" } }}
                                    inputProps={{ inputMode: "numeric", maxLength: 10 }}
                                    sx={textFieldStyles}
                                />

                                <TextField
                                    inputRef={locationRef}
                                    label="Location"
                                    name="location"
                                    value={candidate.location}
                                    onChange={handleChange}
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), jobRef.current?.focus())}
                                    placeholder="Enter location"
                                    InputLabelProps={{ sx: { fontSize: "1rem" } }}
                                    sx={textFieldStyles}
                                />
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
                                <FormControl sx={{ ...dropdownStyles, position: "relative" }}>
                                    <InputLabel id="job-label" sx={{ ...inputLabelStyle }}>Select Job</InputLabel>
                                    <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>

                                        <Select
                                            labelId="job-label"
                                            name="job"
                                            value={candidate.job || ""}
                                            inputRef={jobRef}
                                            onChange={handleChange}
                                            onClose={() => slotRef.current?.focus()}
                                            label="Select Job"
                                            sx={{
                                                width: "100%", // Ensures full width
                                                paddingRight: "40px", // Creates space for the icon
                                            }}
                                        >
                                            {jobs?.map((job) => (
                                                <MenuItem key={job._id} value={job._id}>{job.title}</MenuItem>
                                            ))}
                                        </Select>
                                        <ArrowDropDownCircleIcon
                                            sx={{
                                                ...dropdownIconStyle
                                            }}
                                        />
                                    </Box>
                                </FormControl>

                                {/* <TextField
                                    inputRef={slotRef}
                                    name="interviewSlot"
                                    value={candidate.interviewSlot}
                                    onChange={handleChange}
                                    placeholder="Time Offered"
                                    label="Time Offered"
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), scheduleRef.current?.focus())}
                                    InputLabelProps={{ sx: { fontSize: "1rem" } }}
                                    sx={textFieldStyles}
                                /> */}
                                <TextField
                                    inputRef={slotRef}
                                    name="interviewSlot"
                                    value={candidate.interviewSlot}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value.length <= 50) {
                                            handleChange(e);
                                            setSlotError(false);
                                        }
                                    }}
                                    onBlur={(e) => {
                                        const value = e.target.value.trim();

                                        if (value && !timeSlotRegex.test(value)) {
                                            setSlotError(true);
                                        } else {
                                            setSlotError(false);
                                        }
                                    }}
                                    error={slotError}
                                    helperText={
                                        slotError
                                            ? "Format: 18 April 2025 | 8:00 AM - 8:15 AM"
                                            : ""
                                    }
                                    placeholder="e.g. 18 April 2025 | 8:00 AM - 8:15 AM"
                                    label="Time Offered"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            const value = e.target.value.trim();

                                            if (!timeSlotRegex.test(value)) {
                                                setSlotError(true);
                                            } else {
                                                setSlotError(false);
                                                scheduleRef.current?.focus();
                                            }
                                        }
                                    }}
                                    inputProps={{
                                        maxLength: 50,
                                    }}
                                    InputLabelProps={{
                                        sx: { ...inputLabelStyle },
                                    }}
                                    sx={textFieldStyles}
                                />

                                <TextField
                                    inputRef={scheduleRef}
                                    label="Interview Schedule"
                                    type="date"
                                    name="interviewSchedule"
                                    value={candidate.interviewSchedule}
                                    onChange={handleChange}
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), communicationRef.current?.focus())}
                                    InputLabelProps={{
                                        shrink: true,
                                        sx: { fontSize: "1rem" }
                                    }}
                                    sx={textFieldStyles}
                                />
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
                                {[
                                    { label: "Communication", name: "communication", ref: communicationRef, nextRef: personalityRef },
                                    { label: "Personality", name: "personality", ref: personalityRef, nextRef: knowledgeRef },
                                    { label: "Knowledge", name: "knowledge", ref: knowledgeRef, nextRef: interviewStatusRef }
                                ].map(({ label, name, ref, nextRef }) => (
                                    <FormControl key={name} sx={{ ...dropdownStyles, position: "relative" }}>
                                        <InputLabel id={`${name}-label`} sx={{ ...inputLabelStyle }}>Select {label}</InputLabel>
                                        <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>

                                            <Select
                                                labelId={`${name}-label`}
                                                name={name}
                                                value={candidate[name] || ""}
                                                inputRef={ref}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    nextRef?.current?.focus();
                                                }}
                                                label={`Select ${label}`}
                                                sx={{
                                                    width: "100%", // Ensures full width
                                                    paddingRight: "40px", // Creates space for the icon
                                                }}
                                            >
                                                {[1, 2, 3, 4, 5].map((value) => (
                                                    <MenuItem key={value} value={value}>{value}</MenuItem>
                                                ))}
                                            </Select>
                                            <ArrowDropDownCircleIcon
                                                sx={{
                                                    ...dropdownIconStyle
                                                }}
                                            />
                                        </Box>
                                    </FormControl>
                                ))}
                            </SoftBox>

                            {/* Row 4: Interview Status, Status */}
                            <SoftBox
                                mb={3}
                                // sx={{
                                //     display: "grid",
                                //     gridTemplateColumns: { 
                                //         xs: "1fr", 
                                //         sm: "repeat(2, 1fr)"
                                //     },
                                //     gap: 3,
                                //     alignItems: "flex-start"
                                // }}
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
                                <FormControl sx={{ ...dropdownStyles, position: "relative" }}>
                                    <InputLabel id="interview-status-label" sx={{ ...inputLabelStyle }}>Select Interview Status</InputLabel>
                                    <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>

                                        <Select
                                            labelId="interview-status-label"
                                            name="interviewStatus"
                                            value={candidate.interviewStatus || ""}
                                            inputRef={interviewStatusRef}
                                            onChange={handleChange}
                                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), statusRef.current?.focus())}
                                            label="Select Interview Status"
                                            sx={{
                                                width: "100%", // Ensures full width
                                                paddingRight: "40px", // Creates space for the icon
                                            }}
                                        >
                                            {["Scheduled", "Offered", "Accepted", "Missed", "Interviewed", "Rescheduled"].map((status) => (
                                                <MenuItem key={status} value={status}>{status}</MenuItem>
                                            ))}
                                        </Select>
                                        <ArrowDropDownCircleIcon
                                            sx={{
                                                ...dropdownIconStyle
                                            }}
                                        />
                                    </Box>
                                </FormControl>

                                <FormControl sx={{ ...dropdownStyles, position: "relative" }}>
                                    <InputLabel id="status-label" sx={{ ...inputLabelStyle }}>Select Status</InputLabel>
                                    <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>

                                        <Select
                                            labelId="status-label"
                                            name="status"
                                            value={candidate.status || ""}
                                            inputRef={statusRef}
                                            onChange={handleChange}
                                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleSubmit(e))}
                                            label="Select Status"
                                            sx={{
                                                width: "100%", // Ensures full width
                                                paddingRight: "40px", // Creates space for the icon
                                            }}
                                        >
                                            {['Contacted', 'Moved to Round 2', 'Moved to Round 3', 'Final Round', 'Shortlisted', 'Rejected', 'Hired', 'On Hold'].map((status) => (
                                                <MenuItem key={status} value={status}>{status}</MenuItem>
                                            ))}
                                        </Select>
                                        <ArrowDropDownCircleIcon
                                            sx={{
                                                ...dropdownIconStyle
                                            }}
                                        />
                                    </Box>
                                </FormControl>
                                <TextField
                                    label="Comments"
                                    name="comments"
                                    value={candidate.comments}
                                    onChange={handleChange}
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), phoneRef.current?.focus())}
                                    placeholder="Write comments"
                                    sx={textFieldStyles}
                                    InputLabelProps={{
                                        sx: { ...inputLabelStyle },
                                    }}
                                />
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
                                    onClick={() => navigate(flag ? " `/Candidates/${candidate.job}`" : "/Candidate")}
                                    sx={{
                                        width: { xs: '100%', sm: 'auto' },
                                        px: 3,
                                    }}
                                >
                                    Cancel
                                </SoftButton>
                                <SoftButton
                                    type="submit"
                                    variant="gradient"
                                    color="info"
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

export default EditCandidatePage