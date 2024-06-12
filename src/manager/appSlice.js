import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generalAppState } from "./appState";

const generalAppReducer = createSlice({
  name: "general",
  initialState: generalAppState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsCreateTaskModalOpen: (state, action) => {
      state.isCreateTaskModalOpen = action.payload;
    },
    setIsCreatingTask: (state, action) => {
      state.isCreatingTask = action.payload;
    },
    setTaskType: (state, action) => {
      state.taskType = action.payload;
    },
    setTeamId: (state, action) => {
      state.teamId = action.payload;
    },
    setStaffId: (state, action) => {
      state.staffId = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setShowModal: (state) => {
      console.log("Clicking");
      state.showModal = !state.showModal;
    },
    setRejectionReason: (state, action) => {
      state.rejectionReason = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(insertTeamsAsync.fulfilled, (state, action) => {
      state.teams = action.payload;
    });
    builder.addCase(insertTeamsAsync.rejected, () => {
      alert("Unable to get teams");
    });
    builder.addCase(insertUserTeamsAsync.fulfilled, (state, action) => {
      state.userTeams = action.payload;
    });
    builder.addCase(insertUserTeamsAsync.rejected, () => {
      alert("Unable to get teams");
    });
  },
});

export const insertTeamsAsync = createAsyncThunk(
  "general/insertTeamsAsync",
  async () => {
    const data = await fetch("http://localhost:3000/api/teams/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const { teams } = await data.json();
    console.log(teams);

    return teams;
  }
);

export const insertUserTeamsAsync = createAsyncThunk(
  "general/insertUserTeamsAsync",
  async (staffId) => {
    const body = JSON.stringify({ staffId });
    const data = await fetch("http://localhost:3000/api/teams/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
    const { teams } = await data.json();
    console.log(teams);

    return teams;
  }
);

export const {
  setIsAdmin,
  setToken,
  setIsCollapsed,
  setIsLoggedIn,
  setIsLoading,
  setIsCreateTaskModalOpen,
  setIsCreatingTask,
  setTaskType,
  setTeamId,
  setStaffId,
  setShowModal,
  setRejectionReason,
} = generalAppReducer.actions;
export default generalAppReducer.reducer;
