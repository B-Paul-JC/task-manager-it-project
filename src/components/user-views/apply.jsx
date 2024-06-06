import { Children, useState } from "react";
import { Link } from "react-router-dom";
import { submitApplication } from "../functions/formHandlers";
import { Loader } from "../loader";
import { useDispatch, useSelector } from "react-redux";
import {
  setConfirmPassword,
  setError,
  setPassword,
  setStaffId,
  setTeamId,
} from "../../manager/registrationSlice";

/**
 * Renders a application page with a form to apply to a team.
 *
 * @return {JSX.Element} The application page JSX element.
 */
export function ApplicationPage() {
  const state = useSelector((state) => state.apply);
  const globalState = useSelector((state) => state.general);
  const [submissionState, setSubmissionState] = useState(false);
  const dispatch = useDispatch();

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
    if (state.teamId == null) {
      errors.teamId = "Team is required";
    }

    dispatch(setError({ ...errors }));

    if (Object.keys(errors).length === 0 && state.teamId && state.staffId) {
      // submit the form to the server
      submitApplication(state)
        .then((message) => {
          message = message.json();
          setSubmissionState(false);
          alert(message);
        })
        .catch((message) => {
          setSubmissionState(false);
          alert(message + "\nPlease Check Email For Approval Updates");
          window.location.assign("/");
        });
      setSubmissionState(true);
    }
  };

  return (
    <div className="grid place-items-center bg-silver h-dvh">
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
                onChange={({ target }) => dispatch(setStaffId(target.value))}
              />
              {state.errors["staffId"] ? (
                <p className="text-red text-xs">{state.errors["staffId"]}</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col col-start-2 col-end-3">
              <select
                className="p-2 border-0 border-b-2"
                name="team"
                style={{ "--tw-ring-shadow": "0" }}
                onChange={({ target }) => dispatch(setTeamId(target.value))}
              >
                <option value="">Select a team</option>
                {Children.toArray(
                  globalState.teams.map((team) => (
                    <option value={team.teamId}>{team.teamName}</option>
                  ))
                )}
              </select>
              {state.errors["teamId"] ? (
                <p className="text-red text-xs">{state.errors["teamId"]}</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col col-start-1 col-end-2">
              <input
                className="p-2 border-0 border-b-2"
                placeholder="Password"
                name="password"
                style={{ "--tw-ring-shadow": "0" }}
                type="password"
                onChange={({ target }) => dispatch(setPassword(target.value))}
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
                  dispatch(setConfirmPassword(target.value))
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
        <Loader />
      )}
    </div>
  );
}
