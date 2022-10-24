import fetchData from "./utils/fetchData";
import fetchMethods from "./utils/fetchMethods";
import { resourceActions } from "redux/slices/resource";
import store from "redux/store";
import { toast } from "react-toastify";

const { dispatch } = store;

const ResourceAPI = {
    fetchResources: async () => {
        const res = await fetchData({
            url: "https://media-content.ccbp.in/website/react-assignment/resources.json",
            method: fetchMethods.GET
        })
        if (res) {
            if (res?.length) {
                dispatch(resourceActions.setAllResources(res));
                dispatch(resourceActions.setRequestsResources(res.filter((resource) => resource?.tag === "request")))
                dispatch(resourceActions.setUsersResources(res.filter((resource) => resource?.tag === "user")))

            }
        } else {
            toast.error("Failed To Load Data");
        }
    },
    getResourceById: async (id) => {
        const res = await fetchData({
            url: `https://media-content.ccbp.in/website/react-assignment/resource/${id}.json`,
            method: fetchMethods.GET
        })
        if (res) {
            return res;
        } else {
            toast.error("Failed to load Data");
        }
    },
    createResourceItem: async (payload) => {
        const res = await fetchData({
            url: `https://media-content.ccbp.in/website/react-assignment/add_resource.json`,
            method: fetchMethods.GET,
            body: payload
        })
        if (res) {
            toast.success("Resource Item Created Successfully");
            return res;
        } else {
            toast.error("Failed to Create Resource Item");
        }
    }
}

export default ResourceAPI;