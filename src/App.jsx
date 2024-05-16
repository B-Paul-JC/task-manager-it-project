/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { AppSideBar } from "./components/sidebar";
import { Header } from "./components/header";
import TasksView from "./components/view-tasks/tasksView";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

function App() {
  const { taskType, teamId } = useLoaderData();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <AppSideBar {...{ isCollapsed, setIsCollapsed, teamId }} />
      <main className="font-poppins">
        <Header {...{ isCollapsed, setIsCollapsed, taskType, teamId }} />
        <section className={`${isCollapsed ? "ml-16" : "ml-72"} pt-28 mr-10`}>
          {!taskType ? "" : <TasksView {...{ taskType, teamId }} />}
        </section>
      </main>
    </>
  );
}

export default App;
