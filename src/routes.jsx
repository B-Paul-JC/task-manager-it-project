import App from "./App";
import ErrorPage from "./components/errorPage";
import { LoginPage } from "./components/user-views/login";
import RegisterPage from "./components/user-views/apply";

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: () => ({
      taskType: "",
      teamId: "l5wu7opeq4h843e19g",
      staffId: localStorage.getItem("token"),
    }),
  },
  { path: "/apply", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  {
    path: "tasks/:type",
    element: <App />,
    loader: ({ params }) => {
      console.log(params);
      return {
        taskType: params.type,
        teamId: "l5wu7opeq4h843e19g",
        staffId: localStorage.getItem("token"),
      };
    },
  },
];
