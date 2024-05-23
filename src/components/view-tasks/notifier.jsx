/* eslint-disable react/prop-types */
export const Notification = ({ hasNewTask }) => {
  return hasNewTask ? <span>New</span> : "";
};
