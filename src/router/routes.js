import AddResourceItem from "pages/AddResourceItem";
import React from "react";
const Resources = React.lazy(() => import("pages/Resources"));
const ResourceDetails = React.lazy(() => import("pages/ResourceDetails"));

const routes = [
    {
        path: "/resources",
        component: Resources,
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
