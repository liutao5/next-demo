import {
  Box,
  Card,
  CardHeader,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";
import Chart, { useChart } from "@/components/chart";
import { DatePicker } from "@mui/x-date-pickers-pro";

export default function HomeRentChange() {
  const [seriesData, setSeriesData] = useState("2019");
  const [dateType, setDateType] = useState("year");
  const colors = ["#FFAB00", "#2065D1"];
  const options = {};
  const categories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ];

  const series = [
    {
      year: "2019",
      data: [
        { name: "Asia", data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
        { name: "America", data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
      ],
    },
    {
      year: "2020",
      data: [
        { name: "Asia", data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
        { name: "America", data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
      ],
    },
  ];

  const chartOptions = useChart({
    colors,
    xaxis: {
      categories,
    },
    ...options,
  });

  const changeDateType = (event: any, value: string) => {
    console.log(value);
    setDateType(value);
  };

  return (
    <Card>
      <CardHeader
        title="租费数据变化"
        subheader="比上一年上涨30%"
        action={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <ToggleButtonGroup
              exclusive
              value={dateType}
              onChange={changeDateType}
            >
              <ToggleButton value="year">年</ToggleButton>
              <ToggleButton value="month">月</ToggleButton>
            </ToggleButtonGroup>
            <DatePicker
              views={dateType === "year" ? ["year"] : ["month", "year"]}
            />
          </Box>
        }
      />
      {series.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <Chart
              type="line"
              series={item.data}
              options={chartOptions}
              height={364}
            />
          )}
        </Box>
      ))}
    </Card>
  );
}
