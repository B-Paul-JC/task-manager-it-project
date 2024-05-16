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
