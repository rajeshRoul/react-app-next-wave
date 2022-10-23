import classes from "./resourceCard.module.scss";

const ResourceCard = ({ resourceData }) => {
    return (
        <div className={classes.container}>
            <div className={classes.headerCtr}>
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