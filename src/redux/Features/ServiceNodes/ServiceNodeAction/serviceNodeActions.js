import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getServiceNodes,
  getServiceNodeHealth,
} from "../../../../service/serviceNodeService";

export const fetchServiceNodes = createAsyncThunk(
  "serviceNodes/fetchServiceNodes",
  () => {
    return getServiceNodes().then((response) => response.data);
  }
);

export const fetchServiceNodeHealth = createAsyncThunk(
  "serviceNodes/fetchServiceNodeHealth",
  (serviceNodeId) => {
    return getServiceNodeHealth(serviceNodeId).then(
      (response) => response.data
    );
  }
);
