import AddResourceItem from "pages/AddResourceItem";
import React from "react";
const HomePage = React.lazy(() => import("pages/HomePage"));
const ResourceDetails = React.lazy(() => import("pages/ResourceDetails"));

const routes = [
    {
        path: "/resources",
        component: HomePage,
    },
    {
        path: "/resources/view/:id",
        component: ResourceDetails,
    },
    {
        path: "/resources/view/:id/add-item",
        component: AddResourceItem,
    },
];

export default routes;
