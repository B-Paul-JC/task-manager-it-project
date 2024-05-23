/**
 *
 * Register Action Controls
 */
export const R_ERROR = (key, value) => ({
  type: "setError",
  key,
  value,
});
export const R_TEAM = (value) => ({
  type: "setTeam",
  value,
});
export const R_NAME = (value) => ({
  type: "setName",
  value,
});
export const R_EMAIL = (value) => ({
  type: "setEmail",
  value,
});
export const R_PWORD = (value) => ({
  type: "setPassword",
  value,
});

/**
 *
 * Task Creation Form Action Controls
 */
export const TCF_TITLE = (value) => ({
  type: "setTitle",
  value,
});
export const TCF_DESC = (value) => ({
  type: "setDescription",
  value,
});
export const TCF_PRIORITY = (value) => ({
  type: "setPriority",
  value,
});
export const TCF_TEAM = (value) => ({
  type: "setTeam",
  value,
});
export const TCF_DEADLINE = (value) => ({
  type: "setDeadline",
  value,
});

/**
 *
 * Collapsed State
 */
export const TOGGLE_COLLAPSED = (value) => ({
  type: "toggle_collapsed",
  value,
});

/**
 * Socket and teams state
 */
export const SET_SOCKET = (value) => ({
  type: "setSocket",
  value,
});
export const SET_TEAMS = (value) => ({
  type: "setTeams",
  value,
});
