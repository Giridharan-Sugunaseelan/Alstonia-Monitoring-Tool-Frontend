import axios from "axios";

const BASEURL = "http://localhost:8080/monitoring/server";

export const getServerDetails = (serviceNodeId) => {
  return axios.get(`${BASEURL}/${serviceNodeId}`);
};

export const getServerHealth = (serviceNodeId) => {
  return axios.get(`${BASEURL}/health/${serviceNodeId}`);
};
