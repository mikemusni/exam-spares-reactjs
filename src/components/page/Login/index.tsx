import React from "react";
import {Container, Row, Col} from "reactstrap";
import UserForm from "./UserForm";
import AlertError from "../../helpers/AlertError";
import {AppContext} from "../../utility/context";

const Login: React.FC = () => {
    const {state} = React.useContext(AppContext);
    console.log("state", state);
    return (
        <Container>
            <Row>
                <Col
                    md={{
                        offset: 3,
                        size: 6
                    }}
                    sm="12"
                >
                    <UserForm />
                    <br />
                    <AlertError module="login" value="apiResponse" />
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
