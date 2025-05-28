import { createSlice } from "@reduxjs/toolkit";
import { fetchServiceNodeHealth } from "../ServiceNodes/ServiceNodeAction/serviceNodeActions";

const initialState = {
  loading: false,
  serviceNodeHealth: {},
  realtime: {},
  error: "",
};

const serviceHealthSlice = createSlice({
  name: "serviceNodeHealth",
  initialState,
  reducers: {
    updateServiceNodeHealth: (state, action) => {
      // const payload = {
      //   ...action.payload,
      //   healthMetrics: JSON.parse(action.payload.healthMetrics),
      // };
      // state.realtime = {
      //   ...state.realtime,
      //   [payload.serviceNode]: payload,
      // };
      state.realtime = {
        ...state.realtime,
        [action?.payload?.serviceNode]: {
          ...state.realtime[action.payload.serviceNode],
          [action.payload.serverIP]: action.payload,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchServiceNodeHealth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchServiceNodeHealth.fulfilled, (state, action) => {
      state.loading = false;
      state.serviceNodeHealth = {
        ...state.serviceNodeHealth,
        [action?.payload[0]?.serviceNode]: action.payload,
      };
      state.error = "";
    });
    builder.addCase(fetchServiceNodeHealth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default serviceHealthSlice.reducer;
export const { updateServiceNodeHealth } = serviceHealthSlice.actions;
