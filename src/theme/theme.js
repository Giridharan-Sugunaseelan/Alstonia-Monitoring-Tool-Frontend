import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f7fb",
      paper: "#ffffff",
      status: {
        up: "#22c55e",
        down: "#ef4444",
      },
    },
    primary: {
      main: "#3366FF",
    },
    text: {
      primary: "#1E1E1E",
      secondary: "#6b7280",
    },
    divider: "#e0e6ed",
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
