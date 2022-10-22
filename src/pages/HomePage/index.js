import TabSwitch from "components/TabSwitch";
import { useState } from "react";
import classes from "./homePage.module.scss";

const HomePage = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return <div className={classes.container}>
        <div className={classes.tabSwitchCtr}>
            <TabSwitch
                tabs={tabs}
                activeTab={activeTab}
                onChange={setActiveTab} />
        </div>
    </div>
}

const tabs = [
    {
        label: "Resources",
        value: "Resources"
    },
    {
        label: "Requests",
        value: "Requests"
    },
    {
        label: "Users",
        value: "Users"
    }
]

export default HomePage;