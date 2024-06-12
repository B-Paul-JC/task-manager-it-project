/* eslint-disable react/prop-types */
import { CheckCircle } from "@mui/icons-material";

export const SuccessTask = ({ taskId }) => {
  const body = JSON.stringify({ taskId });
  const handleClick = () => {
    fetch("http://localhost:3000/api/tasks/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
  };

  return (
    <>
      <button
        className="text-green hover:text-low hover:drop-shadow-lg font-bold py-2 px-4 rounded text-lg"
        onClick={handleClick}
      >
        <CheckCircle />
      </button>
    </>
  );
};
