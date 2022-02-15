import React, {useState} from "react";
import {AppContext} from "../../utility/context";
import {Form, FormGroup, Input, Label, Button} from "reactstrap";
import Hooks, {initialState} from "./hooks";
import * as auth from "../../utility/auth";
import "./style.scss";

const UserForm: React.FC = () => {
    const {state, handleState} = React.useContext(AppContext);
    const {apiRequest} = Hooks();
    const [form, setForm] = useState(initialState.apiRequest);

    const handleKeyPress = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        apiRequest(form).then((resp) => {
            const {status, system, response} = resp;
            handleState("login", {
                ...state.login,
                apiResponse: {
                    isError: !status,
                    system,
                    response
                }
            });
            if (status) {
                setTimeout(() => {
                    auth.localSet("auth", response);
                    window.location.href = "/";
                }, 1000);
            }
        });
    };

    return (
        <Form inline className="loginForm">
            <FormGroup floating>
                <Input id="username" name="username" placeholder="Username" type="text" onChange={(e) => handleKeyPress(e)} value={form.username} />
                <Label for="username" data-testid="username">
                    Username
                </Label>
            </FormGroup>
            <FormGroup floating>
                <Input id="password" name="password" placeholder="Password" type="password" onChange={(e) => handleKeyPress(e)} value={form.password} />
                <Label for="password" data-testid="password">
                    Password
                </Label>
            </FormGroup>
            <Button type="button" color="primary" block={true} onClick={() => handleSubmit()} data-testid="submit">
                Submit
            </Button>
        </Form>
    );
};

export default UserForm;
