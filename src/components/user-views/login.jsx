import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../functions/formHandlers";

export const LoginPage = () => {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    login({ staffId, password })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          window.location.href = "/";
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-silver">
      <div className="w-1/3 bg-white shadow-md p-8 rounded-lg">
        <h1 className="text-3xl mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Staff ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Login
            </button>
            <Link to="/apply">
              <button className="bg-transparent hover:bg-blue hover:text-white text-blue-dark font-semibold py-2 px-4 rounded">
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
