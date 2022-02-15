import React from "react";
import axios, {AxiosResponse} from "axios";
import {AppContext} from "../../utility/context";
import * as auth from "../../utility/auth";

export const initialState = {
    apiRequest: {
        username: "",
        password: ""
    },
    apiResponse: {
        isError: false,
        system: "",
        response: []
    },
    apiRequestList: {
        username: ""
    },
    apiResponseList: {
        isError: false,
        system: "",
        response: {
            collection: [],
            pagination: {
                total: 0,
                totalPage: 0,
                page: 0,
                limit: 0
            }
        }
    }
};

const CustomHook = () => {
    const {state, handleState} = React.useContext(AppContext);
    const apiRequest = async (data: any) => {
        return await axios({
            method: "post",
            url: `${process.env.API_HOST}/user/login`,
            data: data
        }).then((resp: AxiosResponse<any, any>) => {
            const {system} = resp.data;
            if (system === "invalid.session") {
                auth.eject();
                return false;
            }
            return resp.data;
        });
    };

    const apiRequestList = async (page: string, data: any) => {
        const authUser = auth.localGet("auth");
        return await axios({
            method: "post",
            headers: {Authorization: `Bearer ${authUser.token}`},
            url: `${process.env.API_HOST}/user/page/${page}`,
            data: data
        }).then((resp: AxiosResponse<any, any>) => {
            const {status, system, response} = resp.data;
            if (system === "invalid.session") {
                auth.eject();
                return false;
            }
            handleState("login", {
                ...state.login,
                apiResponseList: {
                    isError: !status,
                    system,
                    response
                }
            });
        });
    };

    const apiRequestProfile = async () => {
        const authUser = auth.localGet("auth");
        return await axios({
            method: "get",
            headers: {Authorization: `Bearer ${authUser.token}`},
            url: `${process.env.API_HOST}/user/profile`
        }).then((resp: AxiosResponse<any, any>) => {
            const {system} = resp.data;
            if (system === "invalid.session") {
                auth.eject();
                return false;
            }
            return resp.data;
        });
    };

    const apiRequestLogout = async () => {
        const authUser = auth.localGet("auth");
        return await axios({
            method: "get",
            headers: {Authorization: `Bearer ${authUser.token}`},
            url: `${process.env.API_HOST}/user/logout`
        }).then((resp: AxiosResponse<any, any>) => {
            const {system} = resp.data;
            if (system === "invalid.session") {
                auth.eject();
                return false;
            }
            auth.eject();
        });
    };

    return {
        apiRequest,
        apiRequestList,
        apiRequestProfile,
        apiRequestLogout
    };
};

export default CustomHook;
