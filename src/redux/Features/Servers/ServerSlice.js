import { createSlice } from "@reduxjs/toolkit";
import { fetchServers } from "./ServerAction/ServerAction";

const initialState = {
  loading: false,
  servers: {},
  error: "",
};

const serverSlice = createSlice({
  name: "server",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchServers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchServers.fulfilled, (state, action) => {
      state.loading = false;
      state.servers = {
        ...state.servers,
        [action?.payload[0]?.serviceNode]: action.payload,
      };
      state.error = "";
    });
    builder.addCase(fetchServers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default serverSlice.reducer;
