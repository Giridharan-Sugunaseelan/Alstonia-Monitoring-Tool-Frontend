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
import styles from "./LineGraphComponent.module.css"; // You can rename the CSS file later if needed

// Register the required components for Line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export function LineGraphComponent({ data, metricKey, title }) {
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
