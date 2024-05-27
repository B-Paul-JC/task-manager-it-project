export const reducer = (state, action) => {
  switch (action.type) {
    case "setTitle":
      return { ...state, title: action.value };
    case "setDescription":
      return { ...state, description: action.value };
    case "setPriority":
      return { ...state, priority: action.value };
    case "setTeam":
      return { ...state, team: action.value };
    case "setDeadline":
      return { ...state, deadline: action.value };
    default:
      throw new Error();
  }
};

export const tasksAlertReducer = (state, action) => {
  switch (action.type) {
    case "setTeams":
      return { ...state, teams: action.value };
    case "setTeamId":
      return { ...state, teamId: action.value };
    case "setTaskType":
      return { ...state, taskType: action.value };
    case "active":
      return { ...state, activeCount: action.value };
    case "pending":
      return { ...state, pendingCount: action.value };
    case "completed":
      return { ...state, completedCount: action.value };
  }
};

export const registerReducer = (state, action) => {
  switch (action.type) {
    case "setStaffId":
      return { ...state, staffId: action.value };
    case "setPassword":
      return { ...state, password: action.value };
    case "setConfirmPassword":
      return { ...state, confirmPassword: action.value };
    case "setTeam":
      return { ...state, team: action.value };
    case "setError":
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value },
      };
    case "setTeams":
      return { ...state, teams: action.value };
    default:
      throw new Error();
  }
};
