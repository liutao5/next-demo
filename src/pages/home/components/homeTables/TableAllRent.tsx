import Iconify from "@/components/iconify";
import { Box, Card, InputAdornment, Stack, TextField } from "@mui/material";
import {
  DataGridPremium,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid-premium";
import {
  DateRangePicker,
  SingleInputDateRangeField,
} from "@mui/x-date-pickers-pro";

const columns: GridColDef[] = [
  {
    field: "rentType",
    headerName: "租费类型",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "currentFee",
    headerName: "本期租费",
    type: "number",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "currentClosed",
    headerName: "本期已结",
    type: "number",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "currentOpen",
    headerName: "本期未结",
    type: "number",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "rate",
    headerName: "已结比例",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "lastOpen",
    headerName: "上期未结",
    type: "number",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "allOpen",
    headerName: "总未结",
    type: "number",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "deposit",
    headerName: "押金",
    type: "number",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "doneInvoice",
    headerName: "已开发票",
    type: "number",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "todoInvoice",
    headerName: "未开发票",
    type: "number",
    headerClassName: "table-header",
    width: 150,
  },
];

export default function TableAllRent() {
  const rows: GridRowsProp = [
    {
      id: 1,
      rentType: "1",
      currentFee: 123,
      currentClosed: 100,
      currentOpen: 23,
      rate: 0.1,
      lastOpen: 20,
      allOpen: 40,
      deposit: 10,
      doneInvoice: 10,
      todoInvoice: 20,
    },
    {
      id: 2,
      rentType: "1",
      currentFee: 123,
      currentClosed: 100,
      currentOpen: 23,
      rate: 0.1,
      lastOpen: 20,
      allOpen: 40,
      deposit: 10,
      doneInvoice: 10,
      todoInvoice: 20,
    },
    {
      id: 3,
      rentType: "1",
      currentFee: 123,
      currentClosed: 100,
      currentOpen: 23,
      rate: 0.1,
      lastOpen: 20,
      allOpen: 40,
      deposit: 10,
      doneInvoice: 10,
      todoInvoice: 20,
    },
    {
      id: 4,
      rentType: "1",
      currentFee: 123,
      currentClosed: 100,
      currentOpen: 23,
      rate: 0.1,
      lastOpen: 20,
      allOpen: 40,
      deposit: 10,
      doneInvoice: 10,
      todoInvoice: 20,
    },
    {
      id: 5,
      rentType: "1",
      currentFee: 123,
      currentClosed: 100,
      currentOpen: 23,
      rate: 0.1,
      lastOpen: 20,
      allOpen: 40,
      deposit: 10,
      doneInvoice: 10,
      todoInvoice: 20,
    },
  ];
  return (
    <Card sx={{ height: 400 }}>
      <Stack
        spacing={2}
        alignItems="center"
        direction={{
          xs: "column",
          md: "row",
        }}
        sx={{ px: 2.5, py: 3 }}
      >
        <DateRangePicker
          label="日期范围"
          slots={{ field: SingleInputDateRangeField }}
        />
        <TextField
          fullWidth
          placeholder="Search client or invoice number..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: "text.disabled" }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <DataGridPremium
        checkboxSelection
        initialState={{
          aggregation: {
            model: {
              currentFee: "sum",
              currentClosed: "sum",
              currentOpen: "sum",
              lastOpen: "sum",
              allOpen: "sum",
              deposit: "sum",
              doneInvoice: "sum",
              todoInvoice: "sum",
            },
          },
        }}
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
      />
    </Card>
  );
}
