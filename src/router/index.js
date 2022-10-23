import AuthenticationHoc from "hoc/Authentication";
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";
const NotFound = React.lazy(() => import("pages/NotFound"));
const Authentication = React.lazy(() => import("pages/Authentication"));

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    key="Route-userOnboard"
                    path="/user-onboard"
                    element={<Suspense fallback={<h1>Loading...</h1>}><Authentication /></Suspense>}
                />
                <Route
                    key="Route-base-home"
                    exact
                    path="/"
                    element={<Navigate to="/resources" replace />}
                />
                {routes.map((route, index) => (
                    <Route
                        key={`Route-${route.path}-${index}`}
                        path={route.path}
                        element={
                            <Suspense fallback={<h1>Loading...</h1>}>
                                <AuthenticationHoc>
                                    <route.component />
                                </AuthenticationHoc>
                            </Suspense>
                        }
                    />
                ))}
                <Route path="*" element={<Suspense fallback={<h1>Loading...</h1>}><NotFound /></Suspense>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
