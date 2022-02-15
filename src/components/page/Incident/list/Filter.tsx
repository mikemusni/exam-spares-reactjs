import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {AppContext} from "../../../utility/context";
import hooks, {initialState} from "../hooks";
import {Row, Col, Input, FormGroup, Label, Button} from "reactstrap";
import * as auth from "../../../utility/auth";
import "./style.scss";

const Filter: React.FC = () => {
    const {permission} = auth.localGet("auth");
    const {state, handleState} = React.useContext(AppContext);
    const {handleFilter} = hooks();
    const {page} = useParams();
    const [form, setForm] = useState(JSON.parse(JSON.stringify(initialState.apiRequestList)));

    useEffect(() => {
        handleFilter(page);
    }, []);

    const handleKeyPress = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleAdd = () => {
        handleState("incident", {
            ...state.incident,
            modal: {
                ...state.incident.modal,
                addIncident: {
                    ...state.incident.apiRequestAdd,
                    isOpen: true
                }
            }
        });
    };

    return (
        <>
            <hr />
            <Row>
                <Col>
                    <Label for="search">Search</Label>
                    <Input id="search" name="search" value={form.search} onChange={(e) => handleKeyPress(e)} />
                </Col>
            </Row>
            <Row>
                <Col sm="4" xs="6">
                    <FormGroup>
                        <Label for="type">Type</Label>
                        <Input id="type" name="type" type="select" value={form.type} onChange={(e) => handleKeyPress(e)}>
                            <option value="">All</option>
                            <option value="feature">Feature</option>
                            <option value="bug">Bug</option>
                            <option value="technical">Technical</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col sm="4" xs="6">
                    <FormGroup>
                        <Label for="sort">Sort</Label>
                        <Input id="sort" name="sort" type="select" value={form.sort} onChange={(e) => handleKeyPress(e)}>
                            <option value={"dateCreated"}>Date Created</option>
                            <option value={"dateUpdated"}>Date Updated</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col sm="4">
                    <FormGroup>
                        <Label for="orderBy">Order by</Label>
                        <Input id="orderBy" name="orderBy" type="select" value={form.orderBy} onChange={(e) => handleKeyPress(e)}>
                            <option value={"ascending"}>Ascending</option>
                            <option value={"descending"}>Descending</option>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs="6">
                    <Button type="button" color="success" onClick={() => handleFilter("1", form)}>
                        Filter Incident
                    </Button>
                </Col>
                {permission === "admin" && (
                    <Col xs="6">
                        <Button className="addButton" type="button" color="primary" onClick={() => handleAdd()}>
                            Add New Incident
                        </Button>
                    </Col>
                )}
            </Row>
            <hr />
        </>
    );
};

export default Filter;
