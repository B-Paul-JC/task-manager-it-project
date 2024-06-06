import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles.css";
import { routes } from "./routes.jsx";
import { Socket } from "./components/functions/socketClass.js";
import { Provider } from "react-redux";
import { store } from "./manager/store.js";

export const socketHandler = new Socket("http://localhost:3001").socket;
console.log(socketHandler);
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
