
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "slices/jobSlice";
import { createCandidate } from "slices/candidateSlice";
import { toast } from "react-toastify";
import { textFieldStyles, dropdownStyles } from "assets/textFieldStyles";

function AddCandidatePage() {
    const [phoneError, setPhoneError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const phoneRef = useRef();
    const locationRef = useRef();
    const jobRef = useRef();
    const slotRef = useRef();
    const scheduleRef = useRef();
    const personalityRef = useRef();
    const knowledgeRef = useRef();
    const interviewStatusRef = useRef();
    const statusRef = useRef();
    const communicationRef = useRef();

    const jobs = useSelector((state) => state.jobs.jobs);
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
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCandidate((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        dispatch(getJobs());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const requiredFields = [
            "name", "phone", "location", "interviewSlot", "interviewSchedule",
            "communication", "personality", "knowledge", "interviewStatus", "status", "job"
        ];

        for (let field of requiredFields) {
            if (!candidate[field]) {
                toast.error(`Please fill in the ${field} field.`);
                return;
            }
        }

        try {
            dispatch(createCandidate(candidate));
            toast.success("Candidate added successfully! 🎉");
            navigate("/Candidate");
        } catch (error) {
            console.error("Failed to add candidate:", error);
            toast.error("Error adding candidate. Please try again.");
        }
    };

    const handlePhoneChange = (e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, "");
        setCandidate({ ...candidate, phone: numericValue });
        setPhoneError('');
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <SoftBox mb={3}>
                    <Card sx={{ p: 3 }}>
                        <SoftTypography variant="h5" mb={3} textAlign="center">
                            Add Candidate
                        </SoftTypography>
                        <form onSubmit={handleSubmit}>
                            {/* Row 1: Name, Phone, Location */}
                            <SoftBox
                                mb={3}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(300px, 1fr))" },
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
                                    gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(300px, 1fr))" },
                                    gap: 3,
                                    alignItems: "flex-start"
                                }}
                            >
                                <FormControl sx={{ ...dropdownStyles }}>
                                    <InputLabel id="job-label" sx={{ fontSize: "1rem" }}>Select Job</InputLabel>
                                    <Select
                                        labelId="job-label"
                                        name="job"
                                        value={candidate.job || ""}
                                        inputRef={jobRef}
                                        onChange={handleChange}
                                        onClose={() => slotRef.current?.focus()}
                                        label="Select Job"
                                    >
                                        {jobs.map((job) => (
                                            <MenuItem key={job._id} value={job._id}>{job.title}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    inputRef={slotRef}
                                    name="interviewSlot"
                                    value={candidate.interviewSlot}
                                    onChange={handleChange}
                                    placeholder="Enter Time Slot"
                                    label="Time Slot"
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), scheduleRef.current?.focus())}
                                    InputLabelProps={{ sx: { fontSize: "1rem" } }}
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
                                    gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(300px, 1fr))" },
                                    gap: 3,
                                    alignItems: "flex-start"
                                }}
                            >
                                {[
                                    { label: "Communication", name: "communication", ref: communicationRef, nextRef: personalityRef },
                                    { label: "Personality", name: "personality", ref: personalityRef, nextRef: knowledgeRef },
                                    { label: "Knowledge", name: "knowledge", ref: knowledgeRef, nextRef: interviewStatusRef }
                                ].map(({ label, name, ref, nextRef }) => (
                                    <FormControl key={name} sx={{ ...dropdownStyles }}>
                                        <InputLabel id={`${name}-label`} sx={{ fontSize: "1rem" }}>Select {label}</InputLabel>
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
                                        >
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <MenuItem key={value} value={value}>{value}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ))}
                            </SoftBox>

                            {/* Row 4: Interview Status, Status */}
                            <SoftBox
                                mb={3}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "minmax(auto, 340px)",      // Single column on mobile
                                        sm: "minmax(auto, 340px) minmax(auto, 340px)", // Two columns on larger screens
                                    },
                                    gap: 3,
                                    justifyContent: "flex-start",     // Align to left instead of stretching
                                    width: "fit-content"
                                }}
                            >
                                <FormControl sx={{ ...dropdownStyles }}>
                                    <InputLabel id="interview-status-label" sx={{ fontSize: "1rem" }}>Select Interview Status</InputLabel>
                                    <Select
                                        labelId="interview-status-label"
                                        name="interviewStatus"
                                        value={candidate.interviewStatus || ""}
                                        inputRef={interviewStatusRef}
                                        onChange={handleChange}
                                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), statusRef.current?.focus())}
                                        label="Select Interview Status"
                                    >
                                        {["Offered", "Accepted", "Missed", "Interviewed", "Rescheduled"].map((status) => (
                                            <MenuItem key={status} value={status}>{status}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ ...dropdownStyles }}>
                                    <InputLabel id="status-label" sx={{ fontSize: "1rem" }}>Select Status</InputLabel>
                                    <Select
                                        labelId="status-label"
                                        name="status"
                                        value={candidate.status || ""}
                                        inputRef={statusRef}
                                        onChange={handleChange}
                                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleSubmit(e))}
                                        label="Select Status"
                                    >
                                        {['Contacted', 'Moved to Round 2', 'Moved to Round 3', 'Final Round', 'Shortlisted', 'Rejected', 'Hired', 'On Hold'].map((status) => (
                                            <MenuItem key={status} value={status}>{status}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </SoftBox>

                            {/* Buttons */}
                            <SoftBox
                                mt={3}
                                display="flex"
                                justifyContent="space-between"
                                flexDirection={{ xs: "column", sm: "row" }}
                                gap={2}
                            >
                                <SoftButton
                                    type="submit"
                                    variant="gradient"
                                    color="info"
                                    sx={{
                                        width: 'auto', // Ensures content-based width
                                        px: 3, // Adds horizontal padding
                                    }}
                                >
                                    Adddd Candidate
                                </SoftButton>
                                <SoftButton
                                    variant="gradient"
                                    color="error"
                                    onClick={() => navigate("/Candidate")}
                                    sx={{
                                        width: 'auto', // Ensures content-based width
                                        px: 3, // Adds horizontal padding
                                    }}
                                >
                                    Cancel
                                </SoftButton>
                            </SoftBox>
                        </form>
                    </Card>
                </SoftBox>
            </SoftBox>
            <Footer />
        </DashboardLayout>
    );
}

export default AddCandidatePage;