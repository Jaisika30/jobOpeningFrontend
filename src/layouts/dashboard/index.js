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
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { Box } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import GroupIcon from "@mui/icons-material/Group";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "slices/jobSlice";
import { useEffect } from "react";
import { getCandidates } from "slices/candidateSlice";
import { Link } from "react-router-dom";

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const jobcount = useSelector((state) => state.jobs.jobs.openJobsCount);
  const totalJobs = useSelector((state) => state.jobs.jobs.totalJobs);
  const hiredCandidates = useSelector((state) => state.candidates.candidates.hiredCount);
  const totalCandidates = useSelector((state) => state.candidates.candidates.totalCandidates);

  const scheduledCount = useSelector((state) => state.candidates?.candidates?.scheduledCount);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getJobs({
        page: 1,
        limit: 10,
        searchQuery: "",
        statusFilter: "",
      })
    );
    dispatch(
      getCandidates({
        page: 1,
        limit: 10,
        searchQuery: "",
        statusFilter: "",
      })
    );
  }, [dispatch]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Box display="flex" flexDirection="column" minHeight="auto">
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} xl={3}>
                <Link to="/jobs" style={{ textDecoration: "none" }}>
                  <MiniStatisticsCard
                    bgColor="white"
                    title={{ text: "Total Jobs" }}
                    count={totalJobs}
                    percentage={{ color: "text", text: "+2 from last month" }}
                    icon={{ color: "info", component: "work" }}
                  />
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <Link to="/jobs?status=Open" style={{ textDecoration: "none" }}>
                  <MiniStatisticsCard
                    bgColor="white"
                    title={{ text: "Open Jobs " }}
                    count={jobcount}
                    percentage={{ color: "text", text: "+28 from last month" }}
                    icon={{ color: "info", component: "group" }}
                  />
                </Link>
              </Grid>
              {/* <Grid item xs={12} sm={6} xl={3}>
                <Link to="/Candidate?interviewStatus=Scheduled" style={{ textDecoration: 'none' }}>
                  <MiniStatisticsCard
                    bgColor="white"
                    title={{ text: "Scheduled Interviews" }}
                    count={scheduledCount}
                    percentage={{ color: "text", text: "For this week" }}
                    icon={{ color: "info", component: "event_available" }}
                  />
                </Link>
              </Grid> */}
              <Grid item xs={12} sm={6} xl={3}>
                <Link to="/Candidate" style={{ textDecoration: "none" }}>
                  <MiniStatisticsCard
                    bgColor="white"
                    title={{ text: "Total Candidates" }}
                    count={totalCandidates}
                    percentage={{ color: "text", text: "For this week" }}
                    icon={{ color: "info", component: "event_available" }}
                  />
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <Link to="/Candidate?status=Hired" style={{ textDecoration: "none" }}>
                  <MiniStatisticsCard
                    bgColor="white"
                    title={{ text: "Hired Candidates" }}
                    count={hiredCandidates}
                    percentage={{ color: "text", text: "+2 from last month" }}
                    icon={{
                      color: "info",
                      component: "person_add", // Material Icon name as string
                    }}
                  />
                </Link>
              </Grid>
            </Grid>
          </SoftBox>
          {/* <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={7}>
                <BuildByDevelopers />
              </Grid>
              <Grid item xs={12} lg={5}>
                <WorkWithTheRockets />
              </Grid>
            </Grid>
          </SoftBox>
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={5}>
                <ReportsBarChart
                  title="active users"
                  description={
                    <>
                      (<strong>+23%</strong>) than last week
                    </>
                  }
                  chart={chart}
                  items={items}
                />
              </Grid>
              <Grid item xs={12} lg={7}>
                <GradientLineChart
                  title="Sales Overview"
                  description={
                    <SoftBox display="flex" alignItems="center">
                      <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                        <Icon className="font-bold">arrow_upward</Icon>
                      </SoftBox>
                      <SoftTypography variant="button" color="text" fontWeight="medium">
                        4% more{" "}
                        <SoftTypography variant="button" color="text" fontWeight="regular">
                          in 2021
                        </SoftTypography>
                      </SoftTypography>
                    </SoftBox>
                  }
                  height="20.25rem"
                  chart={gradientLineChartData}
                />
              </Grid>
            </Grid>
          </SoftBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrderOverview />
            </Grid>
          </Grid> */}
        </Box>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Dashboard;
