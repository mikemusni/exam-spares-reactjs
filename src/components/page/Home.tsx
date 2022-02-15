import React from "react";
import {Container, Row, Col} from "reactstrap";
import * as auth from "../utility/auth";

const Home: React.FC = () => {
    const {username, permission, token} = auth.localGet("auth");
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Hello Spares CNX!</h1>
                </Col>
            </Row>
            <Row>
                <Col>User: {username}</Col>
            </Row>
            <Row>
                <Col>Permission: {permission}</Col>
            </Row>
            <Row>
                <Col>Token: {token}</Col>
            </Row>
        </Container>
    );
};

export default Home;
