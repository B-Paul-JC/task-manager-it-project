/* eslint-disable react/prop-types */
import { useReducer, useState, Children, useEffect } from "react";
import { reducer } from "../functions/reducer";
import { submitForm } from "../functions/createTask";

export function CreationForm({ onClose }) {
  const [teams, setTeams] = useState([]);
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    description: "",
    priority: "low",
    team: {
      id: "",
      name: "",
    },
    deadline: "",
  });

  const handleTitleChange = (e) =>
    dispatch({ type: "setTitle", value: e.target.value });
  const handleDescriptionChange = (e) =>
    dispatch({ type: "setDescription", value: e.target.value });
  const handlePriorityChange = (e) =>
    dispatch({ type: "setPriority", value: e.target.value });
  const handleTeamChange = (e) => {
    dispatch({
      type: "setTeam",
      value: {
        id: e.target.dataset.id,
        name: e.target.textContent,
      },
    });
  };

  const getTeams = async () => {
    fetch("http://localhost:3001/api/teams/all", { method: "POST" })
      .then((response) => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Parse the response body as JSON
        return response.json();
      })
      .then((data) => {
        // Use the data here
        setTeams(data.teams);
      })
      .catch((error) => {
        // Handle errors
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  useEffect(() => {
    getTeams();
  }, []);

  const { team } = state;

  const handleCreateTask = (e) => {
    e.preventDefault();

    const form = document.getElementById("task-form");

    const formData = new FormData(form);
    submitForm(formData);
    console.log(formData);
    onClose();
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-10 overflow-y-auto bg-black bg-opacity-40 w-full h-full">
      <div className="flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg">
          <div className="flex justify-end">
            <button
              type="button"
              className="text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
              onClick={onClose}
            >
              X
            </button>
          </div>
          <div className="relative bg-white rounded-lg shadow-lg p-8">
            <form id="task-form">
              <h1 className="text-lg text-gray-900 font-semibold">
                Create Task
              </h1>
              <div className="my-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-900"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={state.title}
                  onChange={(e) => handleTitleChange(e)}
                />
              </div>
              <div className="my-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={state.description}
                  name="description"
                  onChange={(e) => handleDescriptionChange(e)}
                />
              </div>
              <div className="my-4">
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-900"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={state.priority}
                  name="priority"
                  onChange={(e) => handlePriorityChange(e)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="my-4">
                <label
                  htmlFor="teamId"
                  className="block text-sm font-medium text-gray-900"
                >
                  Team
                </label>
                <select
                  id="teamId"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={team.teamId}
                  name="teamId"
                  onChange={(e) => handleTeamChange(e)}
                >
                  <option value="">Select Team</option>
                  {Children.toArray(
                    teams
                      .sort((a, b) => {
                        if (a.teamName < b.teamName) return -1;
                        if (a.teamName > b.teamName) return 1;
                        return 0;
                      })
                      .map((team) => (
                        <option key={team.teamId} value={team.teamId}>
                          {team.teamName}
                        </option>
                      ))
                  )}
                </select>
              </div>
              <div className="my-4">
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-900"
                >
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={state.deadline}
                  onChange={(e) =>
                    dispatch({ type: "setDeadline", value: e.target.value })
                  }
                />
              </div>
            </form>
            <div className="flex justify-end">
              <button
                type="button"
                className="text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 py-2 px-4 bg-blue rounded-md"
                onClick={handleCreateTask}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreationForm;
