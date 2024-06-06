/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { CreationConfirmation } from "./create-tasks/confirmation";
import { CreationForm } from "./create-tasks/creationForm";
import { useLocation } from "react-router-dom";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";

export function Header(props) {
  const { taskType, teamId, teams } = props;
  const [isAdmin, setIsAdmin] = useState(true);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const currentLocation = useLocation()
    .pathname.substring(1)
    .replace("/", " / ");

  return (
    <header className="absolute top w-full flex flex-row items-end justify-between p-8 z-2 font-poppins">
      <div>
        <h2 className="capitalize font-semibold">{currentLocation || "/"}</h2>
        <p className="prose capitalize text-3xl font-semibold">
          {taskType || "Home"}
        </p>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-row justify-between items-center shadow-inner shadow-black-shade backdrop-blur-xl bg-opacity-50 bg-white p-3 rounded-full">
          <input
            type="text"
            placeholder="search"
            className="border-0 bg-grey rounded-4xl"
          />
          <button className="m-2 text-black-shade">
            <WbSunnyRoundedIcon />
          </button>
          <button className="m-2 text-black-shade">
            <NotificationsActiveRoundedIcon />
          </button>
          <div className="avatar h-10 w-10 rounded-full overflow-hidden">
            <img src="https://i.pravatar.cc" alt="" />
          </div>
        </div>
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
