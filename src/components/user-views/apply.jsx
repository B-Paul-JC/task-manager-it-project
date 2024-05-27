import { Children, useEffect, useReducer, useState } from "react";
import { registerReducer } from "../functions/reducer";
import { Link } from "react-router-dom";
import { submitApplication } from "../functions/formHandlers";
import Logo from "../../assets/images/Manager.gif";

const initialState = {
  staffId: "",
  team: "",
  password: "",
  confirmPassword: "",
  errors: {},
  teams: [],
};

/**
 * Renders a application page with a form to apply to a team.
 *
 * @return {JSX.Element} The application page JSX element.
 */
export default function ApplicationPagege() {
  const [state, dispatch] = useReducer(registerReducer, initialState);
  const [submissionState, setSubmissionState] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/teams/all", { method: "POST" })
      .then((response) => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Parse the response body as JSON
        return response.json();
      })
      .then((data) => {
        // Use the data here
        console.log(data);
        dispatch({ type: "setTeams", value: data.teams });
      })
      .catch((error) => {
        // Handle errors
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!state.staffId || state.staffId.trim().length === 0) {
      errors.staffId = "Staff ID is required";
    }
    if (
      !state.password ||
      state.password.length < 6 ||
      state.password !== state.confirmPassword
    ) {
      errors.password =
        "Password is required and must be at least 6 characters and match confirm password";
    }
    dispatch({
      type: "setError",
      key: "team",
      value: state.team ? null : "Team is required",
    });
    if (Object.keys(errors).length === 0 && state.team && state.staffId) {
      // submit the form to the server
      submitApplication(state)
        .then((response) => {
          const resp = response.json();
          console.log(resp);
          return resp;
        })
        .then(({ message, success }) => {
          console.log(message);
          if (success) {
            setSubmissionState(false);
            window.location.assign("/");
          }
        });
      setSubmissionState(true);
    }
  };

  return (
    <div className="grid place-items-center bg-grey h-dvh">
      {!submissionState ? (
        <>
          <form
            className="w-3/6 m-10 shadow-lg bg-white p-10 rounded-3xl gap-6 grid grid-cols-2"
            onSubmit={handleSubmit}
          >
            <h2 className="col-start-1 col-end-3 text-3xl font-semibold pb-1">
              Apply to a team
            </h2>
            <div className="flex flex-col col-start-1 col-end-2">
              <input
                className="p-2 border-0 border-b-2"
                placeholder="Staff ID"
                name="staffId"
                style={{ "--tw-ring-shadow": "0" }}
                type="text"
                onChange={({ target }) =>
                  dispatch({ type: "setStaffId", value: target.value })
                }
              />
              {state.errors.staffId ? (
                <p className="text-red text-xs">{state.errors.staffId}</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col col-start-2 col-end-3">
              <select
                className="p-2 border-0 border-b-2"
                name="team"
                style={{ "--tw-ring-shadow": "0" }}
                onChange={({ target }) =>
                  dispatch({ type: "setTeam", value: target.value })
                }
              >
                <option value="">Select a team</option>
                {Children.toArray(
                  state.teams.map((team) => (
                    <option value={team.teamId}>{team.teamName}</option>
                  ))
                )}
              </select>
            </div>
            <div className="flex flex-col col-start-1 col-end-2">
              <input
                className="p-2 border-0 border-b-2"
                placeholder="Password"
                name="password"
                style={{ "--tw-ring-shadow": "0" }}
                type="password"
                onChange={({ target }) =>
                  dispatch({ type: "setPassword", value: target.value })
                }
              />
            </div>
            <div className="flex flex-col col-start-2 col-end-3">
              <input
                className="p-2 border-0 border-b-2"
                placeholder="Confirm Password"
                name="confirmPassword"
                style={{ "--tw-ring-shadow": "0" }}
                type="password"
                onChange={({ target }) =>
                  dispatch({ type: "setConfirmPassword", value: target.value })
                }
              />
            </div>

            <button
              className="col-start-1 col-end-4 bg-blue p-4 text-white rounded-md hover:shadow-md active:shadow-inner shadow-black-shade"
              type="submit"
            >
              Apply
            </button>
            <p className="col-start-1 col-end-3 text-center text-xs font-bold text-black-shade">
              You will be notified via your staff email when your application is
              approved.
            </p>
          </form>
          <Link to={"/login"}>
            <button className="bg-blue text-white rounded-lg px-4 py-2 shadow-black-shade shadow-md">
              Login
            </button>
          </Link>
        </>
      ) : (
        <>
          <div className="w-72 animate-ping fixed z-10 aspect-square p-8 bg-blue rounded-full overflow-hidden shadow-2xl"></div>
          <div className="w-64 p-8 z-20 bg-white rounded-full overflow-hidden shadow-2xl">
            <img src={Logo} alt="" />
          </div>
        </>
      )}
    </div>
  );
}
