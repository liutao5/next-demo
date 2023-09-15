import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import { useSettingsContext } from "@/components/settings";
import DashboardLayout from "@/layouts/dashboard";
import { PATH_DASHBOARD } from "@/routes/path";
import {
  Box,
  Button,
  Card,
  Container,
  List,
  ListItem,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import Iconify from "@/components/iconify";
import { ICompany } from "@/@types/company";
import { useAuthContext } from "@/auth/useAuthContext";
import { getCompany } from "@/auth/utils";

CompanyPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function CompanyPage() {
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();
  const [currentTab, setCurrentTab] = useState("company");
  const [company, setCompany] = useState<ICompany>();

  useEffect(() => {
    const companyId = getCompany();
    setCompany(user?.companies.find((company) => company.id === companyId));
  }, [user?.companies]);

  const TABS = [
    {
      value: "company",
      label: "基本信息",
      icon: <Iconify icon="ic:round-account-box" />,
      component: (
        <Card>
          <List>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="h6">仓库</Typography>
              仓库名称：{company?.warehouse}
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="h6">银行账户</Typography>
              <Stack direction="row" justifyContent="space-around">
                <Box>开户名称：</Box>
                <Box>开户行：</Box>
                <Box>账号：</Box>
              </Stack>
            </ListItem>
            <ListItem>
              <Typography variant="h6">微信账户</Typography>
              {company?.warehouse}
            </ListItem>
          </List>
        </Card>
      ),
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
        <title>我的公司</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs
          heading="我的公司"
          links={[
            {
              name: "首页",
              href: PATH_DASHBOARD.root,
            },
            {
              name: "我的公司",
              href: PATH_DASHBOARD.setting.company,
            },
          ]}
          action={
            <Stack direction="row" spacing={2}>
              <Button
                component={NextLink}
                href={PATH_DASHBOARD.root}
                variant="outlined"
              >
                新建
              </Button>
              <Button
                component={NextLink}
                href={PATH_DASHBOARD.root}
                variant="outlined"
              >
                注销
              </Button>
              <Button
                component={NextLink}
                href={PATH_DASHBOARD.root}
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
          <Profile
            logo={company?.logo}
            full_name={company?.full_name}
            short_name={company?.short_name}
          />
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
