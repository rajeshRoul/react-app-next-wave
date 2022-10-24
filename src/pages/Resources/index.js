import Pagination from "components/Pagination";
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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    useEffect(() => {
        ResourceAPI.fetchResources();
    }, [])

    useEffect(() => {
        let newList = resources?.[activeTab.value] || [];
        if (searchText) {
            const search = searchText.toLowerCase();
            newList = resources?.[activeTab?.value]?.filter((resource) => (
                resource?.title?.toLowerCase()?.includes(search) ||
                resource?.category?.toLowerCase()?.includes(searchText)
            )) || []
        }
        setTotalPages(Math.ceil((newList?.length || 1) / 6));
        const sliceIndex = ((currentPage - 1) * 6)
        setResourceList(newList.slice(sliceIndex, sliceIndex + 6))
    }, [resources, activeTab, searchText, currentPage])

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
                <div className={classes.paginationCtr}>
                    <Pagination
                        currentPage={currentPage}
                        onChange={setCurrentPage}
                        totalPages={totalPages} />
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