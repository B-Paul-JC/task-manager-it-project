import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staffId: "",
  teamId: "",
  password: "",
  confirmPassword: "",
  errors: {},
};

const applicationSlice = createSlice({
  name: "apply",
  initialState,
  reducers: {
    setStaffId: (state, action) => {
      state.staffId = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setTeamId: (state, action) => {
      state.teamId = action.payload;
    },
    setError: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const {
  setConfirmPassword,
  setError,
  setPassword,
  setStaffId,
  setTeamId,
} = applicationSlice.actions;

export default applicationSlice.reducer;
