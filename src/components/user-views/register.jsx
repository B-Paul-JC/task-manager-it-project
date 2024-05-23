import { Children, useEffect, useReducer } from "react";
import { registerReducer } from "../functions/reducer";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  team: null,
  errors: {},
  teams: [],
};

export default function RegisterPage() {
  const [state, dispatch] = useReducer(registerReducer, initialState);

  useEffect(() => {
    fetch("http://localhost:3001/api/teams/all", { method: "POST" })
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
    if (!state.name || state.name.trim().length === 0) {
      errors.name = "Name is required";
    }
    if (!state.email || !state.email.match(/^[\w-.]+@[\w-]+\.[a-zA-Z]+$/)) {
      errors.email = "Email is required and must be valid email";
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
    dispatch({ type: "setError", key: "name", value: errors.name });
    dispatch({ type: "setError", key: "email", value: errors.email });
    dispatch({ type: "error", key: "password", value: errors.password });
    if (
      Object.keys(errors).length === 0 &&
      state.team &&
      state.name &&
      state.email &&
      state.password &&
      state.password === state.confirmPassword
    ) {
      // submitthe form to the server
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up for a team</h2>
      <label>
        Name
        <input
          type="text"
          value={state.name}
          onChange={(e) => dispatch({ type: "setName", value: e.target.value })}
        />
        {state.errors.name && (
          <div style={{ color: "red" }}>{state.errors.name}</div>
        )}
      </label>
      <label>
        Email
        <input
          type="email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "setEmail", value: e.target.value })
          }
        />
        {state.errors.email && (
          <div style={{ color: "red" }}>{state.errors.email}</div>
        )}
      </label>
      <label>
        Password
        <input
          type="password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "setPassword", value: e.target.value })
          }
        />
        {state.errors.password && (
          <div style={{ color: "red" }}>{state.errors.password}</div>
        )}
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={state.confirmPassword}
          onChange={(e) =>
            dispatch({ type: "setConfirmPassword", value: e.target.value })
          }
        />
      </label>
      <label>
        Team
        <select
          value={state.team}
          onChange={(e) => dispatch({ type: "setTeam", value: e.target.value })}
        >
          <option value={null}>Please select a team</option>
          {Children.toArray(
            state.teams
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
        {state.errors.team && (
          <div style={{ color: "red" }}>{state.errors.team}</div>
        )}
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
}
