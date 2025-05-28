import React from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";

function StatusComponent({ data, metricKey, title }) {
  const sortedData =
    data.length > 1 ? data.sort((a, b) => b[metricKey] - a[metricKey]) : data;

  const getCellColor = (value) => {
    if (value > 80) {
      return metricKey !== "cpuIdle" ? "error.main" : "success.main";
    } else if (value > 70) {
      return "orange";
    } else {
      return metricKey !== "cpuIdle" ? "success.main" : "error.main";
    }
  };

  return (
    <Box sx={{ overflowX: "auto", p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Table size="small" sx={{ minWidth: 300 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Server IP</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>{title} (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.length > 0 ? (
            sortedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.serverIP}</TableCell>
                <TableCell
                  sx={{ color: getCellColor(item[metricKey]), fontWeight: 500 }}
                >
                  {item[metricKey]}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={2}
                sx={{ textAlign: "center", color: "text.secondary" }}
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
}

export default StatusComponent;
