import React from 'react';
import { Jumbotron, Button, Container } from 'react-bootstrap';

const JumbotronHeader = (props) => {
    return (
        <Jumbotron fluid>
            <Container>
                {/* <h6 className="text-muted">Coord: {props.paramLat}, {props.paramLng}</h6> */}
                <h2>AlSeRa</h2>
                <p>
                    An all service Applications. For now its served only laundry. Hence, it will improve and have a global development on another services industry.
                    We provide many outlets around you, so you can order our laundry services.
                </p>
                    <Button onClick={props.showModal}>Find Outlet</Button>
            </Container>
        </Jumbotron>
    )
}

export default JumbotronHeader;