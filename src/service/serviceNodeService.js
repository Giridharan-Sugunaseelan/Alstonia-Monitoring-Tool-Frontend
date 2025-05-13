import axios from "axios";

const BASE_URL = "http://localhost:8080/monitoring/service";

export const getServiceNodes = () => {
  return axios.get(`${BASE_URL}`);
};

export const getServiceNodeHealth = (serviceNodeId) => {
  return axios.get(`${BASE_URL}/health/${serviceNodeId}`);
};
