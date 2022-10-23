import { useNavigate } from "react-router-dom";
import classes from "./resourceCard.module.scss";

const ResourceCard = ({ resourceData }) => {
    const navigate = useNavigate();

    return (
        <div className={classes.container}>
            <div
                className={classes.headerCtr}
                onClick={() => navigate(`/resources/view/${resourceData?.id}`)}>
                <img src={resourceData?.icon_url} alt="" />
                <div className={classes.headerInnerCtr}>
                    <div className={classes.titleText}>{resourceData?.title ?? ""}</div>
                    <div className={classes.typeText}>{resourceData?.category ?? ""}</div>
                </div>
            </div>
            <a href={resourceData?.link} className={classes.siteLink}>{resourceData?.link ?? ""}</a>
            <div className={classes.description}>
                {resourceData?.description ?? ""}
            </div>
        </div>
    )
}

export default ResourceCard;