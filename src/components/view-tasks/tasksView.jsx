/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FailTask } from "../user-views/failed";
import { SuccessTask } from "../user-views/success";

export default function TasksView() {
  /**
   * create a state for tasks
   * @type {Task[]}
   */
  const APPSTATE = useSelector((state) => state.general);
  const [tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   fetch(`http://loaclhost:3001/api/tasks/${taskType}`, { method: "POST" })
  //     .then((res) => res.json())
  //     .then((data) => setTasks(data));
  // }, [taskType]);
  // create a fake list of tasks
  useEffect(() => {
    const fakeTasks = [
      {
        id: 1,
        title: "Task 1",
        description: "This is the first task",
        priority: "IMPORTANT",
        partnerTeams: "Team A, Team B",
        status: "Active",
        timeCreated: Date.now(),
        timeCompleted: null,
        deadline: Date.now() + 1000 * 60 * 60 * 24,
      },
      {
        id: 2,
        title: "Task 2",
        description: "This is the second task",
        priority: "URGENT",
        partnerTeams: "Team A, Team C",
        status: "Completed",
        timeCreated: Date.now() - 1000 * 60 * 60 * 24,
        timeCompleted: Date.now(),
        deadline: Date.now() + 1000 * 60 * 60 * 24,
      },
      {
        id: 3,
        title: "Task 3",
        description: "This is the third task",
        priority: "OPTIONAL",
        partnerTeams: "Team B, Team C",
        status: "Active",
        timeCreated: Date.now(),
        timeCompleted: null,
        deadline: Date.now() + 1000 * 60 * 60 * 24,
      },
    ];
    setTasks(fakeTasks);
  }, []);
  return (
    <>
      <div>
        {tasks.map((task) => {
          if (APPSTATE.taskType !== task.status.toLowerCase()) return <></>;
          const colorCodes = {
            URGENT: "bg-urgent",
            IMPORTANT: "bg-important",
            "MEDIUM IMPORTANCE": "bg-medium",
            "LOW IMPORTANCE": "bg-low",
            OPTIONAL: "bg-optional",
          };
          const colorCode = colorCodes[task.priority];

          return (
            <div key={task.id}>
              <div className="bg-white p-4 m-3 rounded-lg shadow-md">
                <div className="grid grid-cols-12 grid-rows-6 col place-items-center p-2 gap-2">
                  <span className="text-black font-semibold col-start-1 col-end-6 text-2xl place-self-start">
                    {task.title}
                  </span>
                  <p className="col-start-1 col-end-9 row-start-3 row-end-5 place-self-start">
                    {task.description}
                  </p>
                  <span
                    className={`${colorCode} col-start-12 text-white col-end-13 px-2 py-1 rounded-md`}
                  >
                    {task.priority}
                  </span>
                  <div className="text-black-shade place-self-start">
                    {task.status}
                  </div>
                  <div className="flex flex-row col-start-1 col-end-9 row-start-6 row-end-7 font-roboto justify-self-start gap-5">
                    <div className="bg-black-shade rounded-lg px-3 py-2 text-xs">
                      <span className="font-bold">Start Date: </span>
                      {new Date(task.timeCreated).toLocaleString()}
                    </div>
                    <div className="bg-black-shade rounded-lg px-3 py-2 text-xs">
                      {task.timeCompleted ? (
                        <>
                          <span className="font-bold">Date Completed: </span>
                          {new Date(task.timeCompleted).toLocaleString()}
                        </>
                      ) : (
                        "Not Completed"
                      )}
                    </div>
                    <div className="bg-black-shade rounded-lg px-3 py-2 text-xs">
                      <strong>Deadline:</strong>{" "}
                      {new Date(task.deadline).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex flex-row col-start-10 col-end-13 row-start-6 row-end-7 font-roboto justify-self-end items-left">
                    <FailTask taskId={task.id} />
                    <SuccessTask taskId={task.id} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
