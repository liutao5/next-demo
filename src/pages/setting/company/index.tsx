import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import { useSettingsContext } from "@/components/settings";
import DashboardLayout from "@/layouts/dashboard";
import { PATH_DASHBOARD } from "@/routes/path";
import { Box, Button, Card, Container, Stack, Tab, Tabs } from "@mui/material";
import NextLink from "next/link";
import Head from "next/head";
import Iconify from "@/components/iconify";
import { useState } from "react";
import CompanyProfile from "./Profile";

CompanyPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function CompanyPage() {
  const { themeStretch } = useSettingsContext();
  const [currentTab, setCurrentTab] = useState("company");
  const TABS = [
    {
      value: "company",
      label: "基本信息",
      icon: <Iconify icon="ic:round-account-box" />,
      component: <Card>card</Card>,
    },
    {
      value: "invoice",
      label: "开票信息",
      icon: <Iconify icon="ic:round-account-box" />,
      component: <>invoice</>,
    },
  ];
  return (
    <>
      <Head>
        <title>公司管理</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs
          heading="公司管理"
          links={[
            {
              name: "首页",
              href: PATH_DASHBOARD.root,
            },
            {
              name: "公司管理",
              href: PATH_DASHBOARD.setting.company,
            },
          ]}
          action={
            <Stack direction="row" spacing={2}>
              <Button
                component={NextLink}
                href={PATH_DASHBOARD.setting.companyRegister}
                variant="outlined"
              >
                新建
              </Button>
              <Button
                component={NextLink}
                href={PATH_DASHBOARD.contract.new}
                variant="outlined"
              >
                注销
              </Button>
              <Button
                component={NextLink}
                href={PATH_DASHBOARD.contract.new}
                variant="contained"
              >
                修改
              </Button>
            </Stack>
          }
        />

        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          <CompanyProfile />
          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: "absolute",
              bgcolor: "background.paper",
              "& .MuiTabs-flexContainer": {
                pr: { md: 3 },
                justifyContent: {
                  sm: "center",
                  md: "flex-end",
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={tab.label}
              />
            ))}
          </Tabs>
        </Card>
        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value}> {tab.component} </Box>
            )
        )}
      </Container>
    </>
  );
}
