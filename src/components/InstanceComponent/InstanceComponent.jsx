import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

function InstanceComponent({ name, status }) {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1.5}
      padding={1}
      borderRadius={2}
      width="100%"
    >
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor:
            status === "up"
              ? theme.palette.success.main
              : theme.palette.error.main,
        }}
      />
      <Typography color="text.primary" variant="body2">
        {name}
      </Typography>
    </Box>
  );
}

export default InstanceComponent;
