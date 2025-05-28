import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import TableComponent from "../TableComponent/TableComponent";
import { LineGraphComponent } from "../LineGraphComponent/LineGraphComponent";
import { useTheme } from "@mui/material/styles";

export default function ApplicationDashBoardComponent() {
  const { serviceNode } = useParams();
  const theme = useTheme();

  // ✅ Corrected "realTime" to "realtime"
  const serviceNodes = useSelector(
    (state) => state?.serviceNodeHealth?.realtime?.[serviceNode]
  );

  function getServiceNodeHealths() {
    const result = [];

    if (!serviceNodes || typeof serviceNodes !== "object") return result;

    Object.values(serviceNodes).forEach((node) => {
      let serverIP = node["serverIP"];
      let hostName = node["hostName"];
      let health = JSON.parse(node["healthMetrics"]);
      let parsedHealth = { serverIP, hostName };

      Object.keys(health).forEach((key) => {
        parsedHealth[key] = parseFloat(health[key]);
      });

      result.push(parsedHealth);
    });

    return result;
  }

  const healths = getServiceNodeHealths();

  if (!serviceNodes) {
    return (
      <Box p={3}>
        <Typography variant="h6">
          Loading service node data for {serviceNode}...
        </Typography>
      </Box>
    );
  }

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
            <LineGraphComponent data={healths} />
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
            <LineGraphComponent data={healths} />
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
        <TableComponent data={healths} />
      </Box>
    </Box>
  );
}
