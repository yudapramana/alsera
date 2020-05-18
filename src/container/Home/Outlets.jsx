import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './Outlets.css'


const Outlets = (props) => {
    return (
            <div className="col-lg-3 col-md-4 col-sm-6 cardContainer d-flex align-items-stretch">
                <Card>
                    <Card.Body>
                        <Card.Subtitle>{props.data.name}</Card.Subtitle>
                        <Card.Subtitle className="mb-1 text-muted">{props.data.address_location.substring(0, 40)}</Card.Subtitle>
                        <Button className="b-button" variant="primary">Choose </Button>
                    </Card.Body>
                </Card>
            </div>
            
    );
};

export default Outlets;