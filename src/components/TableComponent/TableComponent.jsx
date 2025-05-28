import React from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  useTheme,
} from "@mui/material";

export default function TableComponent({ data }) {
  const theme = useTheme();

  const getCpuIdleColor = (value) => {
    const val = parseFloat(value);
    if (val > 80) return theme.palette.success.main;
    if (val > 70) return "orange";
    return theme.palette.error.main;
  };

  const getMemoryUsageColor = (value) => {
    const val = parseFloat(value);
    if (val > 80) return theme.palette.error.main;
    if (val > 70) return "orange";
    return theme.palette.success.main;
  };

  const cellStyle = (isLast) => ({
    textAlign: "center",
    borderRight: isLast ? "none" : `1px solid ${theme.palette.divider}`,
    whiteSpace: "nowrap", // Prevent text wrap
  });

  const headers =
    data?.length > 0
      ? Object.keys(data[0]).filter((key) => key !== "timeStamp")
      : [];

  const getCellStyle = (key, value) => {
    if (key === "cpuIdle") {
      return { color: getCpuIdleColor(value), fontWeight: 500 };
    } else if (key === "serverIP" || key === "hostName") {
      return {};
    } else {
      return { color: getMemoryUsageColor(value), fontWeight: 500 };
    }
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Typography
        variant="subtitle1"
        gutterBottom
        ml={2}
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.paper,
          zIndex: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 1,
        }}
      >
        Server Metrics Overview
      </Typography>

      {/* Scrollable Table Wrapper */}
      <Box sx={{ minWidth: "100%", overflowX: "auto" }}>
        <Table size="small" sx={{ minWidth: 600 }}>
          <TableHead
            sx={{
              position: "sticky",
              top: 36,
              backgroundColor: theme.palette.background.paper,
              zIndex: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <TableRow>
              {headers.map((key, idx) => (
                <TableCell
                  key={key}
                  sx={{
                    fontWeight: "bold",
                    ...cellStyle(idx === headers.length - 1),
                  }}
                >
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {headers.map((key, idx) => (
                    <TableCell
                      key={key}
                      sx={{
                        ...cellStyle(idx === headers.length - 1),
                        ...getCellStyle(key, row[key]),
                      }}
                    >
                      {row[key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length || 1}
                  sx={{ textAlign: "center", color: "text.secondary" }}
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
