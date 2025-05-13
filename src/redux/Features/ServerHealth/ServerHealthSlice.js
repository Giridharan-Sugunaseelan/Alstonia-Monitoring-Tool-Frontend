import { createSlice } from "@reduxjs/toolkit";
import { fetchServerHealth } from "./ServerHealthAction/ServerHealthAction";

const initialState = {
  loading: false,
  serverHealth: {},
  realTime: {},
  error: "",
};

const serverHealthSlice = createSlice({
  name: "serverHealth",
  initialState,
  reducers: {
    updateServerHealth: (state, action) => {
      state.realTime = {
        ...state.realTime,
        [action?.payload?.serviceNode]: {
          ...state.realTime[action.payload.serviceNode],
          [action.payload.serverIP]: action.payload,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchServerHealth.pending((state) => {
        state.loading = true;
      })
    );
    builder.addCase(
      fetchServerHealth.fulfilled((state, action) => {
        state.loading = false;
        state.serverHealth = {
          ...state.serverHealth,
          [action?.payload[0]?.serviceNode]: action.payload,
        };
        state.error = "";
      })
    );
    builder.addCase(
      fetchServerHealth.rejected((state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    );
  },
});

export default serverHealthSlice.reducer;
export const { updateServerHealth } = serverHealthSlice.actions;
