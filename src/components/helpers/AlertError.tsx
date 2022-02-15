import React from "react";
import {AppContext} from "../utility/context";
import {Alert} from "reactstrap";

interface IAlert {
    module: string;
    value: string;
}

const AlertError: React.FC<IAlert> = ({module, value}) => {
    const {state} = React.useContext(AppContext);
    return (
        <>
            {state[module][value].isError &&
                state[module][value].response &&
                state[module][value].response.map((item: any, index: number) => {
                    return (
                        <Alert color="warning" key={index} data-testid="alert">
                            {item.msg}
                        </Alert>
                    );
                })}
            {state[module][value].isError && !state[module][value].response && <Alert color="danger">{state[module][value].system}</Alert>}
            {state[module][value].system === "success" && <Alert>{state[module][value].system}</Alert>}
        </>
    );
};

export default AlertError;
