import SearchBar from "components/SearchBar";
import TabSwitch from "components/TabSwitch";
import { useState } from "react";
import ResourceCard from "./components/Resource";
import classes from "./homePage.module.scss";

const HomePage = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div className={classes.container}>
            <div className={classes.innerContainer}>
                <div className={classes.tabSwitchCtr}>
                    <TabSwitch
                        tabs={tabs}
                        activeTab={activeTab}
                        onChange={setActiveTab} />
                </div>
                <SearchBar
                    className={classes.searchBar}
                    placeholder="Search"
                    onChange={() => console.count("render")} />
                <div className={classes.resourcesCtr}>
                    <ResourceCard />
                    <ResourceCard />
                    <ResourceCard />
                </div>
            </div>
        </div>
    )
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