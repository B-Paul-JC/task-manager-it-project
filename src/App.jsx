/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { AppSideBar } from "./components/sidebar";
import { Header } from "./components/header";
import TasksView from "./components/view-tasks/tasksView";
import "./styles/app.css";
import { useLoaderData } from "react-router-dom";
import { useSocket } from "./components/functions/socketHook";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { taskType } = useLoaderData();
  const isCollapsed = useSelector((state) => state.collapse.value);
  const dispatch = useDispatch();

  // Whenever this line executes, it causes stack overflow
  // Anoying, not sure how to fix it
  // I tried moving it to a different place, but that just cause more errors
  useSocket({
    handShakeAuth: "oauth",
    url: "http://localhost:3000",
    dispatch,
  });

  return (
    <>
      <AppSideBar />
      <main className="font-poppins">
        <Header />
        <section className={`${isCollapsed ? "ml-16" : "ml-72"} pt-28 mr-10`}>
          {!taskType ? "" : <TasksView {...{ taskType }} />}
        </section>
      </main>
    </>
  );
}

export default App;
