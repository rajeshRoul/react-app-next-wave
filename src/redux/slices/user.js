import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isloggedIn: false,
        data: {}
    },
    reducers: {
        setUserData: (state, action) => {
            state.data = action.payload;
        },
        setUserLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
