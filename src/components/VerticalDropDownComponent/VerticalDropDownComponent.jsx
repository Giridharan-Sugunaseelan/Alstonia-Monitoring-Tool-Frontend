import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListItemButton,
  Typography,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import InstanceComponent from "../InstanceComponent/InstanceComponent";
import { useTheme } from "@mui/material/styles";

export default function VerticalDropdownComponent({
  name,
  stateKey,
  serviceNode,
  onClick,
}) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  function handleClick() {
    setOpen((prev) => !prev);
    onClick();
  }

  const data = useSelector((state) => state[stateKey][stateKey]?.[serviceNode]);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClick} sx={{ pl: theme.spacing(4) }}>
          <Typography
            variant="subtitle2"
            color="text.primary"
            sx={{ flexGrow: 1 }}
          >
            {name}
          </Typography>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {data?.length === 0 && (
            <ListItem sx={{ pl: theme.spacing(6) }}>
              <Typography variant="body2" color="text.secondary">
                No data available
              </Typography>
            </ListItem>
          )}
          {data?.map((instanceName, idx) => (
            <ListItemButton key={idx} sx={{ pl: theme.spacing(6) }}>
              <ListItem disablePadding>
                <InstanceComponent name={instanceName.serverIP} status="up" />
              </ListItem>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}
