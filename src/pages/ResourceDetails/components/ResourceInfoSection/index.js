import Button from "components/Button";
import classes from "./resourceInfoSection.module.scss";

const ResourceInfoSection = ({ resourceData }) => {
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <img src={resourceData?.icon_url} alt="" />
                <div className={classes.dataCtr}>
                    <div className={classes.title}>
                        {resourceData?.title ?? ""}
                    </div>
                    <div className={classes.category}>
                        {resourceData?.id ?? ""}
                    </div>
                </div>
            </div>
            <a
                href={resourceData?.link}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}>
                {resourceData?.link ?? ""}
            </a>
            <div className={classes.description}>
                {resourceData?.description ?? ""}
            </div>
            <div className={classes.btnCtr}>
                <Button >Update</Button>
            </div>
        </div>
    )
}

export default ResourceInfoSection;