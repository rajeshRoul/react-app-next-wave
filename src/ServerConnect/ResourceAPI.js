import fetchData from "./utils/fetchData";
import fetchMethods from "./utils/fetchMethods";
import { resourceActions } from "redux/slices/resource";
import store from "redux/store";
import { toast } from "react-toastify";

const { dispatch } = store;

const ResourceAPI = {
    fetchResources: async () => {
        const allResources = store?.getState()?.resource?.resources?.all || [];
        let toastId;
        // Loading toast for slow networks
        if (allResources?.length) {
            toastId = toast.loading("Refreshing Data");
        } else {
            toastId = toast.loading("Fetching Data");
        }
        const res = await fetchData({
            url: "https://media-content.ccbp.in/website/react-assignment/resources.json",
            method: fetchMethods.GET
        })
        if (res) {
            toast.update(toastId, {
                render: "Resources List Refreshed",
                type: "success",
                isLoading: false,
                autoClose: 5000
            })
            if (res?.length) {
                dispatch(resourceActions.setAllResources(res));
                dispatch(resourceActions.setRequestsResources(res.filter((resource) => resource?.tag === "request")))
                dispatch(resourceActions.setUsersResources(res.filter((resource) => resource?.tag === "user")))

            }
        } else {
            toast.update(toastId, {
                render: "Failed to Load Data",
                type: "error",
                isLoading: false,
                autoClose: 5000
            })
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
    }
}

export default ResourceAPI;