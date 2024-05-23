/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, Children } from "react";
import { io } from "socket.io-client";

export const useSocket = ({ handShakeAuth, url }) => {
  const [socket, setSocket] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const socketUrl = url;
    const socketOptions = {
      reconnection: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 3000,
      transport: ["websocket"],
    };

    const socketInstance = io(socketUrl, socketOptions);
    setSocket(socketInstance);

    return () => socketInstance.disconnect();
  }, [url]);

  useEffect(() => {
    if (socket && typeof socket.emit === "function") {
      socket.on("disconnect", (data) => {
        console.log("Reconnecting...");
        socket.on("connect", () => {
          console.log("Reconnected!");
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket && typeof socket.emit === "function") {
      socket.emit("handshake", {
        auth: `${localStorage.getItem("token") || handShakeAuth}`,
      });

      socket.on("teams", (data) => {
        setTeams(data);
      });
    }
  }, [handShakeAuth, socket]);

  return { socket, teams };
};
