/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

/**
 * Creates a WebSocket connection and listens for messages to update the count of a specific task type.
 *
 * @param {string} taskType - The type of task to listen for updates.
 * @return {JSX.Element|null} - A span element displaying the count if it is greater than 0, otherwise null.
 */
export function Notis(props) {
  const taskType = props.taskType.toUpperCase();
  const [count, setCount] = useState(0);

  /**
   * Establishes a WebSocket connection with the server at the specified URL and sets up event listeners for the 'open', 'message', and 'close' events.
   *
   * @return {void} This function does not return anything.
   */
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketUrl = "localhost:3001";
    const socketOptions = {
      reconnection: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 3000,
      transport: ["websocket"],
    };

    const socketInstance = io(socketUrl, socketOptions);
    setSocket(socketInstance);

    return () => socketInstance.disconnect();
  }, []);

  useEffect(() => {
    if (socket && typeof socket.on === "function") {
      socket.on("handshake", () => {
        console.log("Handshake was successful");
      });
      socket.on("disconnect", () => {
        console.log("Disconnected from the server");
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket && typeof socket.emit === "function") {
      socket.emit("handshake", {
        Authorization: `Bearer ${localStorage.getItem("token") || null}`,
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket && typeof socket.emit === "function") {
      socket.emit("subscribe", { taskType });
    }
  }, [socket, taskType]);

  useEffect(() => {
    if (socket && typeof socket.on === "function") {
      socket.on("update", (data) => {
        setCount(data.count);
      });
    }
  }, [socket]);

  return count > 0 ? <span>{count}</span> : null;
}
