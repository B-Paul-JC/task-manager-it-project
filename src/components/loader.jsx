/* eslint-disable react/prop-types */
import Logo from "../assets/images/Manager.gif";

export const Loader = ({ isStandAlone = true }) => (
  <div
    className={`${
      isStandAlone
        ? "w-full h-screengrid place-items-center bg-silver grid-cols-5 grid-rows-4"
        : "place-items-center grid col-start-2 col-end-6 row-start-2 row-end-5"
    } `}
  >
    <div className="w-72 animate-ping fixed z-10 aspect-square p-8 bg-blue rounded-full overflow-hidden shadow-2xl"></div>
    <div className="w-64 p-8 z-20 bg-white rounded-full overflow-hidden shadow-2xl">
      <img src={Logo} alt="" />
    </div>
  </div>
);
