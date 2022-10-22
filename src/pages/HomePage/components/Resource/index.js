import classes from "./resourceCard.module.scss";
import UserIcon from "assets/icons/UserIcon.svg"

const ResourceCard = () => {
    return (
        <div className={classes.container}>
            <div className={classes.headerCtr}>
                <img src={UserIcon} alt="" />
                <div className={classes.headerInnerCtr}>
                    <div className={classes.titleText}>Dropbox, Inc.</div>
                    <div className={classes.typeText}>Dropbox, Inc.</div>
                </div>
            </div>
            <a href="" className={classes.siteLink}>www.dropbox.com</a>
            <div className={classes.description}>
            Slack brings the team together, wherever you are. With all of your communication and tools in one.... Slack brings the team together, wherever you are. With all of your communication and tools in one....
            </div>
        </div>
    )
}

export default ResourceCard;