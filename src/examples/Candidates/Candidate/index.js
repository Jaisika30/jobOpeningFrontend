// import { useMemo } from "react";
// import PropTypes from "prop-types";
// import { v4 as uuidv4 } from "uuid";

// // @mui material components
// import { Table as MuiTable } from "@mui/material";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import TableRow from "@mui/material/TableRow";

// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";
// import SoftAvatar from "components/SoftAvatar";
// import SoftTypography from "components/SoftTypography";

// // Soft UI Dashboard React base styles
// import colors from "assets/theme/base/colors";
// import typography from "assets/theme/base/typography";
// import borders from "assets/theme/base/borders";

// function Candidate({ columns, rows }) {
//   const { light } = colors;
//   const { size, fontWeightBold } = typography;
//   const { borderWidth } = borders;

//   // Log props to verify values
//   console.log("Columns:", columns);
//   console.log("Rows:", rows);

//   // Render table columns
//   const renderColumns = (columns || []).map(({ name, align, width }, key) => {
//     let pl;
//     let pr;

//     if (key === 0) {
//       pl = 3;
//       pr = 3;
//     } else if (key === columns.length - 1) {
//       pl = 3;
//       pr = 3;
//     } else {
//       pl = 1;
//       pr = 1;
//     }

//     return (
//       <SoftBox
//         key={name}
//         component="th"
//         width={width || "auto"}
//         pt={1.5}
//         pb={1.25}
//         pl={align === "left" ? pl : 3}
//         pr={align === "right" ? pr : 3}
//         textAlign={align}
//         fontSize={size.xxs}
//         fontWeight={fontWeightBold}
//         color="secondary"
//         opacity={0.7}
//         borderBottom={`${borderWidth[1]} solid ${light.main}`}
//       >
//         {name.toUpperCase()}
//       </SoftBox>
//     );
//   });

//   // Render table rows
//   const renderRows = (rows || []).map((row, key) => {
//     const rowKey = `row-${key}`;
//     console.log("rowKey", rowKey);
//     const tableRow = (columns || []).map(({ name, align }) => {
//       let template;

//       if (Array.isArray(row[name])) {
//         template = (
//           <SoftBox
//             key={uuidv4()}
//             component="td"
//             p={1}
//             borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
//           >
//             <SoftBox display="flex" alignItems="center" py={0.5} px={1}>
//               <SoftBox mr={2}>
//                 <SoftAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
//               </SoftBox>
//               <SoftTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
//                 {row[name][1]}
//               </SoftTypography>
//             </SoftBox>
//           </SoftBox>
//         );
//       } else {
//         template = (
//           <SoftBox
//             key={uuidv4()}
//             component="td"
//             p={1}
//             textAlign={align}
//             borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
//           >
//             <SoftTypography
//               variant="button"
//               fontWeight="regular"
//               color="secondary"
//               sx={{ display: "inline-block", width: "max-content" }}
//             >
//               {row[name]}
//             </SoftTypography>
//           </SoftBox>
//         );
//       }

//       return template;
//     });

//     return <TableRow key={rowKey}>{tableRow}</TableRow>;
//   });

//   return useMemo(
//     () => (
//       <TableContainer>
//         <MuiTable>
//           <SoftBox component="thead">
//             <TableRow>{renderColumns}</TableRow>
//           </SoftBox>
//           <TableBody>{renderRows}</TableBody>
//         </MuiTable>
//       </TableContainer>
//     ),
//     [columns, rows]
//   );
// }

// // Setting default values for the props of Table
// Candidate.defaultProps = {
//   columns: [],
//   rows: [], // Ensure rows is an empty array by default
// };

// // Typechecking props for the Table
// Candidate.propTypes = {
//   columns: PropTypes.arrayOf(PropTypes.object),
//   rows: PropTypes.arrayOf(PropTypes.object),
// };

// export default Candidate;
// import { useMemo } from "react";
// import PropTypes from "prop-types";
// import { v4 as uuidv4 } from "uuid";

// // @mui material components
// import { Table as MuiTable } from "@mui/material";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import TableRow from "@mui/material/TableRow";

// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";
// import SoftAvatar from "components/SoftAvatar";
// import SoftTypography from "components/SoftTypography";

// // Soft UI Dashboard React base styles
// import colors from "assets/theme/base/colors";
// import typography from "assets/theme/base/typography";
// import borders from "assets/theme/base/borders";

// function Candidate({ columns, rows , pagination }) {
//   const { light } = colors;
//   const { size, fontWeightBold } = typography;
//   const { borderWidth } = borders;

//   // Render table columns with proper spacing
//   const renderColumns = (columns || []).map(({ name, align, width }, key) => {
//     let pl;
//     let pr;

