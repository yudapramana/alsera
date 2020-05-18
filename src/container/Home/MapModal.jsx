import React, {Component} from 'react';
import {connect} from 'react-redux';
// import Map from '../../component/Map';
import MapNew from './MapNew';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Modal, Button, Form, Row, Col,  } from 'react-bootstrap';
import GlobalDispatch from '../../reducer/globalDispatch';
import Geocode from "react-geocode";
import ActionType from "../../reducer/globalActionType";
import './MapModal.css'
import Autocomplete from 'react-google-autocomplete';

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

  constructor( props ){
    super( props );
    this.state = {
      address: '',
      city: '',
      area: '',
      state: '',
      mapPosition: {
        lat: this.props.mapOptions.center.lat,
        lng: this.props.mapOptions.center.lng
      },
      markerPosition: {
        lat: this.props.mapOptions.center.lat,
        lng: this.props.mapOptions.center.lng
      }
    }
  }

  getCoordinate = (val) => {
    Geocode.setApiKey("AIzaSyBjH7P71pXC5ceqza_ysznun7AjFSeLYtM");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.enableDebug();

    const description = val.description;
    Geocode.fromAddress(description).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            this.props.mapOptions.center.lat = lat;
            this.props.mapOptions.center.lng = lng;
            this.props.setLocation(lat, lng);
        },
        error => {
            console.error(error);
        }
    );
  }

  onMarkerDragEnd = ( event ) => {
    let latValue = event.latLng.lat(),
     lngValue = event.latLng.lng(),
     addressArray = [];

    console.log(latValue, lngValue, addressArray);

    this.props.setLocation(latValue, lngValue)

    this.setState({
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
      markerPosition: {
       lat: latValue,
       lng: lngValue,
     }
    })

  }
  

  onPlaceSelected = ( place ) => {
    const address = place.formatted_address,
      addressArray =  place.address_components,
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
  
      console.log('onPlaceSelected', latValue, lngValue);
      this.props.setLocation(latValue, lngValue);

      this.setState({
         mapPosition: {
           lat: latValue,
           lng: lngValue,
         },
         markerPosition: {
          lat: latValue,
          lng: lngValue,
        }
       })

       console.log('MapPosition:', this.state.mapPosition);
       console.log('set state done');
       this.map.panTo(this.state.mapPosition);
  };

  getMapCenterPosition = ( latValue, lngValue ) => {
    this.props.setLocation(latValue, lngValue);
    this.setState({
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
      markerPosition: {
       lat: latValue,
       lng: lngValue,
     }
    })
  }

  handleMapMounted = (refMap) => {
    this.map = refMap.current;
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
            Set Your Address Location <small className="text-muted smaller">Coord: {this.props.mapOptions.center.lat}, {this.props.mapOptions.center.lng}</small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="headerBody">
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Col sm={10}>
                <Autocomplete
                  style={{
                    width: '100%',
                    height: '100%',
                    paddingLeft: '16px',
                    marginRight: '20px',
                  }}
                  onPlaceSelected={ this.onPlaceSelected }
                  componentRestrictions={{country: "id"}}
                />
              </Col>
              <Col sm={2}>
                <Button className="m-button" size="md" variant="secondary" onClick={() => this.props.getLocation()}>Find Me</Button>
              </Col>
            </Form.Group>
                
            </div>

            <div className="bodyBody">
                {/* <Map styles={modalMapStyles} /> */}
                <MapNew
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  onMarkerDragEnd={this.onMarkerDragEnd}
                  mapCenter={this.state.mapPosition}
                  zoom={this.props.mapOptions.zoom}
                  getPosition={(lat, lng) => this.getMapCenterPosition(lat, lng)}
                  handleMapMounted={(refMap) => this.handleMapMounted(refMap)}
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
          error: state.error,
          loading: state.loading,
          locationflag: state.locationflag,
          mapOptions: state.mapOptions,
          outlets: state.outlets,
          modalShow: state.modalShow
        }
    }
    
    const mapDispatchtoProps = (dispatch) => {
        return {
            getLocation: () => dispatch(GlobalDispatch.getLocation()),
            getOutlet: () => dispatch(GlobalDispatch.getOutlet()),
            setLocation: (val1, val2) => dispatch({type: ActionType.SET_LOCATION, value1: val1, value2: val2}),
            handleModal: (val) => dispatch({type: ActionType.TOGGLE_MODAL, value: val}),
            setMapCenter: (value) => dispatch({type: ActionType.SET_MAP_CENTER, center: value.center}),
            
        }
    }
    
    export default connect(mapStatetoProps, mapDispatchtoProps)(MapModal);