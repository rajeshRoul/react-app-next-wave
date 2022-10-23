import { createSlice } from "@reduxjs/toolkit";

export const resourceSlice = createSlice({
  name: "resource",
  initialState: {
    resources: {
      all: [],
      requests: [],
      users: []
    }
  },
  reducers: {
    setAllResources: (state, action) => {
      state.resources.all = action.payload || [];
    },
    setRequestsResources: (state, action) => {
      state.resources.requests = action.payload || [];
    },
    setUsersResources: (state, action) => {
      state.resources.users = action.payload || [];
    },
  },
});

export const resourceActions = resourceSlice.actions;

export default resourceSlice.reducer;
