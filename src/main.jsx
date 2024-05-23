import React from "react";
import ReactDOM from "react-dom/client";
import { ProSidebarProvider } from "react-pro-sidebar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";
import ErrorPage from "./components/errorPage.jsx";
import { Provider } from "react-redux";
import store from "./components/functions/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: () => ({ taskType: "", teamId: "l5wu7opeq4h843e19g" }),
  },
  {
    path: "tasks/:type",
    element: <App />,
    loader: ({ params }) => {
      console.log(params);
      return { taskType: params.type, teamId: "l5wu7opeq4h843e19g" };
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ProSidebarProvider>
        <RouterProvider router={router} />
      </ProSidebarProvider>
    </Provider>
  </React.StrictMode>
);
