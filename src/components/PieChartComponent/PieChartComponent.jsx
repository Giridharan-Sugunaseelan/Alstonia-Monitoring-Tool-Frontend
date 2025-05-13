// import React from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
// import styles from "./PieChartComponent.module.css";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const colorPalette = [
//   "#7ed6a3",
//   "#7dcfff",
//   "#a8a9fd",
//   "#e8b3f7",
//   "#5b7dfb",
//   "#ffe670",
//   "#c5c6cc",
//   "#7ed6a3",
//   "#7dcfff",
//   "#a8a9fd",
// ];

// export function PieChartComponent({ data, metricKey, title }) {
//   const chartData = {
//     labels: data.serverIp,
//     datasets: [
//       {
//         label: "CPU Idle Percentage",
//         data: data.map((server) => server[metricKey]),
//         backgroundColor: colorPalette,
//         borderColor: "#ffffff",
//         borderWidth: 2,
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     cutout: "70%",
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   return (
//     <div className={styles.chartContainer}>
//       <h3 style={{ textAlign: "left" }}>{title}:</h3>
//       <Doughnut data={chartData} options={options} />
//     </div>
//   );
// }

import React from "react";
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
import styles from "./PieChartComponent.module.css"; // You can rename the CSS file later if needed

// Register the required components for Line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export function PieChartComponent({ data, metricKey, title }) {
  const chartData = {
    labels: data.map((server) => server.serverIP), // X-axis: server IPs
    datasets: [
      {
        label: title,
        data: data.map((server) => server[metricKey]), // Y-axis: metric values
        fill: false,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.3, // Smooth lines
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
        ticks: {
          stepSize: 10,
        },
        title: {
          display: true,
          text: metricKey,
        },
      },
      x: {
        title: {
          display: true,
          text: "Server IP",
        },
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <h3 style={{ textAlign: "left" }}>{title}</h3>
      <Line data={chartData} options={options} />
    </div>
  );
}
