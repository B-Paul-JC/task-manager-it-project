/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { io } from "socket.io-client";

export class Socket {
  constructor(url, handShakeAuth = "oauth") {
    this.socket = io(url, {
      transports: ["websocket"],
      auth: handShakeAuth,
    }).connect();
    this.subscribed = [];
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }

  emit(event, ...args) {
    this.socket.emit(event, ...args);
  }

  subscribe(teamId) {
    if (!this.subscribed.includes(teamId)) {
      this.subscribed.push(teamId);
      this.socket.emit("subscribe", teamId);
    }
  }

  unsubscribe(teamId) {
    if (this.subscribed.includes(teamId)) {
      this.subscribed.splice(this.subscribed.indexOf(teamId), 1);
      this.socket.emit("unsubscribe", teamId);
    }
  }

  disconnect() {
    this.socket.disconnect();
  }
}
