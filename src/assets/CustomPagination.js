import React from "react";
import { Box, Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SoftBox from "components/SoftBox";

const ltrTheme = createTheme({
  direction: "ltr",
});

const CustomPagination = ({ pagination }) => {
  if (!pagination) return null;

  return (
    <ThemeProvider theme={ltrTheme}>
      <SoftBox 
        display="flex" 
        justifyContent="flex-end" 
        p={2}
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
          zIndex: 1
        }}
      >
        <Pagination
          count={pagination.totalPages}
          page={pagination.currentPage}
          onChange={pagination.onPageChange}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </SoftBox>
    </ThemeProvider>
  );
};

export default CustomPagination;