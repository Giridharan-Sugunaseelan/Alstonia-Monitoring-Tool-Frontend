import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  Typography,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import VerticalDropdownComponent from "../VerticalDropDownComponent/VerticalDropDownComponent";
import { useDispatch } from "react-redux";
import { fetchServers } from "../../redux/Features/Servers/ServerAction/ServerAction";
import { fetchServiceNodeHealth } from "../../redux/Features/ServiceNodes/ServiceNodeAction/serviceNodeActions";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router";

export default function ServiceNodeComponent({ service }) {
  const [open, setOpen] = useState(false);
  const dispatcher = useDispatch();
  const theme = useTheme();
  const navigator = useNavigate();
  function getServers() {
    dispatcher(fetchServers(service.serviceNodeId));
    navigator(`servers/${service.serviceName}`);
  }

  function getServiceHealth() {
    dispatcher(fetchServiceNodeHealth(service.serviceNodeId));
    navigator(`application/${service.serviceName}`);
  }

  return (
    <>
      <ListItem
        disablePadding
        sx={{
          bgcolor: open ? theme.palette.action.selected : "transparent",
          "&:hover": {
            bgcolor: theme.palette.action.hover,
          },
          mb: 0.1,
        }}
      >
        <ListItemButton onClick={() => setOpen((prev) => !prev)}>
          <Typography
            variant="subtitle1"
            sx={{
              flexGrow: 1,
              color: theme.palette.text.primary,
              fontWeight: open
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
            }}
          >
            {service.serviceName}
          </Typography>
          {open ? (
            <ExpandLess sx={{ color: theme.palette.text.secondary }} />
          ) : (
            <ExpandMore sx={{ color: theme.palette.text.secondary }} />
          )}
        </ListItemButton>
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          disablePadding
          sx={{
            bgcolor: theme.palette.background.paper,
            pl: 2,
          }}
        >
          <VerticalDropdownComponent
            name="Server Stats"
            stateKey="servers"
            serviceNode={service.serviceName}
            onClick={getServers}
          />
          <VerticalDropdownComponent
            name="Application Status"
            stateKey="serviceNodeHealth"
            serviceNode={service.serviceName}
            onClick={getServiceHealth}
          />
        </List>
      </Collapse>
    </>
  );
}
