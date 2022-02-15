import React from "react";
import {AppContext} from "../../../utility/context";
import {initialState} from "../hooks";
import {Table, Button} from "reactstrap";
import {useNavigate} from "react-router-dom";
import * as auth from "../../../utility/auth";

const DataTable: React.FC = () => {
    const {permission} = auth.localGet("auth");
    const {state, handleState} = React.useContext(AppContext);
    const navigate = useNavigate();

    const handleView = (item: any) => {
        navigate(`/incident/profile/${item._id}`, {replace: true});
    };
    const handleDelete = (item: any) => {
        handleState("incident", {
            ...state.incident,
            apiRequestRemove: item,
            modal: {
                ...initialState.modal,
                removeIncident: {
                    ...initialState.apiRequestRemove,
                    isOpen: true
                }
            }
        });
    };

    return (
        <>
            {state.incident.apiResponseList.system === "success" && (
                <Table hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Assigned</th>
                            <th>Date Created</th>
                            <th>Date Updated</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.incident.apiResponseList.response?.collection.map((item: any, index: number) => {
                            const {title, type, isResolved, dateCreated, dateUpdated, assignedUsername} = item;
                            return (
                                <tr key={index}>
                                    <td>{title}</td>
                                    <td>{type}</td>
                                    <td>{isResolved ? "Resolved" : "Unresolved"}</td>
                                    <td>{assignedUsername}</td>
                                    <td>{dateCreated}</td>
                                    <td>{dateUpdated}</td>
                                    <th>
                                        <Button type="button" color="info" onClick={() => handleView(item)}>
                                            View
                                        </Button>{" "}
                                        {permission === "admin" && (
                                            <Button type="button" color="danger" onClick={() => handleDelete(item)}>
                                                Delete
                                            </Button>
                                        )}
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default DataTable;
