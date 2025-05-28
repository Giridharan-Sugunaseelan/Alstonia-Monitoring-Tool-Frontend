import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import TableComponent from "../TableComponent/TableComponent";
import { LineGraphComponent } from "../LineGraphComponent/LineGraphComponent";
import { useTheme } from "@mui/material/styles";

export default function ServerDashboardComponent() {
  const { serviceNode } = useParams();
  const theme = useTheme();

  const servers = useSelector(
    (state) => state?.serverHealth?.realTime[serviceNode]
  );

  const keys = servers ? Object.keys(servers) : [];

  function getItems(objects, keys, metricKey1 = "", metricKey2 = "") {
    const result = [];
    keys.forEach((key) => {
      if (!metricKey1 && !metricKey2) {
        result.push(objects[key]);
      } else {
        result.push({
          [metricKey1]: objects[key][metricKey1],
          [metricKey2]: parseFloat(objects[key][metricKey2]),
        });
      }
    });
    return result;
  }

  const serverHealths = getItems(servers, keys);
  const cpuUsage = getItems(servers, keys, "serverIP", "cpuIdle");
  const memoryConsumption = getItems(servers, keys, "serverIP", "memoryUsage");

  return (
    <Box>
      <Grid
        container
        spacing={3}
        sx={{
          mb: 2,
          flexDirection: {
            xs: "column",
            lg: "row",
          },
        }}
      >
        <Grid item sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              width: "100%",
              height: 300,
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: theme.palette.background.paper,
              borderRadius: 2,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              boxShadow: theme.shadows[3],
            }}
          >
            <LineGraphComponent
              data={cpuUsage}
              metricKey="cpuIdle"
              title="CPU Usage"
            />
          </Box>
        </Grid>

        <Grid item sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              width: "100%",
              height: 300,
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: theme.palette.background.paper,
              borderRadius: 2,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              boxShadow: theme.shadows[3],
            }}
          >
            <LineGraphComponent
              data={memoryConsumption}
              metricKey="memoryUsage"
              title="Memory Consumption"
            />
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          overflowX: "auto",
          overflowY: "auto",
          height: 425,
          boxShadow: theme.shadows[3],
        }}
      >
        <TableComponent data={serverHealths} />
      </Box>
    </Box>
  );
}
