import { Box } from "@mui/material";

const JobTableContainer = ({ children }) => (
  <Box
    sx={{
      maxHeight: "400px", // Set the height for the scrollable area
      overflowY: "auto", // Enables vertical scrolling
      overflowX: "hidden", // Prevents horizontal scrolling
      border: "1px solid #ddd", // Optional: adds a border around the table
      borderRadius: "8px", // Optional: rounds the container edges
    }}
  >
    {children}
  </Box>
);

export default JobTableContainer;
