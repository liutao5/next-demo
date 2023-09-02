import { Container, Grid } from "@mui/material";
import Head from "next/head";
import HomeRentChart from "./components/HomeRentChart";
import { useSettingsContext } from "@/components/settings";
import HomeRentChange from "./components/HomeRentChange";
import HomeTableTabs from "./components/homeTables";
import DashboardLayout from "@/layouts/dashboard";

Home.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Home() {
  const { themeStretch } = useSettingsContext();
  return (
    <>
      <Head>
        <title>首页</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <HomeRentChart />
          </Grid>
          <Grid item xs={12} md={8}>
            <HomeRentChange />
          </Grid>
          <Grid item xs={12} md={12}>
            <HomeTableTabs />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
