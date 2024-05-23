/* eslint-disable react/prop-types */
import Logo from "../assets/images/Manager.gif";
import {
  Sidebar,
  Menu,
  MenuItem,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";
import { Notification } from "./view-tasks/notifier";
import {
  FaUsers,
  FaCalendar,
  FaUser,
  FaQuestionCircle,
  FaPlayCircle,
  FaPauseCircle,
  FaCheckCircle,
  FaHome,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_COLLAPSED } from "./functions/actions";

/**
 * The sidebar component that contains the main navigation
 * for the application. It is a fixed position component
 * on the left side of the screen and can be toggled
 * open or closed by clicking on the hamburger button.
 */

export function AppSideBar() {
  const isCollapsed = useSelector((state) => state.collapse.value);
  const dispatch = useDispatch();

  return (
    <>
      <Sidebar
        collapsed={isCollapsed}
        style={{ height: "100vh", position: "fixed" }}
        className="shadow-md shadow-black-shade font-poppins fixed z-10"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "white",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "gray",
          },
          [`.${menuClasses.icon}`]: {
            color: "dodgerblue",
            fontSize: "1rem",
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                color: "black",
                backgroundColor: "grey",
              },
            },
          }}
        >
          <MenuItem
            className={`flex flex-row  hover:bg-transparent ${
              !isCollapsed ? "h-36" : "h-10 mt-4"
            } items-center justify-center`}
            onClick={() => dispatch(TOGGLE_COLLAPSED())}
          >
            <img src={Logo} className="w-32" />
          </MenuItem>

          <MenuItem icon={<FaHome />} component={<Link to={"/"} />}>
            Home
          </MenuItem>
          <MenuItem>Tasks</MenuItem>
          <MenuItem
            icon={<FaPlayCircle />}
            component={<Link to={"/tasks/active"} />}
          >
            Active <Notification taskType="active" />
          </MenuItem>
          <MenuItem
            icon={<FaPauseCircle />}
            component={<Link to={"/tasks/pending"} />}
          >
            Pending <Notification taskType="pending" />
          </MenuItem>
          <MenuItem
            icon={<FaCheckCircle />}
            component={<Link to={"/tasks/completed"} />}
          >
            Completed <Notification taskType="completed" />
          </MenuItem>

          <MenuItem>User</MenuItem>
          <MenuItem icon={<FaUsers />} component={<Link to={"/user/team"} />}>
            Team
          </MenuItem>
          <MenuItem icon={<FaUser />} component={<Link to={"/user/profile"} />}>
            Profile
          </MenuItem>
          <MenuItem
            icon={<FaQuestionCircle />}
            compnent={<Link to={"/faqs"} />}
          >
            FAQ
          </MenuItem>
          <MenuItem icon={<FaCalendar />} component={<Link to={"/calender"} />}>
            Calendar
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}
