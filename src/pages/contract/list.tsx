import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import { useSettingsContext } from "@/components/settings";
import DashboardLayout from "@/layouts/dashboard";
import { PATH_DASHBOARD } from "@/routes/path";
import { Box, Button, Card, Container, Divider, Tab } from "@mui/material";
import NextLink from "next/link";
import Head from "next/head";
import Iconify from "@/components/iconify";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";

ContractListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

const tabList = [
  {
    label: "租赁合同",
    value: "allRent",
    color: "info",
    count: 10,
  },
  {
    label: "借调合同",
    value: "2",
    color: "info",
    count: 10,
  },
  {
    label: "合伙合同",
    value: "3",
    color: "info",
    count: 10,
  },
];
export default function ContractListPage() {
  const { themeStretch } = useSettingsContext();
  const [value, setValue] = useState("allRent");
  const handleChangeTab = (_e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Head>
        <title>合同列表</title>
      </Head>
      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs
          heading="Invoice List"
          links={[
            {
              name: "首页",
              href: PATH_DASHBOARD.root,
            },
            {
              name: "合同管理",
              href: PATH_DASHBOARD.contract.root,
            },
            {
              name: "列表",
            },
          ]}
          action={
            <Button
              component={NextLink}
              href={PATH_DASHBOARD.contract.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              create
            </Button>
          }
        />
        <Card sx={{ height: 500 }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList value={value} onChange={handleChangeTab}>
                {tabList.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </TabList>
            </Box>
            <Divider />
            <TabPanel sx={{ p: 0 }} value="allRent">
              1
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="rentFee">
              2
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="lendFee">
              3
            </TabPanel>
          </TabContext>
        </Card>
      </Container>
    </>
  );
}
