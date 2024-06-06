/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function TasksView({ taskType }) {
  /**
   * create a state for tasks
   * @type {Task[]}
   */
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
    <div>
      {tasks.map((task) => {
        if (taskType !== task.status.toLowerCase()) return <></>;
        const colorCodes = {
          URGENT: "urgent",
          IMPORTANT: "important",
          "MEDIUM IMPORTANCE": "medium",
          "LOW IMPORTANCE": "low",
          OPTIONAL: "optional",
        };
        const colorCode = colorCodes[task.priority];

        return (
          <div key={task.id}>
            <div className="p-4 m-3 rounded-lg shadow-md">
              <div className="grid grid-cols-12 grid-rows-6 place-items-center p-2 gap-2">
                <span className="text-black font-semibold col-start-1 col-end-6 text-2xl place-self-start">
                  {task.title}
                </span>
                <p className="col-start-1 col-end-10 row-start-3 row-end-6 place-self-start">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque facilis totam laudantium laborum a sint! Ut
                  repudiandae quibusdam aspernatur sint dolore expedita
                  inventore fugit, perspiciatis iusto? Fugit, quis! Perferendis
                  vero at ipsa quibusdam soluta culpa maiores, eius, recusandae
                  repellat eos animi, eligendi dolore reiciendis sed! Nam dolore
                  quas qui totam perferendis, amet ullam aut vero deserunt cum
                  autem? Laboriosam nihil ex earum natus porro labore debitis
                  ipsum, delectus quae, commodi non iusto fugiat sapiente,
                  perferendis nisi veritatis fugit consectetur consequuntur.
                </p>
                <span
                  className={`bg-priority-${colorCode} col-start-12 text-white col-end-13 px-2 py-1 rounded-md`}
                >
                  {task.priority}
                </span>
                <div className="text-black-shade place-self-start">
                  {task.status}
                </div>
                <div className="flex flex-col col-start-10 col-end-13 row-start-5 row-end-7 font-roboto">
                  <div>{new Date(task.timeCreated).toLocaleString()}</div>
                  <div>
                    {task.timeCompleted
                      ? new Date(task.timeCompleted).toLocaleString()
                      : "Not Completed"}
                  </div>
                  <div>
                    <strong>Deadline:</strong>{" "}
                    {new Date(task.deadline).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
