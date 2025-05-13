import { createAsyncThunk } from "@reduxjs/toolkit";
import { getServerHealth } from "../../../../service/serverService";

export const fetchServerHealth = createAsyncThunk(
  "serverHealth/fetchServerHealth",
  (serviceNodeId) => {
    return getServerHealth(serviceNodeId).then((response) => response.data);
  }
);
