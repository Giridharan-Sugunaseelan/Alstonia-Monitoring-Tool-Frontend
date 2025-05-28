import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./redux/App/store.js";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import theme from "./theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
