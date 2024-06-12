/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { setRejectionReason, setShowModal } from "../../manager/appSlice";
import { DeleteForever } from "@mui/icons-material";

export const FailTask = ({ taskId }) => {
  const APPSTATE = useSelector((state) => state.general);

  const handleClose = () => setShowModal();
  const handleShow = () => setShowModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the rejection reason to the database
    // ...
    console.log(taskId);
    handleClose();
  };

  return (
    <>
      <button
        className="hover:text-red text-urgent hover:drop-shadow-lg font-bold py-2 px-4 rounded text-lg"
        onClick={() => handleShow()}
      >
        <DeleteForever />
      </button>

      <div className={`${APPSTATE.showModal ? "" : "hidden"}`}>
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <h2 className="text-2xl mb-4">Reject Task</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                className="border border-gray-300 rounded p-2 mb-2"
                rows={3}
                value={APPSTATE.rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
