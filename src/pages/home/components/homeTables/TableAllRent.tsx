import AssembleTable from "@/components/assemble-table";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid-premium";

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
    {
      id: 6,
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
      id: 7,
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
      id: 8,
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
      id: 9,
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
      id: 10,
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
      id: 11,
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
      id: 12,
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
      id: 13,
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
  return <AssembleTable columns={columns} rows={rows} />;
}
