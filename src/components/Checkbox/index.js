import classes from "./checkbox.module.scss";
import CheckIcon from "assets/icons/CheckIcon.svg";

const CheckBox = ({ checked, onClick = () => { } }) => {
    return (
        <div
            className={`${classes.container} ${checked ? classes.active : ""}`}
            onClick={onClick}>
            <img
                src={CheckIcon}
                alt="Checked" />
        </div>
    )
}

export default CheckBox