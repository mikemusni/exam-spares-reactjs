import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {AppContext} from "../../utility/context";
import hooks from "./hooks";
import {Container, Row, Col} from "reactstrap";

const Profile: React.FC = () => {
    const {_id} = useParams();
    const {state} = React.useContext(AppContext);
    const {apiRequestProfile} = hooks();

    const {title, description, dateCreated, type, dateUpdated, isResolved, isViewed, assignedUsername} = state.incident?.apiResponseProfile?.response || {};
    useEffect(() => {
        apiRequestProfile(_id);
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>{title}</h1>
                    <h5>{description}</h5>
                </Col>
            </Row>
            <Row>
                <Col>Type: {type}</Col>
            </Row>
            <Row>
                <Col>Status: {isResolved ? "Resolved" : "Unresolved"}</Col>
            </Row>
            <Row>
                <Col>Acknowledge: {isViewed ? "Yes" : "No"}</Col>
            </Row>
            <Row>
                <Col>Assigned: {assignedUsername}</Col>
            </Row>
            <Row>
                <Col>Date Created: {dateCreated}</Col>
            </Row>
            <Row>
                <Col>Date Updated: {dateUpdated}</Col>
            </Row>
        </Container>
    );
};

export default Profile;
