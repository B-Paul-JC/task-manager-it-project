/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { CreationConfirmation } from "./create-tasks/confirmation";
import { CreationForm } from "./create-tasks/creationForm";
import { useSelector } from "react-redux";

export function Header() {
  const tasksAlert = useSelector((state) => state.tasksAlert.value);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  return (
    <header className="absolute top bg-white w-full flex flex-row items-end justify-between p-4 shadow-md pl-72 z-2 font-poppins">
      <div>
        {!tasksAlert?.taskType ? (
          <></>
        ) : (
          <>
            <h3 className="font-bold">Tasks</h3>
            <h5>A list of all the {tasksAlert?.taskType} tasks for you team</h5>
          </>
        )}
      </div>
      <div className="flex flex-col items-end">
        {isAdmin ? (
          <button
            className="rounded-md py-1 px-4 bg-blue text-white font-poppins hover:shadow-lg shadow-black"
            onClick={() => setIsCreateTaskModalOpen(true)}
          >
            + Create
          </button>
        ) : (
          ""
        )}
        <h6 className="inline text-xs py-2">Team ID: #{tasksAlert?.teamId}</h6>
      </div>
      {isCreateTaskModalOpen ? (
        <CreationForm
          {...{
            onClose: () => {
              setIsCreateTaskModalOpen(false);
              setIsCreatingTask(true);
            },
            onCreateTask: () => setIsCreateTaskModalOpen(false),
          }}
        />
      ) : (
        ""
      )}
      {isCreatingTask ? (
        <CreationConfirmation
          {...{ onClose: () => setIsCreatingTask(false) }}
        />
      ) : (
        ""
      )}
    </header>
  );
}
