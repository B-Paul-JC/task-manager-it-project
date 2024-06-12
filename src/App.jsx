/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { AppSideBar } from "./components/sidebar";
import { Header } from "./components/header";
import TasksView from "./components/view-tasks/tasksView";
import "./styles/app.css";
import {
  GetStarted,
  TaskPlaceholder,
} from "./components/view-tasks/placeholder";
import { useDispatch, useSelector } from "react-redux";
import {
  insertTeamsAsync,
  insertUserTeamsAsync,
  setIsLoggedIn,
  setTaskType,
} from "./manager/appSlice";
import { useEffect } from "react";
import { Loader } from "./components/loader";
import { useLoaderData } from "react-router";

function App() {
  const APPSTATE = useSelector((state) => state.general);
  const { token, taskType } = useLoaderData();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(insertTeamsAsync());
    dispatch(setIsLoggedIn(!!token));
    dispatch(setTaskType(taskType));
    if (token) {
      dispatch(insertUserTeamsAsync(token));
    }
  }, [dispatch, token, taskType]);

  return (
    <>
      {APPSTATE.teams ? (
        <>
          {!APPSTATE.isLoggedIn ? (
            <GetStarted />
          ) : (
            <>
              <AppSideBar />
              <main
                className="relative font-poppins bg-alley-blue shadow-inner-full h-dvh text-sm ml-16"
                style={{ width: "calc(100% - 64px)!important" }}
              >
                <Header />
                <section
                  className={`w-11/12 overflow-y-scroll scrollbar-edited mx-10 ${
                    APPSTATE.taskType
                      ? "bg-opacity-10 bg-gradient-to-br from-silver to-alley-blue"
                      : "bg-white"
                  } rounded-lg backdrop-blur-md border-white border-2 absolute mt-28 h-3/4 shadow-md`}
                >
                  {!APPSTATE.taskType ? <TaskPlaceholder /> : <TasksView />}
                </section>
                <div className="fixed flex flex-row items-center gap-x-5 right-6 bottom-2">
                  <button
                    className="rounded-md bg-tahiti bg-opacity-40 backdrop-blur-lg px-6 py-2 shadow-lg shadow-black-shade"
                    onClick={() => {
                      localStorage.removeItem("token");
                      dispatch(setIsLoggedIn(false));
                    }}
                  >
                    Logout
                  </button>
                </div>
              </main>
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
