import { colors } from "@mui/material";

// styles/textFieldStyles.js
const textFieldStyles = {
    width: "100%",
    maxWidth: "100%",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    display: "flex",
    "& .MuiInputBase-root": {
        width: "100%",
        display: "flex",
    },
    "& .MuiInputBase-input": {
        width: "330px",
        maxWidth: "330px",
        minWidth: "330px",
    },
};
const dropdownStyles = {
    width: "370px",
    maxWidth: "370px",
    minWidth: "370px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    display: "flex",
    "& .MuiInputBase-root": {
        width: "100%",
        display: "flex",
    },
    "& .MuiInputBase-input": {
        width: "330px",
        maxWidth: "330px",
        minWidth: "330px",
    },
};
const labelSize = {
    fontSize: "1rem"
};
export { textFieldStyles, dropdownStyles, labelSize };