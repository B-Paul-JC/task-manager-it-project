/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function TasksView({ taskType }) {
  /**
   * create a state for tasks
   * @type {Task[]}
   */
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`http://loaclhost:3001/api/tasks/${taskType}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [taskType]);
  // create a fake list of tasks
  useEffect(() => {
    const fakeTasks = [
      {
        id: 1,
        title: "Task 1",
        description: "This is the first task",
        priority: "High",
        partnerTeams: "Team A, Team B",
        status: "In Progress",
        timeCreated: Date.now(),
        timeCompleted: null,
        deadline: Date.now() + 1000 * 60 * 60 * 24,
      },
      {
        id: 2,
        title: "Task 2",
        description: "This is the second task",
        priority: "Low",
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
        priority: "Medium",
        partnerTeams: "Team B, Team C",
        status: "In Progress",
        timeCreated: Date.now(),
        timeCompleted: null,
        deadline: Date.now() + 1000 * 60 * 60 * 24,
      },
    ];
    setTasks(fakeTasks);
  }, []);
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-600 font-semibold">Title</div>
              <div>{task.title}</div>
              <div className="text-gray-600 font-semibold">Description</div>
              <div>{task.description}</div>
              <div className="text-gray-600 font-semibold">Priority</div>
              <div>{task.priority}</div>
              <div className="text-gray-600 font-semibold">Partner Teams</div>
              <div>{task.partnerTeams}</div>
              <div className="text-gray-600 font-semibold">Status</div>
              <div>{task.status}</div>
              <div className="text-gray-600 font-semibold">Time Created</div>
              <div>{new Date(task.timeCreated).toLocaleString()}</div>
              <div className="text-gray-600 font-semibold">Time Completed</div>
              <div>
                {task.timeCompleted
                  ? new Date(task.timeCompleted).toLocaleString()
                  : "Not Completed"}
              </div>
              <div className="text-gray-600 font-semibold">Deadline</div>
              <div>{new Date(task.deadline).toLocaleString()}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
