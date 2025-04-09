
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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
import { textFieldStyles, dropdownStyles, labelSize } from "assets/textFieldStyles";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function AddCandidatePage() {
    const [phoneError, setPhoneError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
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


    // const [jobs, setJobs] = useState([]);
    const jobs = useSelector((state) => state.jobs.jobs)
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

        // Check if any required field is empty
        const requiredFields = [
            "name",
            "phone",
            "location",
            "interviewSlot",
            "interviewSchedule",
            "communication",
            "personality",
            "knowledge",
            "interviewStatus",
            "status",
            "job"
        ];

        for (let field of requiredFields) {
            if (!candidate[field]) {
                toast.error(`Please fill in the ${field} field.`);
                return; // Stop form submission
            }
        }

        // All fields valid, submit
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
                    <Card sx={{ p: 3, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <SoftTypography variant="h5" mb={3}>
                            Add Candidate
                        </SoftTypography>
                        <form onSubmit={handleSubmit}>
                            {/* Row 1: Name, Phone, Location */}
                            <SoftBox
                                mb={3}
                                sx={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "flex-start" }}
                            >
                            
                                <SoftBox sx={{ flex: "0 0 auto", minWidth: 320 }}>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        value={candidate.name}
                                        onChange={handleChange}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                phoneRef.current?.focus();
                                            }
                                        }}
                                        placeholder="Enter candidate name"
                                        sx={textFieldStyles}
                                        fullWidth
                                        variant="outlined"
                                        InputLabelProps={{
                                            sx: {
                                                fontSize: "1rem", // 👈 sets the label font size
                                            },
                                        }}
                                    />
                                </SoftBox>

                                <SoftBox sx={{ flex: "0 0 auto", minWidth: 320 }}>
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
                                        InputLabelProps={{
                                            sx: {
                                                fontSize: "1rem", // 👈 sets the label font size
                                            },
                                        }}
                                        inputProps={{ inputMode: "numeric", maxLength: 10 }}
                                        sx={textFieldStyles}
                                    />
                                </SoftBox>

                                <SoftBox sx={{ flex: "0 0 auto", minWidth: 320 }}>
                                    <TextField
                                        inputRef={locationRef}
                                        label="Location"
                                        name="location"
                                        value={candidate.location}
                                        onChange={handleChange}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                jobRef.current?.focus();
                                            }
                                        }}
                                        placeholder="Enter location"
                                        InputLabelProps={{
                                            sx: {
                                                fontSize: "1rem", // 👈 sets the label font size
                                            },
                                        }}
                                        sx={textFieldStyles}
                                    />
                                </SoftBox>
                            </SoftBox>

                            {/* Row 2: Job Title, Time Slot, Interview Schedule */}
                            <SoftBox
                                mb={3}
                                sx={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "flex-start" }}
                            >
                                <SoftBox sx={{ flex: "0 0 auto", minWidth: 320 }}>
                                    <FormControl fullWidth sx={{ ...dropdownStyles, width: "370px" }}>
                                        <InputLabel id="demo-select-label" sx={{ fontSize: "1rem", }}>Select Job</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"

                                            name="job"
                                            value={candidate.jobId || ""}
                                            inputRef={jobRef}
                                            onChange={handleChange}
                                            onClose={() => slotRef.current?.focus()}

                                            sx={{ width: "100%" }}
                                        >

                                            {jobs.map((job) => (
                                                <MenuItem key={job._id} value={job._id}>{job.title}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </SoftBox>

                                <SoftBox sx={{ flex: "0 0 auto", minWidth: 320 }}>
                                    <TextField
                                        inputRef={slotRef}
                                        name="interviewSlot"
                                        value={candidate.interviewSlot}
                                        onChange={handleChange}
                                        placeholder="Enter Time Slot"
                                        label="Time Slot"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                scheduleRef.current?.focus();
                                            }
                                        }}
                                        InputLabelProps={{
                                            sx: {
                                                fontSize: "1rem", // 👈 sets the label font size
                                            },
                                        }}
                                        sx={textFieldStyles}
                                    />
                                </SoftBox>
                                
                                <SoftBox sx={{ flex: "0 0 auto", minWidth: 320 }}>
                                    <TextField
                                        inputRef={scheduleRef}
                                        label="Interview Schedule"
                                        type="date"
                                        name="interviewSchedule"
                                        value={candidate.interviewSchedule}
                                        onChange={handleChange}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                communicationRef.current?.focus();
                                            }
                                        }}
                                        InputLabelProps={{
                                            shrink: true, // Ensures the label stays above the input
                                            sx: {
                                                fontSize: "1rem", // Sets label font size
                                                color: "black", // Adjusts label color if needed
                                            },
                                        }}
                                        // sx={{
                                        //     width: "100%", // Ensures the field takes the full width
                                        //     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Adds a subtle shadow
                                        //     borderRadius: "5px", // Rounds the input field edges
                                        // }}
                                        sx={textFieldStyles}
                                    />
                                </SoftBox>

                            </SoftBox>

                            {/* Row 3: Communication, Personality, Knowledge */}
                            <SoftBox
                                mb={3}
                                sx={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "flex-start" }}
                            >
                                {[
                                    { label: "Communication", name: "communication", ref: communicationRef, nextRef: personalityRef },
                                    { label: "Personality", name: "personality", ref: personalityRef, nextRef: knowledgeRef },
                                    { label: "Knowledge", name: "knowledge", ref: knowledgeRef, nextRef: interviewStatusRef }
                                ].map(({ label, name, ref, nextRef }) => (
                                    <SoftBox key={name} sx={{ flex: "0 0 auto", minWidth: 220 }}>
                                        <FormControl fullWidth sx={{ ...dropdownStyles, width: "370px" }}>
                                            <InputLabel id="demo-select-label" sx={{ fontSize: "1rem", }}>Select {label}</InputLabel>

                                            <Select
                                                name={name}
                                                value={candidate[name] || ""}
                                                inputRef={ref}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    nextRef?.current?.focus();
                                                }}

                                            >

                                                {[1, 2, 3, 4, 5].map((value) => (
                                                    <MenuItem key={value} value={value}>{value}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </SoftBox>
                                ))}
                            </SoftBox>

                            {/* Row 4: Interview Status, Status */}
                            <SoftBox
                                mb={3}
                                sx={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "flex-start" }}
                            >
                                <SoftBox sx={{ flex: "0 0 auto", minWidth: 220 }}>
                                    <FormControl fullWidth sx={{ ...dropdownStyles, width: "370px" }}>
                                        <InputLabel id="demo-select-label" sx={{ fontSize: "1rem", }}>Select Interview Status</InputLabel>
                                        <Select
                                            name="interviewStatus"
                                            value={candidate.interviewStatus || ""}
                                            inputRef={interviewStatusRef}
                                            onChange={handleChange}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    statusRef.current?.focus();
                                                }
                                            }}

                                        >

                                            {["Offered", "Accepted", "Missed", "Interviewed", "Rescheduled"].map((status) => (
                                                <MenuItem key={status} value={status}>{status}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </SoftBox>

                                <SoftBox sx={{ flex: "0 0 auto", minWidth: 220 }}>
                                    <FormControl fullWidth sx={{ ...dropdownStyles, width: "370px" }}>
                                        <InputLabel id="demo-select-label" sx={{ fontSize: "1rem", }}>Select Status</InputLabel>

                                        <Select
                                            name="status"
                                            value={candidate.status || ""}
                                            inputRef={statusRef}
                                            onChange={handleChange}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    handleSubmit(e);
                                                }
                                            }}
                                        // sx={textFieldStyles}
                                        >

                                            {['Contacted', 'Moved to Round 2', ' Moved to Round 3', 'Final Round', 'Shortlisted', 'Rejected', 'Hired', 'On Hold'].map((status) => (
                                                <MenuItem key={status} value={status}>{status}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </SoftBox>
                            </SoftBox>

                            {/* Submit & Cancel Buttons */}
                            <SoftBox mt={3} display="flex" justifyContent="space-between">
                                <SoftButton type="submit" variant="gradient" color="info" onClick={handleSubmit}>
                                    Add Candidate
                                </SoftButton>

                                <SoftButton
                                    variant="gradient"
                                    color="error"
                                    onClick={() => navigate("/Candidate")}
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

export default AddCandidatePage