//     if (key === 0) {
//       pl = 3;
//       pr = 3;
//     } else if (key === columns.length - 1) {
//       pl = 3;
//       pr = 3;
//     } else {
//       pl = 1;
//       pr = 1;
//     }

//     return (
//       <SoftBox
//   key={name}
//   component="th"
//   width={width || "auto"}
//   pt={1.5}
//   pb={1.25}
//   pl={align === "left" ? pl : 3}
//   pr={align === "right" ? pr : 3}
//   textAlign={align}
//   fontSize={size.xxs}
//   fontWeight={fontWeightBold}
//   color="secondary"
//   opacity={0.7}
//   borderBottom={`${borderWidth[1]} solid ${light.main}`}
//   sx={{
//     whiteSpace: "nowrap", // Prevent text wrapping
//     paddingLeft: "16px", // Add consistent padding
//     paddingRight: "16px", // Add consistent padding
//   }}
// >
//   {name.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase()}
// </SoftBox>
//     );
//   });

//   // Render table rows
//   const renderRows = (rows || []).map((row, key) => {
//     const rowKey = `row-${key}`;
//     const tableRow = (columns || []).map(({ name, align }) => {
//       let template;

//       if (Array.isArray(row[name])) {
//         template = (
//           <SoftBox
//             key={uuidv4()}
//             component="td"
//             p={1}
//             borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
//           >
//             <SoftBox display="flex" alignItems="center" py={0.5} px={1}>
//               <SoftBox mr={2}>
//                 <SoftAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
//               </SoftBox>
//               <SoftTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
//                 {row[name][1]}
//               </SoftTypography>
//             </SoftBox>
//           </SoftBox>
//         );
//       } else {
//         template = (
//           <SoftBox
//             key={uuidv4()}
//             component="td"
//             p={1}
//             textAlign={align}
//             borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
//             sx={{
//               paddingLeft: "16px",
//               paddingRight: "16px",
//             }}
//           >
//             <SoftTypography
//               variant="button"
//               fontWeight="regular"
//               color="secondary"
//               sx={{ display: "inline-block", width: "max-content" }}
//             >
//               {row[name]}
//             </SoftTypography>
//           </SoftBox>
//         );
//       }

//       return template;
//     });

//     return <TableRow key={rowKey}>{tableRow}</TableRow>;
//   });

//   return useMemo(
//     () => (
//       <TableContainer>
//         <MuiTable sx={{ tableLayout: "fixed" }}> {/* Add fixed table layout */}
//           <SoftBox component="thead">
//             <TableRow>{renderColumns}</TableRow>
//           </SoftBox>
//           <TableBody>{renderRows}</TableBody>
//         </MuiTable>
//       </TableContainer>
//     ),
//     [columns, rows]
//   );
// }

// // Setting default values for the props of Table
// Candidate.defaultProps = {
//   columns: [],
//   rows: [],
// };

// // Typechecking props for the Table
// Candidate.propTypes = {
//   columns: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     align: PropTypes.oneOf(["left", "right", "center"]),
//     width: PropTypes.string,
//   })),
//   rows: PropTypes.arrayOf(PropTypes.object),
// };

// export default Candidate;

// import { useMemo } from "react";
// import PropTypes from "prop-types";
// import { v4 as uuidv4 } from "uuid";

// // @mui material components
// import { Table as MuiTable, Pagination, Box } from "@mui/material";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import TableRow from "@mui/material/TableRow";

// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";
// import SoftAvatar from "components/SoftAvatar";
// import SoftTypography from "components/SoftTypography";

// // Soft UI Dashboard React base styles
// import colors from "assets/theme/base/colors";
// import typography from "assets/theme/base/typography";
// import borders from "assets/theme/base/borders";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import {
//   KeyboardArrowLeft,
//   KeyboardArrowRight,
// } from '@mui/icons-material';

// function Candidate({ columns, rows }) {
//   const { light } = colors;
//   const { size, fontWeightBold } = typography;
//   const { borderWidth } = borders;

//   const ltrTheme = createTheme({
//     direction: "ltr",
//   });
//   const renderColumns = (columns || []).map(({ name, align, width }, key) => {
//     let pl = 1, pr = 1;
//     if (key === 0 || key === columns.length - 1) {
//       pl = 3;
//       pr = 3;
//     }

//     return (
//       <SoftBox
//         key={name}
//         component="th"
//         width={width || "auto"}
//         pt={1.5}
//         pb={1.25}
//         pl={align === "left" ? pl : 3}
//         pr={align === "right" ? pr : 3}
//         textAlign={align}
//         fontSize={size.xxs}
//         fontWeight={fontWeightBold}
//         color="secondary"
//         opacity={0.7}
//         borderBottom={`${borderWidth[1]} solid ${light.main}`}
//         sx={{
//           whiteSpace: "nowrap",
//           paddingLeft: "16px",
//           paddingRight: "16px",
//         }}
//       >
//         {name.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase()}
//       </SoftBox>
//     );
//   });

