import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        data: {},
        allUsers: [],
    },
    reducers: {
        setUserData: (state, action) => {
            state.data = action.payload;
        },
        setUserLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        addUser: (state, action) => {
            state.allUsers = [
                ...(state?.allUsers || []),
                action.payload
            ]
        }
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
