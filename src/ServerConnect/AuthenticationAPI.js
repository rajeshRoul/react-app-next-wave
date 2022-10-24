import fetchData from "./utils/fetchData";
import fetchMethods from "./utils/fetchMethods";
import { userActions } from "redux/slices/user";
import store from "redux/store";
import { toast } from "react-toastify";

const { dispatch } = store;

const AuthenticationAPI = {
    signupUser: (payload) => {
        const allUsers = store?.getState()?.user?.allUsers || [];
        if (allUsers.find((user) => user.email === payload.email)) {
            toast.error("User with this email already exist");
            return false;
        }
        dispatch(userActions.addUser(payload));
        toast.success("User Created Successfully");
        return true;
    },
    loginUser: (payload) => {
        const allUsers = store?.getState()?.user?.allUsers || [];
        const user = allUsers.find((user) => user.email === payload.email);
        if (user && user.password === payload.password) {
            dispatch(userActions.setUserData(user));
            dispatch(userActions.setUserLoggedIn(true));
            toast.success("Login Successfull");
            return true;
        }
        toast.error("Incorrect Email or Password");
        return false;
    },
    logoutUser: () => {
        dispatch(userActions.setUserData({}));
        dispatch(userActions.setUserLoggedIn(false));
    }
}

export default AuthenticationAPI;