import { createAsyncThunk } from "@reduxjs/toolkit";
import { getServerDetails } from "../../../../service/serverService";

export const fetchServers = createAsyncThunk(
  "servers/fetchServers",
  (serviceNodeId) => {
    return getServerDetails(serviceNodeId).then((response) => response.data);
  }
);
