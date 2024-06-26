/* eslint-disable react/prop-types */
import { useReducer, Children } from "react";
import { reducer } from "../functions/reducer";
import { submitForm } from "../functions/createTask";
import { FaTimesCircle } from "react-icons/fa";

export function CreationForm({ onClose, teams }) {
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
  const priorities = [
    "URGENT",
    "IMPORTANT",
    "MEDIUM IMPORTANCE",
    "LOW IMPORTANCE",
    "OPTIONAL",
  ];

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

  const { team } = state;

  const handleCreateTask = (e) => {
    e.preventDefault();

    const form = document.getElementById("task-form");

    const formData = new FormData(form);
    submitForm(formData);
    onClose();
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-10 overflow-y-auto bg-black bg-opacity-40 w-full h-full">
      <div
        className="flex items-center justify-center p-4"
        onClick={(ev) => {
          if (ev.currentTarget == ev.target) onClose();
        }}
      >
        <div className="relative w-full max-w-lg">
          <div className="flex justify-end"></div>
          <div className="relative bg-white rounded-lg shadow-lg p-8">
            <form id="task-form">
              <div className="flex flex-row justify-between">
                <h1 className="text-lg text-gray-900 font-semibold">
                  Create Task
                </h1>
                <button
                  type="button"
                  className="text-blue bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl p-1.5"
                  onClick={onClose}
                >
                  <FaTimesCircle />
                </button>
              </div>
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
                  {Children.toArray(
                    priorities.map((item) => (
                      <option value={item}>{item}</option>
                    ))
                  )}
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
