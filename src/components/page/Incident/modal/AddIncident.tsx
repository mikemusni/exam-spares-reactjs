import React, {useEffect, useState} from "react";
import {AppContext} from "../../../utility/context";
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, FormGroup} from "reactstrap";
import AlertError from "../../../helpers/AlertError";
import hooksUser, {initialState as initialStateUser} from "../../Login/hooks";
import hooks, {initialState} from "../hooks";

const AddIncident = () => {
    const {state, handleState} = React.useContext(AppContext);
    const {apiRequestList} = hooksUser();
    const {apiRequestAdd, handleFilter} = hooks();
    const [form, setForm] = useState(initialState.apiRequestAdd);

    useEffect(() => {
        if (state.incident.modal.addIncident.isOpen) {
            apiRequestList("1", initialStateUser.apiRequestList);
        }
    }, [state.incident.modal.addIncident.isOpen]);

    const handleKeyPress = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        apiRequestAdd(form).then((resp) => {
            const {status, system, response} = resp;
            if (status) {
                handleFilter(state.incident.apiResponseList.response.pagination.page, state.incident.apiRequestList, {
                    modal: {
                        ...initialState.modal,
                        removeIncident: {
                            ...initialState.modal.removeIncident,
                            isOpen: false
                        }
                    }
                });
                setForm(initialState.apiRequestAdd);
            } else {
                handleState("incident", {
                    ...state.incident,
                    apiResponseAdd: {
                        isError: !status,
                        system,
                        response
                    }
                });
            }
        });
    };

    const handleCancel = (value: boolean) => {
        setForm(initialState.apiRequestAdd);
        handleState("incident", {
            ...state.incident,
            apiResponseAdd: {
                ...initialState.apiResponseAdd
            },
            modal: {
                ...initialState.modal,
                addIncident: {
                    ...initialState.modal.addIncident,
                    isOpen: value
                }
            }
        });
    };

    return (
        <Modal isOpen={state.incident.modal.addIncident.isOpen}>
            <ModalHeader toggle={() => handleCancel(false)}>Add new incident</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label>Title</Label>
                    <Input type="text" name="title" value={form.title} onChange={(e) => handleKeyPress(e)} />
                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <Input placeholder="Write something (data should remain in modal if unmountOnClose is set to false)" rows={5} type="textarea" name="description" value={form.description} onChange={(e) => handleKeyPress(e)} />
                </FormGroup>
                <FormGroup>
                    <Label>Type</Label>
                    <Input id="type" name="type" type="select" value={form.type} onChange={(e) => handleKeyPress(e)}>
                        <option value="feature">Feature</option>
                        <option value="bug">Bug</option>
                        <option value="technical">Technical</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Assign To</Label>
                    <Input id="type" name="assignedTo" type="select" value={form.assignedTo} onChange={(e) => handleKeyPress(e)}>
                        <option value={""}>Please select</option>
                        {state.login.apiResponseList.response.collection.map((item: any, key: number) => {
                            return (
                                <option key={key} value={item._id}>
                                    {item.username}
                                </option>
                            );
                        })}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <AlertError module="incident" value="apiResponseAdd" />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button
                    type="button"
                    color="primary"
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    Submit
                </Button>{" "}
                <Button
                    type="button"
                    onClick={() => {
                        handleCancel(false);
                    }}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddIncident;
