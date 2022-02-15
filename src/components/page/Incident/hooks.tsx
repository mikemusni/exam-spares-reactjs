import React from "react";
import axios, {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../../utility/context";
import * as auth from "../../utility/auth";

export const initialState = {
    apiRequestList: {
        search: "",
        type: "feature",
        sort: "dateCreated",
        orderBy: "descending"
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
    },
    apiRequestAdd: {
        title: "",
        description: "",
        type: "feature",
        assignedTo: ""
    },
    apiResponseAdd: {
        isError: false,
        system: ""
    },
    apiRequestRemove: {
        _id: ""
    },
    apiResponseRemove: {
        isError: false,
        system: ""
    },
    modal: {
        addIncident: {
            isOpen: false
        },
        removeIncident: {
            isOpen: false
        }
    }
};

const CustomHook = () => {
    const {state, handleState} = React.useContext(AppContext);
    const navigate = useNavigate();
    const apiRequestList = async (page: string, data: any) => {
        const authUser = auth.localGet("auth");
        return await axios({
            method: "post",
            headers: {Authorization: `Bearer ${authUser.token}`},
            url: `${process.env.API_HOST}/incident/page/${page}`,
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

    const apiRequestProfile = async (_id: string) => {
        const authUser = auth.localGet("auth");
        return await axios({
            method: "get",
            headers: {Authorization: `Bearer ${authUser.token}`},
            url: `${process.env.API_HOST}/incident/profile/${_id}`
        }).then((resp: AxiosResponse<any, any>) => {
            const {status, system, response} = resp.data;
            if (system === "invalid.session") {
                auth.eject();
                return false;
            }
            handleState("incident", {
                ...state.incident,
                apiResponseProfile: {
                    isError: !status,
                    system,
                    response
                }
            });
        });
    };

    const apiRequestAdd = async (data: any) => {
        const authUser = auth.localGet("auth");
        return await axios({
            method: "post",
            headers: {Authorization: `Bearer ${authUser.token}`},
            url: `${process.env.API_HOST}/incident/update`,
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

    const apiRequestRemove = async (data: any) => {
        const authUser = auth.localGet("auth");
        return await axios({
            method: "delete",
            headers: {Authorization: `Bearer ${authUser.token}`},
            url: `${process.env.API_HOST}/incident/remove`,
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

    const handleFilter = (page = "1", data = state.incident.apiRequestList, moreObject = {}) => {
        apiRequestList(page, data).then((resp) => {
            const {status, system, response} = resp;
            handleState("incident", {
                ...state.incident,
                apiRequestList: data,
                apiResponseList: {
                    isError: !status,
                    system,
                    response
                },
                ...moreObject
            });
        });
        navigate(`/incident/list/${page}`, {replace: true});
    };

    return {
        apiRequestList,
        apiRequestProfile,
        apiRequestAdd,
        apiRequestRemove,
        handleFilter
    };
};

export default CustomHook;
