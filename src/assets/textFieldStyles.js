import { colors } from "@mui/material";

// styles/textFieldStyles.js
// const textFieldStyles = {
//     width: "100%",
//     maxWidth: "100%",
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//     borderRadius: "5px",
//     display: "flex",
//     "& .MuiInputBase-root": {
//         width: "100%",
//         display: "flex",
//     },
//     "& .MuiInputBase-input": {
//         width: "330px",
//         maxWidth: "330px",
//         minWidth: "330px",
//     },
// };
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
        paddingTop: "10px", // Adds space to prevent label from being pushed too high
    },
    "& .MuiInputLabel-root": {
        fontSize: "0.85rem", // Ensures a readable label size
        transition: "all 0.2s ease-in-out", // Smooth floating animation
    },
    "& .MuiInputLabel-shrink": {
        fontSize: "0.90rem", // Ensures label isn't too small when floating
        top: "3px", // Adjusts floating label position slightly downward
    },
};


const dropdownStyles = {
    width: "100%",
    // maxWidth: "360px",
    // minWidth: "360px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    display: "flex",
    "& .MuiInputBase-root": {
        width: "100%",
        display: "flex",
    },
    "& .MuiInputBase-input": {
        width: "360px",
        maxWidth: "360px",
        minWidth: "360px",
    },
    "& .MuiInputLabel-root": {
        fontSize: "0.85rem", // Ensures a readable label size
        transition: "all 0.2s ease-in-out", // Smooth floating animation
    },
    "& .MuiInputLabel-shrink": {
        fontSize: "0.90rem", // Ensures label isn't too small when floating
        top: "3px", // Adjusts floating label position slightly downward
    },
};


const inputLabelStyle = {
    fontSize: "0.85rem",
    display: "flex", // Enables flexbox for vertical alignment
    alignItems: "center", // Centers text vertically
    justifyContent: "center", // Centers it horizontally (optional)
    position: "absolute", // Ensures correct positioning
}
const dropdownIconStyle = {
    position: "absolute",
    right: "10px", // Ensures the icon is on the right end
    top: "50%", // Centers icon vertically
    transform: "translateY(-50%)",
    fontSize: "1rem", // Customize icon size
    color: "gray", // Ensures visibility
}
const labelSize = {
    fontSize: "1rem"
};
export { textFieldStyles, dropdownStyles, labelSize, inputLabelStyle, dropdownIconStyle };