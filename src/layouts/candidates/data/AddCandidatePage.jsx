
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
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "slices/jobSlice";
import { createCandidate } from "slices/candidateSlice";
import { toast } from "react-toastify";
import textFieldStyles from "assets/textFieldStyles";

function AddCandidatePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const phoneRef = useRef();
    const locationRef = useRef();
    const jobRef = useRef();
    const slotRef = useRef();
    const scheduleRef = useRef();
    const status = useRef();

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

        console.log("Adding candidate:", candidate);

        try {
            dispatch(createCandidate(candidate));
            toast.success("Candidate added successfully! 🎉");  // Success toast
            navigate("/Candidate"); // Redirect after submission
        } catch (error) {
            console.error("Failed to add candidate:", error);
            toast.error("Error adding candidate. Please try again.");  // Error toast
        }
    };
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <SoftBox mb={3}>
                    <Card sx={{ p: 3 }}>
                        <SoftTypography variant="h5" mb={3}>
                            Add Candidate
                        </SoftTypography>
                        <form onSubmit={handleSubmit}>
                            {/* Name Field */}
                            <SoftBox mb={3}>
                                <SoftTypography variant="body1" mb={1}>
                                    Name
                                </SoftTypography>
                                <TextField
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
                                    margin="none"
                                    sx={textFieldStyles}
                                />

                            </SoftBox>

                            {/* Phone Field */}
                            <SoftBox mb={3}>
                                <SoftTypography variant="body1" mb={1}>
                                    Phone
                                </SoftTypography>
                                <TextField
                                    fullWidth
                                    inputRef={phoneRef}
                                    name="phone"
                                    value={candidate.phone}
                                    onChange={handleChange}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            locationRef.current?.focus();
                                        }
                                    }}
                                    margin="none"
                                    sx={{
                                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                        borderRadius: "5px",
                                    }}
                                />

                            </SoftBox>

                            {/* Location Field */}
                            <SoftBox mb={3}>
                                <SoftTypography variant="body1" mb={1}>
                                    Location
                                </SoftTypography>
                                <TextField
                                    inputRef={locationRef}
                                    name="location"
                                    value={candidate.location}
                                    onChange={handleChange}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            slotRef.current?.focus();
                                        }
                                    }}
                                    placeholder="Enter Location"
                                    margin="none"
                                    sx={textFieldStyles}
                                />

                            </SoftBox>
                            {/* Job Title Dropdown */}
                            <SoftBox mb={3}>
                                <SoftTypography variant="body1" mb={1}>Job Title</SoftTypography>
                                <FormControl fullWidth>
                                    <InputLabel>Select Job</InputLabel>
                                    <Select name="job" value={candidate.jobId} onChange={handleChange}>
                                        {jobs.map((job) => (
                                            <MenuItem key={job._id} value={job._id}>{job.title}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </SoftBox>

                            {/* Time Slot Field */}
                            <SoftBox mb={3}>
                                <SoftTypography variant="body1" mb={1}>
                                    Time Slot
                                </SoftTypography>
                                <TextField
                                    fullWidth
                                    name="interviewSlot"
                                    value={candidate.interviewSlot}
                                    onChange={handleChange}
                                    margin="none"
                                    sx={{
                                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                        borderRadius: "5px",
                                    }}
                                />
                            </SoftBox>

                            {/* Interview Schedule Field */}
                            <SoftBox mb={3}>
                                <SoftTypography variant="body1" mb={1}>
                                    Interview Schedule
                                </SoftTypography>
                                <TextField
                                    inputRef={scheduleRef}
                                    fullWidth
                                    name="interviewSchedule"
                                    type="date"
                                    value={candidate.interviewSchedule}
                                    onChange={handleChange}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            handleSubmit(e);
                                        }
                                    }}
                                    margin="none"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                        borderRadius: "5px",
                                    }}
                                />


                            </SoftBox>

                            {/* Communication Dropdown */}
                            <SoftBox mb={3}>
                                <SoftTypography variant="body1" mb={1}>
                                    Communication
                                </SoftTypography>
                                <FormControl fullWidth>
                                    <InputLabel>Communication</InputLabel>
                                    <Select
                                        name="communication"
                                        value={candidate.communication}
                                        onChange={handleChange}
                                        sx={{
                                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <MenuItem key={value} value={value}>
                                                {value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </SoftBox>

                            {/* Personality Dropdown */}
                            <SoftBox mb={3}>
                                <SoftTypography variant="body1" mb={1}>
                                    Personality
                                </SoftTypography>
                                <FormControl fullWidth>
                                    <InputLabel>Personality</InputLabel>
                                    <Select
                                        name="personality"
                                        value={candidate.personality}
                                        onChange={handleChange}
                                        sx={{
                                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <MenuItem key={value} value={value}>
                                                {value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </SoftBox>

                            {/* Knowledge Dropdown */}
                            <SoftBox mb={3}>
                                <SoftTypography variant="body1" mb={1}>
                                    Knowledge
                                </SoftTypography>
                                <FormControl fullWidth>
                                    <InputLabel>Knowledge</InputLabel>
                                    <Select
                                        name="knowledge"
                                        value={candidate.knowledge}
                                        onChange={handleChange}
                                        sx={{
                                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <MenuItem key={value} value={value}>
                                                {value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </SoftBox>

                            {/* Interview Status Dropdown */}
                            <SoftBox mb={3}>
                                <SoftTypography variant="body1" mb={1}>
                                    Interview Status
                                </SoftTypography>
                                <FormControl fullWidth>
                                    <InputLabel>Interview Status</InputLabel>
                                    <Select
                                        name="interviewStatus"
                                        value={candidate.interviewStatus}
                                        onChange={handleChange}
                                        sx={{
                                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        {[
                                            "Offered",
                                            "Accepted",
                                            "Missed",
                                            "Interviewed",
                                            "Rescheduled",
                                        ].map((status) => (
                                            <MenuItem key={status} value={status}>
                                                {status}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </SoftBox>

                            {/* Status Dropdown */}
                            <SoftBox mb={3}>
                                <SoftTypography variant="body1" mb={1}>
                                    Status
                                </SoftTypography>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        name="status"
                                        value={candidate.status}
                                        onChange={handleChange}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                handleSubmit(e);
                                            }
                                        }}
                                        sx={{
                                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                            borderRadius: "5px",
                                        }}
                                    >

                                        {[
                                            "Pending",
                                            "Shortlisted",
                                            "Rejected",
                                            "Hired",
                                            "Applied",
                                        ].map((status) => (
                                            <MenuItem key={status} value={status}>
                                                {status}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </SoftBox>

                            {/* Submit Button */}
                            <SoftBox mt={3} display="flex" justifyContent="space-between">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Add Candidate
                                </Button>
                                <Button
                                    variant="outlined"
                                    style={{ backgroundColor: "red", color: "#ffffff" }}
                                    onClick={() => navigate("/Candidate")}
                                >
                                    Cancel
                                </Button>
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