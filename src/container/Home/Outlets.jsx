import React from 'react';
import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import './Outlets.css'


const Outlets = (props) => {
    return (
            <div className="col-lg-3 col-md-4 col-sm-6 cardContainer">
                <Card>
                    <Card.Body>
                        <Card.Title>{props.data.name}</Card.Title>
                        <Card.Subtitle className="mb-1 text-muted">{props.data.address_location.substring(0, 40)}</Card.Subtitle>
                        <Button variant="primary">Choose </Button>
                    </Card.Body>
                </Card>
            </div>
            
    );
};

export default Outlets;