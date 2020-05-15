import React, {Component} from 'react';
import {connect} from 'react-redux';
import Map from '../../component/Map';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Modal, Button, Form, Row, Col,  } from 'react-bootstrap';
import GlobalDispatch from '../../reducer/globalDispatch';
import Geocode from "react-geocode";
import ActionType from "../../reducer/globalActionType";

const googleMapsApiKey = "AIzaSyBjH7P71pXC5ceqza_ysznun7AjFSeLYtM";

const modalMapStyles = [
    {
      featureType: "landscape.natural",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on"
        },
        {
          color: "#e0efef"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on"
        },
        {
          hue: "#1900ff"
        },
        {
          color: "#c0e8e8"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          lightness: 100
        },
        {
          visibility: "simplified"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on"
        },
        {
          lightness: 700
        }
      ]
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#7dcdcd"
        }
      ]
    }
  ];

class MapModal extends Component {

  getCoordinate = (val) => {
    Geocode.setApiKey("AIzaSyBjH7P71pXC5ceqza_ysznun7AjFSeLYtM");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.enableDebug();

    const description = val.description;
    Geocode.fromAddress(description).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            this.props.coords.latitude = lat;
            this.props.coords.longitude = lng;
            this.props.findLocation(lat, lng);
        },
        error => {
            console.error(error);
        }
    );
  }

  render(){
    return (
      <Modal
          show={this.props.modalShow}
          onHide={() => this.props.handleModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Set Your Address Location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="headerBody">
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Col sm={10}>
                <GooglePlacesAutocomplete
                  onSelect={this.getCoordinate}
                />
              </Col>
              <Col sm={2}>
                <Button className="m-button" size="md" variant="secondary" onClick={() => this.props.getLocation()}>Find Me</Button>
              </Col>
            </Form.Group>
                
            </div>

            <div className="bodyBody">
                <Map
                apiKey={googleMapsApiKey}
                center={[this.props.coords.latitude, this.props.coords.longitude]}
                styles={modalMapStyles}
                zoom={13}
                />
            </div>
            
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.handleModal(false)}>Close</Button>
          {/* <Button variant="primary" onClick={props.onHide}>Get Outlets Nearbies</Button> */}
          <Button className="p-button" variant="primary" onClick={this.props.getOutlet}>Get Outlet</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

    const mapStatetoProps = (state) => {
        return {
            loading: state.loading,
            coords: {
                latitude: state.coordinate.latitude,
                longitude: state.coordinate.longitude,
            },
            error: state.error,
            locationflag: state.locationflag,
            outlets: state.outlets,
            modalShow: state.modalShow
        }
    }
    
    const mapDispatchtoProps = (dispatch) => {
        return {
            getLocation: () => dispatch(GlobalDispatch.getLocation()),
            getOutlet: () => dispatch(GlobalDispatch.getOutlet()),
            findLocation: (val1, val2) => dispatch({type: ActionType.FIND_LOCATION, value1: val1, value2: val2}),
            handleModal: (val) => dispatch({type: ActionType.TOGGLE_MODAL, value: val}),
            
        }
    }
    
    export default connect(mapStatetoProps, mapDispatchtoProps)(MapModal);