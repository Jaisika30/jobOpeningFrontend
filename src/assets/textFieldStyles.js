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
        width: "100%",
        maxWidth: "100%",
        minWidth: "100%",
        padding: "10px", // Adds space to prevent label from being pushed too high
        // paddingLeft:"10px"
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
        width: "100%",
        maxWidth: "90%",
        minWidth: "90%",
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
    cursor: "pointer", 
}
const labelSize = {
    fontSize: "1rem"
};
const toastSuccess = {
    fontSize: "0.85rem", padding: "8px", minWidth: "200px"
}
const tooltipStyle = {
    tooltip: {
        sx: {
            backgroundColor: 'rgba(239, 238, 238, 0.87) !important', // Remove background
            color: 'rgba(130, 127, 127, 0.87)', // Dark gray text
            fontSize: '0.875rem', // Match your typography
            boxShadow: 'none', // Remove shadow
            // paddingX: 2,
            padding: '0px 8px',
            maxWidth: '800px !important',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }
    },
    arrow: {
        sx: {
            color: 'transparent!important', // Dark gray arrow
        }
    }
}
export { textFieldStyles, dropdownStyles, labelSize, inputLabelStyle, dropdownIconStyle, toastSuccess, tooltipStyle };