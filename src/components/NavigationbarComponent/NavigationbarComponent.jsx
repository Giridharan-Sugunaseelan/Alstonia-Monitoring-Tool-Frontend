import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceNodes } from "../../redux/Features/ServiceNodes/ServiceNodeAction/serviceNodeActions";
import ServiceNodeComponent from "../ServiceNodeComponent/ServiceNodeComponent";
import { Paper, List } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function NavigationbarComponent() {
  const dispatch = useDispatch();
  const serviceNodes = useSelector(
    (state) => state?.serviceNodes?.serviceNodes
  );
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchServiceNodes());
  }, [dispatch]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: "100%",
        p: theme.spacing(0),
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        overflowY: "auto",
        boxSizing: "border-box",
        borderRadius: 0,
      }}
    >
      <List
        sx={{
          bgcolor: theme.palette.background.paper,
        }}
      >
        {serviceNodes.map((serviceNode) => (
          <ServiceNodeComponent
            key={serviceNode.serviceNodeId}
            service={serviceNode}
          />
        ))}
      </List>
    </Paper>
  );
}
