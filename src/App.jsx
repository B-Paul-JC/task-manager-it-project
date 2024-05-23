/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { AppSideBar } from "./components/sidebar";
import { Header } from "./components/header";
import TasksView from "./components/view-tasks/tasksView";
import { useState } from "react";
import "./styles/app.css";
import { useLoaderData } from "react-router-dom";
import { useSocket } from "./components/functions/socketHook";

function App() {
  const { taskType, teamId } = useLoaderData();
  const { socket, teams } = useSocket({
    handShakeAuth: "oauth",
    url: "http://localhost:3000",
    onConnect: () => {
      console.log("Connected to socket");
      socket.emit("subscribe", teamId);
    },
  });
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <AppSideBar {...{ isCollapsed, setIsCollapsed, teamId, teams }} />
      <main className="font-poppins">
        <Header {...{ isCollapsed, setIsCollapsed, taskType, teamId, teams }} />
        <section className={`${isCollapsed ? "ml-16" : "ml-72"} pt-28 mr-10`}>
          {!taskType ? "" : <TasksView {...{ taskType, teamId, teams }} />}
        </section>
      </main>
    </>
  );
}

export default App;
