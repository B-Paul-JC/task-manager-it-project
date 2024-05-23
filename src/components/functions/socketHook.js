/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { SET_SOCKET, SET_TEAMS } from "./actions";
import { useSelector } from "react-redux";

export const useSocket = ({ handShakeAuth, url, dispatch }) => {
  const socketAndTeams = useSelector((state) => state.socketAndTeams.value);
  const { socket, teams } = socketAndTeams;

  useEffect(() => {
    const socketUrl = url;
    const socketOptions = {
      reconnection: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 3000,
      transport: ["websocket"],
    };

    const socketInstance = io(socketUrl, socketOptions);

    dispatch(SET_SOCKET(socketInstance));

    return () => socketInstance.disconnect();
  }, [dispatch, socket, url]);

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
        dispatch(SET_TEAMS(teams));
      });
    }
  }, [handShakeAuth, teams, socket, dispatch]);

  return { socket, teams };
};
