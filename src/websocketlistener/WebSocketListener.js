import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { updateServerHealth } from "../redux/Features/ServerHealth/ServerHealthSlice";
import { updateServiceNodeHealth } from "../redux/Features/ServiceNodeHealth/serviceNodeHealthSlice";

let stompClient = null;

const WebSocketListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/monitoring/health");
    stompClient = over(socket);
    stompClient.connect({}, () => {
      console.log("Connected to WebSocket");

      stompClient.subscribe("/topic/server-health", (message) => {
        const data = JSON.parse(message.body);
        dispatch(updateServerHealth(data));
      });

      stompClient.subscribe("/topic/service-health", (message) => {
        const data = JSON.parse(message.body);
        dispatch(updateServiceNodeHealth(data));
      });
    });
  }, []);
};

export default WebSocketListener;
