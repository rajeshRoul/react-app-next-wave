import SearchBar from "components/SearchBar";
import TabSwitch from "components/TabSwitch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ResourceAPI from "ServerConnect/ResourceAPI";
import ResourceCard from "./components/ResourceCard";
import classes from "./resources.module.scss";

const Resources = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const resources = useSelector(store => store?.resource?.resources || {});
    const [resourceList, setResourceList] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        ResourceAPI.fetchResources();
    }, [])

    useEffect(() => {
        if (searchText) {
            const search = searchText.toLowerCase();
            setResourceList(
                resources?.[activeTab?.value]?.filter((resource) => (
                    resource?.title?.toLowerCase()?.includes(search) ||
                    resource?.category?.toLowerCase()?.includes(searchText)
                )) || []
            )
        } else {
            setResourceList(resources?.[activeTab.value] || [])
        }
    }, [resources, activeTab, searchText])

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
                    onChange={setSearchText} />
                <div className={classes.resourcesCtr}>
                    {resourceList.map((resource) => (
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

export default Resources;