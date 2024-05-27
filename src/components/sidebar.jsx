/* eslint-disable react/prop-types */
import Logo from "../assets/images/Manager.gif";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import { Link, useLocation } from "react-router-dom";
import { Children } from "react";

/**
 * The sidebar component that contains the main navigation
 * for the application. It is a fixed position component
 * on the left side of the screen and can be toggled
 * open or closed by clicking on the hamburger button.
 */

export function AppSideBar() {
  const currentLocation = useLocation().pathname;

  /**
   * The properties of the sidebar component.
   * @type {BarProps[]}
   */
  const barProps1 = [
    {
      name: "Home",
      to: "/",
      location: "/",
      component: <HomeRoundedIcon />,
      breakPoint: true,
    },
    {
      name: "Active",
      to: "/tasks/active",
      location: "/tasks/active",
      component: <PlayArrowRoundedIcon />,
    },
    {
      name: "Pending",
      to: "/tasks/pending",
      location: "/tasks/pending",
      component: <PendingActionsRoundedIcon />,
    },
    {
      name: "Completed",
      to: "/tasks/completed",
      location: "/tasks/completed",
      component: <TaskAltRoundedIcon />,
      breakPoint: true,
    },
    {
      name: "Team",
      to: "/team",
      location: "/team",
      component: <GroupRoundedIcon />,
    },
  ];

  const barProps2 = [
    {
      name: "Profile",
      to: "/profile",
      location: "/profile",
      component: <ManageAccountsRoundedIcon />,
    },
    {
      name: "Calendar",
      to: "/calendar",
      location: "/calendar",
      component: <TodayRoundedIcon />,
    },
  ];

  return (
    <aside
      className="h-full fixed z-20 w-16 flex py-4 flex-col items-center justify-between"
      style={{ backgroundColor: "#070a18" }}
    >
      <div className="w-10 aspect-square m-0 rounded-full overflow-hidden ">
        <img src={Logo} alt="" />
      </div>
      <div className="flex flex-col items-center justify-between">
        {Children.toArray(
          barProps1.map((item) => (
            <>
              <span className="py-1 group">
                <Link
                  to={item.to}
                  className={`text-grey px-4 relative py-3 flex flex-row ${
                    currentLocation == item.location ? "active" : ""
                  }`}
                  style={{ backgroundColor: "#070a18" }}
                >
                  {item.component}{" "}
                  <span
                    className="absolute group-hover:scale-x-100 scale-x-0 ml-11 rounded-r-3xl origin-left pl-2 pr-4 py-3 top-0 z-10"
                    style={{ backgroundColor: "#070a18" }}
                  >
                    {item.name}
                  </span>
                </Link>
              </span>
            </>
          ))
        )}
      </div>
      <div>
        {Children.toArray(
          barProps2.map((item) => (
            <>
              <span className="py-1 group">
                <Link
                  to={item.name}
                  className={`text-grey px-4 relative py-3 flex flex-row ${
                    currentLocation == item.location ? "active" : ""
                  }`}
                  style={{ backgroundColor: "#070a18" }}
                >
                  {item.component}{" "}
                  <span
                    className="absolute group-hover:scale-x-100 scale-x-0 ml-11 rounded-r-3xl origin-left pl-2 pr-4 py-3 top-0 z-10"
                    style={{ backgroundColor: "#070a18" }}
                  >
                    {item.name}
                  </span>
                </Link>
              </span>
            </>
          ))
        )}
      </div>
    </aside>
  );
}
