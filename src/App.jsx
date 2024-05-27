/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { AppSideBar } from "./components/sidebar";
import { Header } from "./components/header";
import TasksView from "./components/view-tasks/tasksView";
import { useState } from "react";
import "./styles/app.css";
import { useLoaderData } from "react-router-dom";
import { useSocket } from "./components/functions/socketHook";
import {
  GetStarted,
  TaskPlaceholder,
} from "./components/view-tasks/placeholder";

function App() {
  const { taskType, teamId } = useLoaderData();
  const { isLoggedIn, setIsLoggedIn } = useState(false);
  const { socket, teams } = useSocket({
    handShakeAuth: "oauth",
    url: "http://localhost:3000",
    onConnect: () => {
      console.log("Connected to socket");
      socket.emit("subscribe", teamId);
    },
  });
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      {!isLoggedIn ? (
        <div className="grid place-items-center h-screen">
          <GetStarted />
        </div>
      ) : (
        <>
          <AppSideBar {...{ isCollapsed, setIsCollapsed, teamId, teams }} />
          <main
            className="relative font-poppins bg-alley-blue shadow-inner-full h-dvh text-sm ml-16"
            style={{ width: "calc(100% - 64px)!important" }}
          >
            <Header {...{ taskType, teamId, teams }} />
            <section className="w-11/12 mx-10 bg-white rounded-lg absolute mt-28 h-3/4 shadow-md">
              {!taskType ? (
                <TaskPlaceholder />
              ) : (
                <TasksView {...{ taskType, teamId, teams }} />
              )}
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default App;
