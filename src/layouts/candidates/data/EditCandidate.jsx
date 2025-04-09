
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
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "slices/jobSlice";
import { createCandidate } from "slices/candidateSlice";
import { getCandidateById } from "slices/candidateSlice";
import { updateCandidate } from "slices/candidateSlice";
import { toast } from "react-toastify";
import { textFieldStyles } from "assets/textFieldStyles";
import SoftButton from "components/SoftButton";
import { dropdownStyles } from "assets/textFieldStyles";

function EditCandidatePage() {
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

    });

    // Populate form fields when candidate data is available
    useEffect(() => {
        console.log("candidateeeeeeeee:::::", candidatee);
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
            });
        }
    }, [candidatee]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCandidate((prev) => ({ ...prev, [name]: value }));
    };
    useEffect(() => {
        dispatch(getJobs());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getCandidateById(id));
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("candidateData:::::", candidate);

        try {
            dispatch(updateCandidate({ id, updatedData: candidate })); // Dispatch update action
            toast.success("Candidate updated successfully! 🎉"); // Success toast
            navigate('/Candidate'); // Redirect after updating
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
        // <DashboardLayout>
        //     <DashboardNavbar />
        //     <SoftBox py={3}>
        //         <SoftBox mb={3}>
        //             <Card sx={{ p: 3 }}>
        //                 <SoftTypography variant="h5" mb={3}>
        //                     Add Candidate
        //                 </SoftTypography>
        //                 <form onSubmit={handleSubmit}>
        //                     {/* Row 1: Name, Phone, Location */}
        //                     <SoftBox
        //                         mb={3}
        //                         sx={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "flex-start" }}
        //                     >

        //                         <SoftBox sx={{ flex: "0 0 auto", minWidth: 320 }}>
        //                             <TextField
        //                                 label="Name"
        //                                 name="name"
        //                                 value={candidate.name}
        //                                 onChange={handleChange}
        //                                 onKeyDown={(e) => {
        //                                     if (e.key === "Enter") {
        //                                         e.preventDefault();
        //                                         phoneRef.current?.focus();
        //                                     }
        //                                 }}
        //                                 placeholder="Enter candidate name"
        //                                 sx={textFieldStyles}
        //                                 fullWidth
        //                                 variant="outlined"
        //                                 InputLabelProps={{
        //                                     sx: {
        //                                         fontSize: "1rem", // 👈 sets the label font size
        //                                     },
        //                                 }}
        //                             />
        //                         </SoftBox>

        //                         <SoftBox sx={{ flex: "0 0 auto", minWidth: 320 }}>
        //                             <TextField
        //                                 inputRef={phoneRef}
        //                                 label="Phone"
        //                                 name="phone"
        //                                 value={candidate.phone}
        //                                 onChange={handlePhoneChange}
        //                                 onKeyDown={(e) => {
        //                                     if (e.key === "Enter") {
        //                                         e.preventDefault();
        //                                         if (/^\d{10}$/.test(candidate.phone)) {
        //                                             locationRef.current?.focus();
        //                                         } else {
        //                                             setPhoneError("Phone must be 10 digits");
        //                                         }
        //                                     }
        //                                 }}
        //                                 placeholder="Enter phone number"
        //                                 error={!!phoneError}
        //                                 helperText={phoneError}
        //                                 InputLabelProps={{
        //                                     sx: {
        //                                         fontSize: "1rem", // 👈 sets the label font size
        //                                     },
        //                                 }}
        //                                 inputProps={{ inputMode: "numeric", maxLength: 10 }}
        //                                 sx={textFieldStyles}
        //                             />
        //                         </SoftBox>

        //                         <SoftBox sx={{ flex: "0 0 auto", minWidth: 320 }}>
        //                             <TextField
        //                                 inputRef={locationRef}
        //                                 label="Location"
        //                                 name="location"
        //                                 value={candidate.location}
        //                                 onChange={handleChange}
        //                                 onKeyDown={(e) => {
        //                                     if (e.key === "Enter") {
        //                                         e.preventDefault();
        //                                         jobRef.current?.focus();
        //                                     }
        //                                 }}
        //                                 placeholder="Enter location"
        //                                 InputLabelProps={{
        //                                     sx: {
        //                                         fontSize: "1rem", // 👈 sets the label font size
        //                                     },
        //                                 }}
        //                                 sx={textFieldStyles}
        //                             />
        //                         </SoftBox>
        //                     </SoftBox>

        //                     {/* Row 2: Job Title, Time Slot, Interview Schedule */}
        //                     <SoftBox
        //                         mb={3}
        //                         sx={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "flex-start" }}
        //                     >
        //                         <SoftBox sx={{ flex: "0 0 auto", minWidth: 320 }}>
        //                             <FormControl fullWidth sx={{ ...dropdownStyles, width: "370px" }}>
        //                                 <InputLabel id="demo-select-label" sx={{ fontSize: "1rem", }}>Select Job</InputLabel>
        //                                 <Select
        //                                     labelId="demo-simple-select-label"

        //                                     name="job"
        //                                     value={candidate.job || ""}
        //                                     inputRef={jobRef}
        //                                     onChange={handleChange}
        //                                     onClose={() => slotRef.current?.focus()}

        //                                     sx={{ width: "100%" }}
        //                                 >

        //                                     {jobs.map((job) => (
        //                                         <MenuItem key={job._id} value={job._id}>{job.title}</MenuItem>
        //                                     ))}
        //                                 </Select>
        //                             </FormControl>
        //                         </SoftBox>

        //                         <SoftBox sx={{ flex: "0 0 auto", minWidth: 320 }}>
        //                             <TextField
        //                                 inputRef={slotRef}
        //                                 name="interviewSlot"
        //                                 value={candidate.interviewSlot}
        //                                 onChange={handleChange}
        //                                 placeholder="Enter Time Slot"
        //                                 label="Time Slot"
        //                                 onKeyDown={(e) => {
        //                                     if (e.key === "Enter") {
        //                                         e.preventDefault();
        //                                         scheduleRef.current?.focus();
        //                                     }
        //                                 }}
        //                                 InputLabelProps={{
        //                                     sx: {
        //                                         fontSize: "1rem", // 👈 sets the label font size
        //                                     },
        //                                 }}
        //                                 sx={textFieldStyles}
        //                             />
        //                         </SoftBox>
                               
        //                         <SoftBox sx={{ flex: "0 0 auto", minWidth: 320 }}>
        //                             <TextField
        //                                 inputRef={scheduleRef}
        //                                 label="Interview Schedule"
        //                                 type="date"
        //                                 name="interviewSchedule"
        //                                 value={candidate.interviewSchedule}
        //                                 onChange={handleChange}
        //                                 onKeyDown={(e) => {
        //                                     if (e.key === "Enter") {
        //                                         e.preventDefault();
        //                                         communicationRef.current?.focus();
        //                                     }
        //                                 }}
        //                                 InputLabelProps={{
        //                                     shrink: true, // Ensures the label stays above the input
        //                                     sx: {
        //                                         fontSize: "1rem", // Sets label font size
        //                                         color: "black", // Adjusts label color if needed
        //                                     },
        //                                 }}
        //                                 sx={{
        //                                     width: "100%", // Ensures the field takes the full width
        //                                     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Adds a subtle shadow
        //                                     borderRadius: "5px", // Rounds the input field edges
        //                                 }}
        //                             />
        //                         </SoftBox>

        //                     </SoftBox>

        //                     {/* Row 3: Communication, Personality, Knowledge */}
        //                     <SoftBox
        //                         mb={3}
        //                         sx={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "flex-start" }}
        //                     >
        //                         {[
        //                             { label: "Communication", name: "communication", ref: communicationRef, nextRef: personalityRef },
        //                             { label: "Personality", name: "personality", ref: personalityRef, nextRef: knowledgeRef },
        //                             { label: "Knowledge", name: "knowledge", ref: knowledgeRef, nextRef: interviewStatusRef }
        //                         ].map(({ label, name, ref, nextRef }) => (
        //                             <SoftBox key={name} sx={{ flex: "0 0 auto", minWidth: 220 }}>
        //                                 <FormControl fullWidth sx={{ ...dropdownStyles, width: "370px" }}>
        //                                     <InputLabel id="demo-select-label" sx={{ fontSize: "1rem", }}>Select {label}</InputLabel>

        //                                     <Select
        //                                         name={name}
        //                                         value={candidate[name] || ""}
        //                                         inputRef={ref}
        //                                         onChange={(e) => {
        //                                             handleChange(e);
        //                                             nextRef?.current?.focus();
        //                                         }}

        //                                     >

        //                                         {[1, 2, 3, 4, 5].map((value) => (
        //                                             <MenuItem key={value} value={value}>{value}</MenuItem>
        //                                         ))}
        //                                     </Select>
        //                                 </FormControl>
        //                             </SoftBox>
        //                         ))}
        //                     </SoftBox>

        //                     {/* Row 4: Interview Status, Status */}
        //                     <SoftBox
        //                         mb={3}
        //                         sx={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "flex-start" }}
        //                     >
        //                         <SoftBox sx={{ flex: "0 0 auto", minWidth: 220 }}>
        //                             <FormControl fullWidth sx={{ ...dropdownStyles, width: "370px" }}>
        //                                 <InputLabel id="demo-select-label" sx={{ fontSize: "1rem", }}>Select Interview Status</InputLabel>
        //                                 <Select
        //                                     name="interviewStatus"
        //                                     value={candidate.interviewStatus || ""}
        //                                     inputRef={interviewStatusRef}
        //                                     onChange={handleChange}
        //                                     onKeyDown={(e) => {
        //                                         if (e.key === "Enter") {
        //                                             e.preventDefault();
        //                                             statusRef.current?.focus();
        //                                         }
        //                                     }}

        //                                 >

        //                                     {["Offered", "Accepted", "Missed", "Interviewed", "Rescheduled"].map((status) => (
        //                                         <MenuItem key={status} value={status}>{status}</MenuItem>
        //                                     ))}
        //                                 </Select>
        //                             </FormControl>
        //                         </SoftBox>

        //                         <SoftBox sx={{ flex: "0 0 auto", minWidth: 220 }}>
        //                             <FormControl fullWidth sx={{ ...dropdownStyles, width: "370px" }}>
        //                                 <InputLabel id="demo-select-label" sx={{ fontSize: "1rem", }}>Select Status</InputLabel>

        //                                 <Select
        //                                     name="status"
        //                                     value={candidate.status || ""}
        //                                     inputRef={statusRef}
        //                                     onChange={handleChange}
        //                                     onKeyDown={(e) => {
        //                                         if (e.key === "Enter") {
        //                                             e.preventDefault();
        //                                             handleSubmit(e);
        //                                         }
        //                                     }}
        //                                 // sx={textFieldStyles}
        //                                 >

        //                                     {['Contacted', 'Moved to Round 2', ' Moved to Round 3', 'Final Round', 'Shortlisted', 'Rejected', 'Hired', 'On Hold'].map((status) => (
        //                                         <MenuItem key={status} value={status}>{status}</MenuItem>
        //                                     ))}
        //                                 </Select>
        //                             </FormControl>
        //                         </SoftBox>
        //                     </SoftBox>

        //                     {/* Submit & Cancel Buttons */}
        //                     <SoftBox mt={3} display="flex" justifyContent="space-between">
        //                         <SoftButton type="submit" variant="gradient" color="info" onClick={handleSubmit}>
        //                             Edit Candidate
        //                         </SoftButton>

        //                         <SoftButton
        //                             variant="gradient"
        //                             color="error"
        //                             onClick={() => navigate("/Candidate")}
        //                         >
        //                             Cancel
        //                         </SoftButton>
        //                     </SoftBox>
        //                 </form>
        //             </Card>
        //         </SoftBox>
        //     </SoftBox>
        //     <Footer />
        // </DashboardLayout>
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
                                <FormControl sx={{...dropdownStyles}}>
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
                                    <FormControl key={name} sx={{...dropdownStyles}}>
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
                                <FormControl sx={{...dropdownStyles}}>
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

                                <FormControl sx={{...dropdownStyles}}>
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
                                        width: { xs: '100%', sm: 'auto' },
                                        px: 3,
                                    }}
                                >
                                    Add Candidate
                                </SoftButton>
                                <SoftButton
                                    variant="gradient"
                                    color="error"
                                    onClick={() => navigate("/Candidate")}
                                    sx={{
                                        width: { xs: '100%', sm: 'auto' },
                                        px: 3,
                                    }}
                                >
                                    Cancel
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