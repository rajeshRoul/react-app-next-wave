import classes from "./header.module.scss";
import NxtWaveLogo from "assets/icons/NxtWaveLogo.svg";
import UserIcon from "assets/icons/UserIcon.svg";
import { useSelector } from "react-redux";
import DropdownButton from "components/DropdownButton";
import AuthenticationAPI from "ServerConnect/AuthenticationAPI";

const Header = () => {
    const isLoggedIn = useSelector((store) => store?.user?.isLoggedIn);
    const userData = useSelector((store) => store?.user?.data);

    const logoutUser = () => {
        AuthenticationAPI.logoutUser();
    }

    return (
        <div className={classes.headerCtr}>
            <img src={NxtWaveLogo} alt="Next Wave" />
            {isLoggedIn &&
                <DropdownButton
                    onChange={logoutUser}
                    menuItems={userActions}>
                    <img
                        src={userData?.image || UserIcon}
                        alt=""
                        className={classes.userIcon}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = UserIcon;
                        }} />
                </DropdownButton>
            }
        </div>
    )
}

const userActions = [
    {
        label: "Log Out",
        value: "logOut"
    }
]

export default Header;