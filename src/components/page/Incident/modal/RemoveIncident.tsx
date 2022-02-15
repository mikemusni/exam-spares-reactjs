import React from "react";
import {AppContext} from "../../../utility/context";
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col} from "reactstrap";
import AlertError from "../../../helpers/AlertError";
import hooks, {initialState} from "../hooks";

const RemoveIncident = () => {
    const {state, handleState} = React.useContext(AppContext);
    const {apiRequestRemove, handleFilter} = hooks();

    const handleSubmit = () => {
        apiRequestRemove(state.incident.apiRequestRemove).then((resp) => {
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
            } else {
                handleState("incident", {
                    ...state.incident,
                    apiResponseRemove: {
                        isError: !status,
                        system,
                        response
                    }
                });
            }
        });
    };

    const handleCancel = (value: boolean) => {
        handleState("incident", {
            ...state.incident,
            apiRequestRemove: {
                ...initialState.apiRequestRemove
            },
            modal: {
                ...initialState.modal,
                removeIncident: {
                    ...initialState.modal.removeIncident,
                    isOpen: value
                }
            }
        });
    };

    return (
        <Modal isOpen={state.incident.modal.removeIncident.isOpen}>
            <ModalHeader toggle={() => handleCancel(false)}>Delete incident</ModalHeader>
            <ModalBody>
                <Row>
                    <Col>Are you sure you want to delete?</Col>
                </Row>
                <Row>
                    <Col>{state.incident.apiRequestRemove.title}</Col>
                </Row>
                <Row>
                    <AlertError module="incident" value="apiRequestRemove" />
                </Row>
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

export default RemoveIncident;
