import { configureStore } from "@reduxjs/toolkit";
import {
  creationReducer,
  tasksAlertReducer,
  registerReducer,
  collapseReducer,
  socketAndTeamReducer,
} from "./reducer";

const store = configureStore({
  reducer: {
    creation: creationReducer,
    tasksAlert: tasksAlertReducer,
    register: registerReducer,
    collapse: collapseReducer,
    socketAndTeam: socketAndTeamReducer,
  },
  preloadedState: window.__PERLOADED_STATE__,
});

export default store;
