import fetchMethods from "./fetchMethods";

const fetchData = ({ url = "", method = fetchMethods.GET, body = "" }) => {

    let options = {
        method,
    }

    if (method !== fetchMethods.GET && body) {
        options.body = JSON.stringify(body);
    }

    return fetch(url, options).then(response => response.json())
}

export default fetchData;