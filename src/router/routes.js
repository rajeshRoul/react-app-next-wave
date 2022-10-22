import React from "react";
const HomePage = React.lazy(() => import("pages/HomePage"));

const routes = [
    {
        path: "/home",
        component: HomePage,
    }
];

export default routes;
