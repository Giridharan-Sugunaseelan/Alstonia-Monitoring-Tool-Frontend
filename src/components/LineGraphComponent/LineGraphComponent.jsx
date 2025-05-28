import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export function LineGraphComponent({ data, metricKey = "", title }) {
  const [selectedMetric, setSelectedMetric] = useState(metricKey);
  const [metricKeys, setMetricKeys] = useState([]);

  useEffect(() => {
    if (data?.length > 0) {
      const keys = Object.keys(data[0]).filter(
        (key) => key !== "serverIP" && typeof data[0][key] === "number"
      );
      setMetricKeys(keys);

      // If metricKey is provided and exists in keys, use it
      if (metricKey && keys.includes(metricKey)) {
        setSelectedMetric(metricKey);
      } else {
        setSelectedMetric(keys[0]); // Default to first available metric
      }
    }
  }, [metricKey, data]);

  if (!data || data.length === 0 || !selectedMetric) {
    return (
      <Typography variant="body2" color="text.secondary">
        No data to display
      </Typography>
    );
  }

  const chartData = {
    labels: data.map((server) => server.serverIP),
    datasets: [
      {
        label: selectedMetric,
        data: data.map((server) => server[selectedMetric]),
        fill: false,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: selectedMetric,
        },
      },
      x: {
        title: {
          display: true,
        },
      },
    },
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
          mx: 1,
        }}
      >
        <Typography variant="subtitle1">{title}</Typography>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="metric-select-label">Metric</InputLabel>
          <Select
            labelId="metric-select-label"
            value={selectedMetric}
            label="Metric"
            onChange={(e) => setSelectedMetric(e.target.value)}
          >
            {metricKeys.map((key) => (
              <MenuItem key={key} value={key}>
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
        <Line data={chartData} options={options} />
      </Box>
    </Box>
  );
}
