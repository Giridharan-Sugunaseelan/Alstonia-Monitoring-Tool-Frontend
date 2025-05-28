import React, { useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Route, Routes } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import NavigationbarComponent from "./Components/NavigationbarComponent/NavigationbarComponent";
import ServerDashBoardComponent from "./Components/ServerDashBoardComponent/ServerDashBoardComponent";
import WebSocketListener from "./websocketlistener/WebSocketListener";
import ApplicationDashBoardComponent from "./components/ApplicationDashBoardComponent/ApplicationDashBoardComponent";

function App() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <WebSocketListener />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Header */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: "#333",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Toolbar>
            {isSmallScreen && (
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {!isSmallScreen && (
            <Box
              sx={{
                width: {
                  sm: 240,
                  md: 280,
                  lg: 300,
                  xl: 320,
                },
                borderRight: "1px solid #ddd",
                height: "100%",
                overflow: "auto",
              }}
            >
              <NavigationbarComponent />
            </Box>
          )}
          {isSmallScreen && (
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
            >
              <Box sx={{ width: "300px", height: "100%" }}>
                <NavigationbarComponent />
              </Box>
            </Drawer>
          )}

          <Box sx={{ flex: 1, height: "100%", overflow: "auto", padding: 2 }}>
            <Routes>
              <Route
                path="/servers/:serviceNode"
                element={<ServerDashBoardComponent />}
              />
              <Route
                path="/application/:serviceNode"
                element={<ApplicationDashBoardComponent />}
              />
            </Routes>
          </Box>
        </Box>
      </Box>
    </>
    // <>
    //   {/* <ServerDashBoardComponent /> */}
    //   <ApplicationDashBoardComponent />
    // </>
  );
}

export default App;
