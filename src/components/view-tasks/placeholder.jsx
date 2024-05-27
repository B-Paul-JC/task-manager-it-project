import { ArrowOutwardRounded, ArrowUpwardRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";

export function TaskPlaceholder() {
  return (
    <div className="grid place-items-center p-4 gap-4 text-black-shade w-full h-full grid-cols-6 grid-rows-6">
      <p className="text-center col-start-5 col-end-7 row-start-1 row-end-3">
        <ArrowUpwardRounded />
        <ul className="list-disc list-inside m-4 text-md text-left">
          <li>Change theme</li>
          <li>Get Alerts</li>
          <li>Search tasks</li>
        </ul>
      </p>
      <p className="text-center col-start-1 col-end-2 row-start-1 row-end-3">
        <ArrowOutwardRounded className="-rotate-90" />
        <p className="m-4 text-md">Your Current Location</p>
      </p>
      <p className="text-center col-start-1 flex flex-row items-center col-end-3 row-start-3 row-end-5">
        <div className="flex flex-col justify-between">
          <ArrowOutwardRounded className="-rotate-90" />
          <br />
          <ArrowUpwardRounded className="-rotate-90" />
        </div>
        <ul className="list-disc list-inside m-4 text-md text-left">
          <li>Navigate through tasks by type</li>
          <br />
          <li>Checkout your team information</li>
        </ul>
      </p>
      <p className="text-center col-start-1 col-end-2 row-start-5 row-end-7 items-center">
        <div className="m-4 text-md text-left">
          Personal Information
          <br />
          General Calendar
        </div>
        <ArrowOutwardRounded className="-rotate-180" />
      </p>
      <p className="text-center col-start-5 col-end-7 row-start-5 row-end-7">
        <ul className="list-disc list-inside m-4 text-md text-left">
          <li>Team ID</li>
          <li>Position in team</li>
        </ul>
        <ArrowUpwardRounded className="rotate-180" />
      </p>
      <h3 className="text-4xl uppercase row-start-3 row-end-4 col-start-3 col-end-5 text-center font-semibold">
        Welcome to task manager
      </h3>
      <h4 className="text-3xl uppercase row-start-4 row-end-6 col-start-3 col-end-5 text-center font-semibold">
        Get started
      </h4>
    </div>
  );
}

export const GetStarted = () => {
  return (
    <div className="text-center flex flex-row justify-between bg-white shadow-md w-64 h-12 items-center p-10 rounded-lg">
      <Link to="/apply">
        <button className="bg-blue hover:bg-blue-700 text-white py-2 px-4 rounded">
          Apply
        </button>
      </Link>
      <Link to="/login">
        <button className="bg-blue hover:bg-blue-700 text-white py-2 px-4 rounded">
          Login
        </button>
      </Link>
    </div>
  );
};
