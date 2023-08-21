import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Card, Tab, Divider, Box } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";
import TableAllRent from "./TableAllRent";
import TableLendFee from "./TableLendFee";
import TableRentFee from "./TableRentFee";
import { Label } from "@mui/icons-material";

const rows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns: GridColDef[] = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 },
];

export default function HomeTableTabs() {
  const [value, setValue] = useState("allRent");

  const handleChangeTab = (_e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabList = [
    {
      label: "总租费",
      value: "allRent",
      color: "info",
      count: 10,
    },
    {
      label: "租出租费",
      color: "success",
      value: "rentFee",
      count: 10,
    },
    {
      label: "借调租费",
      color: "warning",
      value: "lendFee",
      count: 10,
    },
    {
      label: "总物设",
      color: "error",
      value: "allGoods",
      count: 10,
    },
    {
      label: "租出物设",
      color: "default",
      value: "rentGoods",
      count: 10,
    },
    {
      label: "借调物设",
      color: "info",
      value: "lendGoods",
      count: 10,
    },
    {
      label: "库存物设",
      color: "warning",
      value: "repoGoods",
      count: 10,
    },
  ];

  return (
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
          <TableAllRent />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="rentFee">
          <TableLendFee />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="lendFee">
          <TableRentFee />
        </TabPanel>
      </TabContext>
    </Card>
  );
}
