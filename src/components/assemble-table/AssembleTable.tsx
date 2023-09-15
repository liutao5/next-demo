import {
  Box,
  Chip,
  Divider,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
} from "@mui/material";
import {
  DataGridPremium,
  GridColDef,
  GridRowsProp,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  zhCN,
} from "@mui/x-data-grid-premium";
import {
  DateRange,
  DateRangePicker,
  PickersShortcutsItem,
  PickersShortcutsProps,
  SingleInputDateRangeField,
} from "@mui/x-date-pickers-pro";
import Iconify from "../iconify";
import dayjs, { Dayjs } from "dayjs";

type Props = {
  columns: GridColDef[];
  rows: GridRowsProp;
  searchLabel?: string;
};

const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
  {
    label: "今日",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("day"), today.endOf("day")];
    },
  },
  {
    label: "昨日",
    getValue: () => {
      const today = dayjs();
      const prevDay = today.subtract(1, "day");
      return [prevDay.startOf("day"), prevDay.endOf("day")];
    },
  },
  {
    label: "本月",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("month"), today.endOf("month")];
    },
  },
  {
    label: "上月",
    getValue: () => {
      const today = dayjs();
      const startOfLastMonth = today.subtract(1, "month");
      return [
        startOfLastMonth.startOf("month"),
        startOfLastMonth.endOf("month"),
      ];
    },
  },
  {
    label: "下月",
    getValue: () => {
      const today = dayjs();
      const startOfNextMonth = today.add(1, "month");
      return [
        startOfNextMonth.startOf("month"),
        startOfNextMonth.endOf("month"),
      ];
    },
  },
  {
    label: "今年",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("year"), today.endOf("year")];
    },
  },
];

export default function AssembleTable({
  columns,
  rows,
  searchLabel = "快速过滤",
}: Props) {
  const CustomRangeShortcuts = (
    props: PickersShortcutsProps<DateRange<Dayjs>>
  ) => {
    const { items, onChange, isValid } = props;

    if (items == null || items.length === 0) {
      return null;
    }

    const resolvedItems = items.map((item) => {
      const newValue = item.getValue({ isValid });

      return {
        label: item.label,
        onClick: () => {
          onChange(newValue);
        },
        disabled: !isValid(newValue),
      };
    });

    return (
      <Box
        sx={{
          gridRow: 1,
          gridColumn: 2,
        }}
      >
        <List
          dense
          sx={(theme) => ({
            display: "flex",
            px: theme.spacing(4),
            "& .MuiListItem-root": {
              pt: 0,
              pl: 0,
              pr: theme.spacing(1),
            },
          })}
        >
          {resolvedItems.map((item) => {
            return (
              <ListItem key={item.label}>
                <Chip {...item} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Box>
    );
  };

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <Stack
        justifyContent="space-between"
        flexDirection="row"
        sx={{ width: 1 }}
      >
        <Stack flexDirection="row" alignItems="center" sx={{ p: 2 }}>
          <DateRangePicker
            label="日期范围"
            slots={{
              field: SingleInputDateRangeField,
              shortcuts: CustomRangeShortcuts,
            }}
            slotProps={{
              shortcuts: {
                items: shortcutsItems,
              },
              toolbar: {
                hidden: true,
              },
              actionBar: {
                hidden: true,
              },
            }}
          />
          <TextField
            placeholder={searchLabel}
            sx={{ px: 2 }}
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
        <Stack flexDirection="row">
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
        </Stack>
      </Stack>
    </GridToolbarContainer>
  );
  return (
    <DataGridPremium
      columns={columns}
      localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
      rows={rows}
      slots={{
        toolbar: CustomToolbar,
      }}
    />
  );
}
