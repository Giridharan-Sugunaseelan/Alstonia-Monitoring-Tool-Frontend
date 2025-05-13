import { configureStore } from "@reduxjs/toolkit";
// import { createLogger } from "redux-logger";
import serverReducer from "../Features/Servers/ServerSlice";
import serviceNodeReducer from "../Features/ServiceNodes/serviceNodeSlice";
import serviceNodeHealthReducer from "../Features/ServiceNodeHealth/serviceNodeHealthSlice";
import serverHealthReducer from "../Features/ServerHealth/ServerHealthSlice";
// const logger = createLogger();

const store = configureStore({
  reducer: {
    serviceNodes: serviceNodeReducer,
    servers: serverReducer,
    serviceNodeHealth: serviceNodeHealthReducer,
    serverHealth: serverHealthReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
