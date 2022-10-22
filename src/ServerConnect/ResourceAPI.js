import fetchData from "./utils/fetchData";
import fetchMethods from "./utils/fetchMethods";

const ResourceAPI = {
    getAllResources: async () => {
        const res = await fetchData({
            url: "https://media-content.ccbp.in/website/react-assignment/resources.json",
            method: fetchMethods.GET
        })
        console.log({ res })
    }
}

export default ResourceAPI;