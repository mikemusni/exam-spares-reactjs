import React, {useEffect} from "react";
import Hooks from "../page/Login/hooks";
import * as auth from "../utility/auth";

const AuthChecker = () => {
    const {apiRequestProfile} = Hooks();
    useEffect(() => {
        auth.authValidate(apiRequestProfile);
    }, []);

    return <>Verifying credentials...</>;
};

export default AuthChecker;
