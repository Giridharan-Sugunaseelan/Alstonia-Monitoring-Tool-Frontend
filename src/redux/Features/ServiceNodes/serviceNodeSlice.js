import { createSlice } from "@reduxjs/toolkit";
import { fetchServiceNodes } from "./ServiceNodeAction/serviceNodeActions";

const initialState = {
  loading: false,
  serviceNodes: [],
  error: "",
};

const serviceNodeSlice = createSlice({
  name: "serviceNodes",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchServiceNodes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchServiceNodes.fulfilled, (state, action) => {
      state.loading = false;
      state.serviceNodes = action.payload;
      state.error = "";
    });
    builder.addCase(fetchServiceNodes.rejected, (state, action) => {
      state.loading = false;
      state.serviceNodes = [];
      state.error = action.error.message;
    });
  },
});

export default serviceNodeSlice.reducer;
