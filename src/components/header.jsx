/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { CreationConfirmation } from "./create-tasks/confirmation";
import { CreationForm } from "./create-tasks/creationForm";

export function Header(props) {
  const { taskType, teamId, teams } = props;
  const [isAdmin, setIsAdmin] = useState(true);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  return (
    <header className="absolute top bg-white w-full flex flex-row items-end justify-between p-4 shadow-md pl-72 z-2 font-poppins">
      <div>
        {!taskType ? (
          <></>
        ) : (
          <>
            <h3 className="font-bold">Tasks</h3>
            <h5>A list of all the {taskType} tasks for you team</h5>
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
        <h6 className="inline text-xs py-2">Team ID: #{teamId}</h6>
      </div>
      {isCreateTaskModalOpen ? (
        <CreationForm
          {...{
            onClose: () => {
              setIsCreateTaskModalOpen(false);
              setIsCreatingTask(true);
            },
            onCreateTask: () => setIsCreateTaskModalOpen(false),
            teams,
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
