import ItemsImage from "assets/images/ItemsImage.png";
import BackNavButton from "components/BackNavButton";
import { useNavigate } from "react-router-dom";
import classes from "./addResourceItem.module.scss";
import AddResourceItemForm from "./components/form";

const AddResourceItem = () => {
    const navigate = useNavigate();

    return (
        <div className={classes.container}>
            <div className={classes.leftCtr}>
                <div className={classes.backBtnCtr}>
                    <BackNavButton label="Back" onClick={() => navigate(-1)} />
                </div>
                <div className={classes.formCtr}>
                    <AddResourceItemForm/>
                </div>
            </div>
            <div className={classes.imageContainer}>
                <img src={ItemsImage} alt="" />
            </div>
        </div>
    )
}

export default AddResourceItem;