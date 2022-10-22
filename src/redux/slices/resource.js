import { createSlice } from "@reduxjs/toolkit";

export const resourceSlice = createSlice({
  name: "resource",
  initialState: {
    resources: []
  },
  reducers: {
    setResources: (state, action) => {
      state.resources = action.payload || [];
    },
  },
});

export const resourceActions = resourceSlice.actions;

export default resourceSlice.reducer;
