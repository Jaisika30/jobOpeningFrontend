// // /**
// // =========================================================
// // * Soft UI Dashboard React - v4.0.1
// // =========================================================

// // * Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
// // * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// // Coded by www.creative-tim.com

// //  =========================================================

// // * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// // */

// // // @mui material components
// // import Card from "@mui/material/Card";
// // import Icon from "@mui/material/Icon";

// // // Soft UI Dashboard React components
// // import SoftBox from "components/SoftBox";
// // import SoftTypography from "components/SoftTypography";

// // // Images
// // import ivancik from "assets/images/ivancik.jpg";
// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getJobs } from "slices/jobSlice";
// // import { Chart } from "react-google-charts";

// // function WorkWithTheRockets() {
// //   const dispatch = useDispatch();

// //   const totalJobs = useSelector((state) => state.jobs.jobs.jobs);
// //   console.log(totalJobs);

// //   useEffect(() => {
// //     dispatch(
// //       getJobs({
// //         page: 1,
// //         limit: 10,
// //         searchQuery: "",
// //         statusFilter: "",
// //       })
// //     );
// //   }, [])



// //   return (
// //     <Card sx={{ height: "100%" }}>
// //       <SoftBox position="relative" height="100%" p={2}>

// //       </SoftBox>
// //     </Card>
// //   );
// // }

// // export default WorkWithTheRockets;
// // @mui material components
// import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";

// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";

// // Images
// import ivancik from "assets/images/ivancik.jpg";

// // React & Redux
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getJobs } from "slices/jobSlice";

// // Chart
// import { Chart } from "react-google-charts";

// // ✅ Chart data formatter function
// const getColumnChartData = (jobs) => {
//   if (!Array.isArray(jobs)) return [["Job Title", "Candidates"]];
//   return [
//     ["Job Title", "Candidates"],
//     ...jobs.map((job) => [job.title, job.candidates?.length || 0]),
//   ];
// };

// function WorkWithTheRockets() {
//   const dispatch = useDispatch();
//   const totalJobs = useSelector((state) => state.jobs.jobs.jobs || []);

//   useEffect(() => {
//     dispatch(
//       getJobs({
//         page: 1,
//         limit: 10,
//         searchQuery: "",
//         statusFilter: "",
//       })
//     );
//   }, [dispatch]);

//   const chartData = getColumnChartData(totalJobs);

//   const chartOptions = {
//     title: "Candidates per Job",
//     titleTextStyle: {
//       color: "gray",        // Title color
//       fontSize: 20,         // Font size
//       bold: true,           // Bold text
//       italic: false,        // No italic
//       fontName: "Arial",    // Optional font
//     },
//     chartArea: { width: "80%" },
//     hAxis: {
//       title: "Job Title",
//     },
//     vAxis: {
//       title: "Number of Candidates",
//       minValue: 0,
//     },
//     legend: { position: "none" },
//     colors: ["#42A5F5"],
//   };

//   return (
//     <Card sx={{ height: "100%", overflow: "visible" }}>
//       <SoftBox bgcolor="white" p={2} borderRadius="md">
//         <Chart
//           chartType="ColumnChart"
//           width="100%"
//           height="300px"
//           data={chartData}
//           options={chartOptions}
//         />
//       </SoftBox>

//     </Card>
//   );
// }

// export default WorkWithTheRockets;
// /**
// =========================================================
// * Soft UI Dashboard React - v4.0.1
// =========================================================

// * Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// // @mui material components
// import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";

// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";
// import SoftTypography from "components/SoftTypography";

// // Images
// import ivancik from "assets/images/ivancik.jpg";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getJobs } from "slices/jobSlice";
// import { Chart } from "react-google-charts";

// function WorkWithTheRockets() {
//   const dispatch = useDispatch();

//   const totalJobs = useSelector((state) => state.jobs.jobs.jobs);
//   console.log(totalJobs);

//   useEffect(() => {
//     dispatch(
//       getJobs({
//         page: 1,
//         limit: 10,
//         searchQuery: "",
//         statusFilter: "",
//       })
//     );
//   }, [])



//   return (
//     <Card sx={{ height: "100%" }}>
//       <SoftBox position="relative" height="100%" p={2}>

//       </SoftBox>
//     </Card>
//   );
// }

// export default WorkWithTheRockets;
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import ivancik from "assets/images/ivancik.jpg";

// React & Redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "slices/jobSlice";

// Chart
import { Chart } from "react-google-charts";

// ✅ Chart data formatter function
const getColumnChartData = (jobs) => {
  if (!Array.isArray(jobs)) return [["Job Title", "Candidates"]];
  return [
    ["Job Title", "Candidates"],
    ...jobs.map((job) => [job.title, job.candidates?.length || 0]),
  ];
};

function WorkWithTheRockets() {
  const dispatch = useDispatch();
  const totalJobs = useSelector((state) => state.jobs.jobs.jobs || []);

  useEffect(() => {
    dispatch(
      getJobs({
        page: 1,
        limit: 10,
        searchQuery: "",
        statusFilter: "",
      })
    );
  }, [dispatch]);

  const chartData = getColumnChartData(totalJobs);

  const chartOptions = {
    title: "Candidates Per Job",
    titleTextStyle: {
      color: "gray",        // Title color
      fontSize: 18,         // Font size
      bold: true,           // Bold text
      italic: false,        // No italic
      fontName: "Inherit",    // Optional font
    },
    chartArea: { width: "80%" },
    hAxis: {
      title: "Job Title",
    },
    vAxis: {
      title: "Number of Candidates",
      minValue: 0,
    },
    legend: { position: "none" },
    colors: ["#42A5F5"],
  };

  return (
    <Card sx={{
      height: "100%",
    }}>
      <SoftBox bgcolor="white" p={2} borderRadius="md">
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="300px"
          data={chartData}
          options={chartOptions}
          sx={{
            zIndex: "50"
          }}
        />
      </SoftBox>

    </Card>

  );
}

export default WorkWithTheRockets;
