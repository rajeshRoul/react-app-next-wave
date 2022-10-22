import classes from "./header.module.scss";
import NxtWaveLogo from "assets/icons/NxtWaveLogo.svg";
import UserIcon from "assets/icons/UserIcon.svg";

const Header = () => {
    return (
        <div className={classes.headerCtr}>
            <img src={NxtWaveLogo} alt="Next Wave" />
            <img src={UserIcon} alt="" className={classes.userIcon}/>
        </div>
    )
}

export default Header;