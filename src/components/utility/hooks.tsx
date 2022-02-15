import React from "react";
import {initialState as incidentInitialState} from "../page/Incident/hooks";
import {initialState as loginInitialState} from "../page/Login/hooks";
interface State {
    [key: string]: any;
}
export const initialState: State = {
    login: loginInitialState,
    incident: incidentInitialState
};

const Hooks = () => {
    const [state, setState] = React.useState(initialState);

    const handleState = (key: string, value: any) => {
        setState({
            ...state,
            [key]: value
        });
    };

    return {
        state,
        handleState
    };
};

export default Hooks;
