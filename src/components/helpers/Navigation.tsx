import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AuthChecker from "./AuthChecker";
import Error403 from "../error/403";
import Error404 from "../error/404";
import Login from "../page/Login";

const NavBar = React.lazy(() => {
    return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => import("./NavBar"));
});
const Home = React.lazy(() => {
    return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => import("../page/Home"));
});
const Incident = React.lazy(() => {
    return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => import("../page/Incident"));
});
const IncidentProfile = React.lazy(() => {
    return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => import("../page/Incident/Profile"));
});

const Navigation: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="login"
                    element={
                        <React.Suspense fallback={<>Loading...</>}>
                            <Login />
                        </React.Suspense>
                    }
                />
                <Route
                    path="/"
                    element={
                        <React.Suspense fallback={<AuthChecker />}>
                            <NavBar />
                        </React.Suspense>
                    }
                >
                    <Route
                        index
                        element={
                            <React.Suspense fallback={<>Loading...</>}>
                                <Home />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="incident/list/:page"
                        element={
                            <React.Suspense fallback={<>Loading...</>}>
                                <Incident />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="incident/profile/:_id"
                        element={
                            <React.Suspense fallback={<>Loading...</>}>
                                <IncidentProfile />
                            </React.Suspense>
                        }
                    />
                </Route>
                <Route
                    path="error/403"
                    element={
                        <React.Suspense fallback={<>Loading...</>}>
                            <Error403 />
                        </React.Suspense>
                    }
                />
                <Route
                    path="error/404"
                    element={
                        <React.Suspense fallback={<>Loading...</>}>
                            <Error404 />
                        </React.Suspense>
                    }
                />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Navigation;
