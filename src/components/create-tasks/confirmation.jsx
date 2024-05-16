/* eslint-disable react/prop-types */
import { useState } from "react";

export function CreationConfirmation({ isCreationSuccessful, error }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleOnClose = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && (
        <div className="fixed z-50 bg-gray-900 rounded-lg shadow-lg">
          <div className="flex justify-center">
            <div className="mx-auto p-4 w-96">
              <div className="flex flex-col items-center">
                {isCreationSuccessful ? (
                  <div className="bg-green-500 rounded-lg p-4 text-white text-2xl">
                    Task Created Successfully
                  </div>
                ) : (
                  <div className="bg-red-500 rounded-lg p-4 text-white text-2xl">
                    Task Creation Failed
                    {error.message}
                  </div>
                )}
                <button
                  onClick={handleOnClose}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
