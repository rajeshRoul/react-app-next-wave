import classes from "./backNavButton.module.scss";
import LeftArrowIcon from "assets/icons/LeftArrowIcon.svg";

const BackNavButton = ({ label = "Go Back", onClick }) => {
    return (
        <button className={classes.container} onClick={onClick}>
            <img src={LeftArrowIcon} alt="" />
            <div className={classes.label}>{label}</div>
        </button>
    )
}

export default BackNavButton;