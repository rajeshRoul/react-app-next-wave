import AuthenticationHoc from "hoc/Authentication";
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";
const NotFound = React.lazy(() => import("pages/NotFound"));
const SignUp = React.lazy(() => import("pages/Authentication/SignUp"));
const Login = React.lazy(() => import("pages/Authentication/Login"));

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    key="Route-userOnboard"
                    path="/signup"
                    element={<Suspense fallback={<h1>Loading...</h1>}><SignUp /></Suspense>}
                />
                <Route
                    key="Route-user-login"
                    path="/login"
                    element={<Suspense fallback={<h1>Loading...</h1>}><Login /></Suspense>}
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
