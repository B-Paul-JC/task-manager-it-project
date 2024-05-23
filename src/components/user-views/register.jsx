import { Children } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  R_EMAIL,
  R_ERROR,
  R_NAME,
  R_PWORD,
  R_TEAM,
} from "../functions/actions";

export default function RegisterPage() {
  const formState = useSelector((state) => state.register.value);
  const { teams } = useSelector((state) => state.socketAndTeams.value);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formState.name || formState.name.trim().length === 0) {
      errors.name = "Name is required";
    }
    if (
      !formState.email ||
      !formState.email.match(/^[\w-.]+@[\w-]+\.[a-zA-Z]+$/)
    ) {
      errors.email = "Email is required and must be valid email";
    }
    if (
      !formState.password ||
      formState.password.length < 6 ||
      formState.password !== formState.confirmPassword
    ) {
      errors.password =
        "Password is required and must be at least 6 characters and match confirm password";
    }
    dispatch(R_ERROR("team", formState.team ? null : "Team is required"));
    dispatch(R_ERROR("name", errors.name));
    dispatch(R_ERROR("email", errors.email));
    dispatch(R_ERROR("password", errors.password));
    if (
      Object.keys(errors).length === 0 &&
      formState.team &&
      formState.name &&
      formState.email &&
      formState.password &&
      formState.password === formState.confirmPassword
    ) {
      // submit the form to the server
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up for a team</h2>
      <label>
        Name
        <input
          type="text"
          value={formState.name}
          onChange={({ target }) => dispatch(R_NAME(target.value))}
        />
        {formState.errors.name && (
          <div style={{ color: "red" }}>{formState.errors.name}</div>
        )}
      </label>
      <label>
        Email
        <input
          type="email"
          value={formState.email}
          onChange={({ target }) => dispatch(R_EMAIL(target.value))}
        />
        {formState.errors.email && (
          <div style={{ color: "red" }}>{formState.errors.email}</div>
        )}
      </label>
      <label>
        Password
        <input
          type="password"
          value={formState.password}
          onChange={({ target }) => dispatch(R_PWORD(target.value))}
        />
        {formState.errors.password && (
          <div style={{ color: "red" }}>{formState.errors.password}</div>
        )}
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={formState.confirmPassword}
          onChange={(e) =>
            dispatch({ type: "setConfirmPassword", value: e.target.value })
          }
        />
      </label>
      <label>
        Team
        <select
          value={formState.team}
          onChange={({ target }) => dispatch(R_TEAM(target.value))}
        >
          <option value={null}>Please select a team</option>
          {Children.toArray(
            teams
              .sort((a, b) => {
                if (a.teamName < b.teamName) return -1;
                if (a.teamName > b.teamName) return 1;
                return 0;
              })
              .map((team) => (
                <option key={team.teamId} value={team.teamId}>
                  {team.teamName}
                </option>
              ))
          )}
        </select>
        {formState.errors.team && (
          <div style={{ color: "red" }}>{formState.errors.team}</div>
        )}
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
}
