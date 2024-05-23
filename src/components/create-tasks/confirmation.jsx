/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import checkriv from "../../assets/riv/checkmark.riv";
import Rive from "@rive-app/react-canvas";

const Simple = () => (
  <Rive
    src="https://cdn.rive.app/animations/vehicles.riv"
    stateMachines="bumpy"
  />
);

export function CreationConfirmation({ isCreationSuccessful, onClose, error }) {
  return (
    <div className="fixed top-0 right-0 left-0 z-10 overflow-y-auto bg-black bg-opacity-40 w-full h-full">
      <div
        className="flex items-center justify-center p-4"
        onClick={(ev) => {
          if (ev.currentTarget == ev.target) onClose();
        }}
      >
        <div className="relative w-full max-w-lg">
          <div className="relative bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col items-center">
              {isCreationSuccessful ? (
                <div className="bg-green-500 rounded-lg p-4 text-2xl">
                  <Simple />
                  Task Created Successfully
                </div>
              ) : (
                <div className="bg-red-500 rounded-lg p-4 text-2xl">
                  <Simple />
                  Task Creation Failed
                  {error?.message}
                </div>
              )}
              <button
                onClick={onClose}
                className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
