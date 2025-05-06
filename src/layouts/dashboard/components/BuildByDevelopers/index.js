/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import wavesWhite from "assets/images/shapes/waves-white.svg";
import rocketWhite from "assets/images/illustrations/rocket-white.png";
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";



function BuildByDevelopers() {
  const jobcount = useSelector((state) => state.jobs.jobs.openJobsCount);
  const totalJobs = useSelector((state) => state.jobs.jobs.totalJobs);
  const hiredCandidates = useSelector((state) => state.candidates.candidates.hiredCount);
  const totalCandidates = useSelector((state) => state.candidates.candidates.totalCandidates);

  const scheduledCount = useSelector((state) => state.candidates?.candidates?.scheduledCount);
  console.log(
    jobcount, totalJobs, hiredCandidates, totalCandidates, scheduledCount
  );
  function CandidatesPieChart() {
    const data = [
      ["Status", "Count"],
      ["Total Candidates", totalCandidates],
      ["Rejected", 10],
      ["Scheduled", scheduledCount],
      ["Hired", hiredCandidates],

    ];
    const options = {
      title: "Candidates Overview",
      pieHole: 0.4,
      is3D: false,
      backgroundColor: 'transparent',
      colors: ['#4CAF50', '#2196F3', '#FFC107'],
      chartArea: { width: '80%', height: '80%' }
    };

    return (
      <Chart
        chartType="PieChart"
        data={data}
        optins={options}
        width={"100%"}
        height={"200px"}
      />
    );
  }
  return (
    <Card>
      <SoftBox p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <SoftBox display="flex" flexDirection="column" height="100%">
              <SoftBox pt={1} mb={0.5}>
                <SoftTypography variant="h5" color="text" fontWeight="bold" gutterBottom>
                  Candidates Overview

                </SoftTypography>
                {/* <SoftTypography variant="body2" color="text" fontWeight="medium">
                  Visualize the recruitment progress at a glance. This pie chart displays a breakdown of:
                </SoftTypography> */}
              </SoftBox>
              <SoftTypography variant="body2" color="text" fontWeight="medium">
                Visualize the recruitment progress at a glance.
              </SoftTypography>
              {/* <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                Candidates Overview

              </SoftTypography> */}
              {/* <SoftBox mb={6}>
                <SoftTypography variant="body2" color="text">
                  • Total Candidates<br />
                  • Scheduled Interviews<br />
                  • Hired<br />
                  • Rejected
                </SoftTypography>
              </SoftBox> */}
              {/* <SoftTypography
                component="a"
                href="#"
                variant="button"
                color="text"
                fontWeight="medium"
                sx={{
                  mt: "auto",
                  mr: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",

                  "& .material-icons-round": {
                    fontSize: "1.125rem",
                    transform: `translate(2px, -0.5px)`,
                    transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                  },

                  "&:hover .material-icons-round, &:focus  .material-icons-round": {
                    transform: `translate(6px, -0.5px)`,
                  },
                }}
              >
                Read More
                <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
              </SoftTypography> */}
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={8} sx={{ position: "relative"}}>
            <CandidatesPieChart />
            {/* <SoftBox
              height="100%"
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor="info"
              borderRadius="lg"
              variant="gradient"
            >
              <SoftBox
                component="img"
                src={wavesWhite}
                alt="waves"
                display="block"
                position="absolute"
                left={0}
                width="100%"
                height="100%"
              />
              <SoftBox component="img" src={rocketWhite} alt="rocket" width="100%" pt={3} />
            </SoftBox> */}
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default BuildByDevelopers;
