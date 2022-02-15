import React from "react";
import AppContextProvider from "./components/utility/context";
import Navigation from "./components/helpers/Navigation";

const Provider: React.FC = () => {
    return (
        <AppContextProvider>
            <Navigation />
        </AppContextProvider>
    );
};

export default Provider;