//   const renderRows = (rows || []).map((row, key) => {
//     const rowKey = `row-${key}`;
//     const tableRow = (columns || []).map(({ name, align }) => {
//       let content;

//       if (Array.isArray(row[name])) {
//         content = (
//           <SoftBox display="flex" alignItems="center" py={0.5} px={1}>
//             <SoftBox mr={2}>
//               <SoftAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
//             </SoftBox>
//             <SoftTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
//               {row[name][1]}
//             </SoftTypography>
//           </SoftBox>
//         );
//       } else {
//         content = (
//           <SoftTypography
//             variant="button"
//             fontWeight="regular"
//             color="secondary"
//             sx={{ display: "inline-block", width: "max-content" }}
//           >
//             {row[name]}
//           </SoftTypography>
//         );
//       }

//       return (
//         <SoftBox
//           key={uuidv4()}
//           component="td"
//           p={1}
//           textAlign={align}
//           borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
//           sx={{ paddingLeft: "16px", paddingRight: "16px" }}
//         >
//           {content}
//         </SoftBox>
//       );
//     });

//     return <TableRow key={rowKey}>{tableRow}</TableRow>;
//   });



// return useMemo(
//   () => (
//     <TableContainer>
//       <MuiTable sx={{ tableLayout: "fixed" }}>
//         <SoftBox component="thead">
//           <TableRow>{renderColumns}</TableRow>
//         </SoftBox>
//         <TableBody>{renderRows}</TableBody>
//       </MuiTable>
//     </TableContainer>
//   ),
//   [columns, rows]
// );
// }

// Candidate.defaultProps = {
// columns: [],
// rows: [],
// };

// Candidate.propTypes = {
// columns: PropTypes.arrayOf(
//   PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     align: PropTypes.oneOf(["left", "right", "center"]),
//     width: PropTypes.string,
//   })
// ),
// rows: PropTypes.arrayOf(PropTypes.object),
// }
// export default Candidate;

import { useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

// @mui material components
import { Table as MuiTable, Pagination, Box } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import useMediaQuery from "@mui/material/useMediaQuery";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftAvatar from "components/SoftAvatar";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function Candidate({ columns, rows }) {
  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;
  const isMobile = useMediaQuery('(max-width:600px)');

  const renderColumns = (columns || []).map(({ name, align, width }, key) => {
    let pl = 1, pr = 1;
    if (key === 0 || key === columns.length - 1) {
      pl = 3;
      pr = 3;
    }

    return (
      <SoftBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={isMobile ? "0.6rem" : size.xxs}
        fontWeight={fontWeightBold}
        color="secondary"
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${light.main}`}
        sx={{
          whiteSpace: "nowrap",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        {name.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase()}
      </SoftBox>
    );
  });

  const renderRows = (rows || []).map((row, key) => {
    const rowKey = `row-${key}`;
    const tableRow = (columns || []).map(({ name, align }) => {
      let content;

      if (Array.isArray(row[name])) {
        content = (
          <SoftBox display="flex" alignItems="center" py={0.5} px={1}>
            <SoftBox mr={2}>
              <SoftAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
            </SoftBox>
            <SoftTypography
              variant="button"
              fontWeight="medium"
              sx={{ width: "max-content", fontSize: isMobile ? "0.7rem" : "inherit" }}
            >
              {row[name][1]}
            </SoftTypography>
          </SoftBox>
        );
      } else {
        content = (
          <SoftTypography
            variant="button"
            fontWeight="regular"
            color="secondary"
            sx={{ display: "inline-block", width: "max-content", fontSize: isMobile ? "0.7rem" : "inherit" }}
          >
            {row[name]}
          </SoftTypography>
        );
      }

      return (
        <SoftBox
          key={uuidv4()}
          component="td"
          p={1}
          textAlign={align}
          borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          sx={{ paddingLeft: "16px", paddingRight: "16px" }}
        >
          {content}
        </SoftBox>
      );
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <TableContainer sx={{ minWidth: 650 }}>
          <MuiTable
            sx={{
              tableLayout: "auto",
              minWidth: 650,
              "& th, & td": {
                whiteSpace: "nowrap",
              },
            }}
          >
            <SoftBox component="thead">
              <TableRow>{renderColumns}</TableRow>
            </SoftBox>
            <TableBody>{renderRows}</TableBody>
          </MuiTable>
        </TableContainer>
      </Box>
    ),
    [columns, rows, isMobile]
  );
  
}

Candidate.defaultProps = {
  columns: [],
  rows: [],
};

Candidate.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      align: PropTypes.oneOf(["left", "right", "center"]),
      width: PropTypes.string,
    })
  ),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Candidate;

