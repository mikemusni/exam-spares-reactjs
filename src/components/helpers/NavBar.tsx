import React from "react";
import {Outlet, Link} from "react-router-dom";
import {Navbar, NavbarText, Button} from "reactstrap";
import {Container, Row, Col} from "reactstrap";
import Hooks from "../page/Login/hooks";
import "./style.scss";

const NavBar: React.FC = () => {
    const {apiRequestLogout} = Hooks();
    const handleLogout = () => {
        apiRequestLogout();
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Navbar color="dark" expand="md" dark>
                        <Link to="/">Home</Link>
                        <Link to="/incident/list/1">Incident</Link>
                        <NavbarText>
                            <Button color="primary" onClick={() => handleLogout()}>
                                Logout
                            </Button>
                        </NavbarText>
                    </Navbar>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
};

export default NavBar;
