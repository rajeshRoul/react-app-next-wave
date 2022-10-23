import SearchBar from "components/SearchBar";
import TabSwitch from "components/TabSwitch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ResourceAPI from "ServerConnect/ResourceAPI";
import ResourceCard from "./components/Resource";
import classes from "./homePage.module.scss";

const HomePage = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const resources = useSelector(store => store?.resource?.resources || {});

    useEffect(() => {
        ResourceAPI.fetchResources();
    }, [])

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
                    placeholder="Search" />
                <div className={classes.resourcesCtr}>
                    {resources?.[activeTab.value]?.map((resource) => (
                        <ResourceCard key={resource?.id} resourceData={resource} />
                    ))}
                </div>
            </div>
        </div>
    )
}

const tabs = [
    {
        label: "Resources",
        value: "all"
    },
    {
        label: "Requests",
        value: "requests"
    },
    {
        label: "Users",
        value: "users"
    }
]

export default HomePage;