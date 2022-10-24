import BackNavButton from "components/BackNavButton";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResourceAPI from "ServerConnect/ResourceAPI";
import ResourceInfoSection from "./components/ResourceInfoSection";
import ResourceItemsTable from "./components/ResourceItemsTable";
import classes from "./resourceDetails.module.scss";

const ResourceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [resourceData, setResourceData] = useState({});
    const [resourceItems, setResourceItems] = useState([]);

    const fetchResourceData = async () => {
        const res = await ResourceAPI.getResourceById(id);
        if (res) {
            const { resource_items, ...rest } = res;
            setResourceData(rest);
            setResourceItems(resource_items)
        }
    }

    useEffect(() => {
        if (id) {
            fetchResourceData();
        }
    }, [id])

    return (
        <div className={classes.container}>
            <BackNavButton label="Resources" onClick={() => navigate("/resources")} />
            <ResourceInfoSection resourceData={resourceData}/>
            <ResourceItemsTable resourceItems={resourceItems}/>
        </div>
    )
}

export default ResourceDetails;