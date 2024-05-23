const creationInitialState = {
  title: "",
  description: "",
  priority: "low",
  team: {
    id: "",
    name: "",
  },
  deadline: "",
};

const tasksAlertInitialState = {
  teamId: "",
  taskType: "",
  activeCount: 0,
  pendingCount: 0,
  completedCount: 0,
};

const registerInitialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  team: null,
  errors: {},
};

const socketAndTeamState = {
  socket: null,
  teams: [],
};

export const creationReducer = (state = creationInitialState, action) => {
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
      return state;
  }
};

export const tasksAlertReducer = (state = tasksAlertInitialState, action) => {
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
    default:
      return state;
  }
};

export const registerReducer = (state = registerInitialState, action) => {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.value };
    case "setEmail":
      return { ...state, email: action.value };
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
    default:
      return state;
  }
};

export const collapseReducer = (state = false, action) => {
  state = !action.value;
  return state;
};

export const socketAndTeamReducer = (state = socketAndTeamState, action) => {
  switch (action.type) {
    case "setSocket":
      return { ...state, socket: action.value };
    case "setTeams":
      return { ...state, teams: action.value };
    default:
      return state;
  }
};
