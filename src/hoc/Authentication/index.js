import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthenticationHoc = ({ children }) => {
    const isLoggedIn = useSelector((store) => store?.user?.isLoggedIn);

    if (isLoggedIn) {
        return children;
    }
    return <Navigate to="/login" />
}

export default AuthenticationHoc;