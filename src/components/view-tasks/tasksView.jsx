/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function TasksView({ taskType }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`http://loaclhost:3001/api/tasks/${taskType}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [taskType]);

  return (
    <div>
      <table className="table-auto w-full shadow-md overflow-hidden rounded-t-2xl">
        <thead className="bg-grey font-normal">
          <tr>
            <th className="px-4 py-2">Task</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Priority</th>
            <th className="px-4 py-2">Partner Teams</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Time Created</th>
            <th className="px-4 py-2">Time Completed</th>
            <th className="px-4 py-2">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="border px-4 py-2">{task.title}</td>
              <td className="border px-4 py-2">{task.description}</td>
              <td className="border px-4 py-2">{task.priority}</td>
              <td className="border px-4 py-2">{task.partnerTeams}</td>
              <td className="border px-4 py-2">{task.status}</td>
              <td className="border px-4 py-2">{task.timeCreated}</td>
              <td className="border px-4 py-2">{task.timeCompleted}</td>
              <td className="border px-4 py-2">{task.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
