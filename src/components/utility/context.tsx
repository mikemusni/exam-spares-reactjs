import React from "react";
import Hooks, {initialState} from "./hooks";

export const AppContext = React.createContext(initialState);
const AppContextProvider = (props: any) => {
    const value = Hooks();
    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
export default AppContextProvider;
