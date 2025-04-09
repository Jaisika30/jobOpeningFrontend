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
// const dropdownStyles = {
//     width: "360px",
//     maxWidth: "360px",
//     minWidth: "360px",
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//     borderRadius: "5px",
//     display: "flex",
//     "& .MuiInputBase-root": {
//         width: "100%",
//         display: "flex",
//     },
//     "& .MuiInputBase-input": {
//         width: "360px",
//         maxWidth: "360px",
//         minWidth: "360px",
//     },
// };
 const dropdownStyles = {
    width: "100%", // allow it to grow/shrink within parent
    maxWidth: "360px", // cap width on large screens
    minWidth: "0", // allow shrinking on smaller screens
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    display: "flex",
    "& .MuiInputBase-root": {
        width: "100%",
        display: "flex",
    },
    "& .MuiInputBase-input": {
        width: "100%",
    },
};

const labelSize = {
    fontSize: "1rem"
};
export { textFieldStyles, dropdownStyles, labelSize };