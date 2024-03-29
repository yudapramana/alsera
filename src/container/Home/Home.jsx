import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Container } from 'react-bootstrap';
import GlobalDispatch from '../../reducer/globalDispatch';
import logo from "../../logo.svg";
import './Home.css';
import Outlet from '../Home/Outlets';
import MapModal from './MapModal';
import ActionType from "../../reducer/globalActionType";
import JumbotronHeader from './Jumbotron';


import 'react-google-places-autocomplete/dist/index.min.css';


class Home extends Component {
        
    render() {
        return (
            <React.Fragment>
                <JumbotronHeader 
                  showModal={() => this.props.handleModal(true)}
                  paramLat={this.props.mapOptions.center.lat}
                  paramLng={this.props.mapOptions.center.lng}
                />

                <div className="locationWrapper">
                  <Container>
                    <h2>Nearby Outlets</h2>
                    <h5 className="text-muted">Explore nearby outlets around you</h5>
                    {/* <h6 className="text-muted">Coord: {this.props.mapOptions.center.lat}, {this.props.mapOptions.center.lng}</h6> */}
                    <div className="row">
                      {
                          (this.props.locationflag && this.props.outlets.length != 0 )
                          ?
                          this.props.outlets.map(outlet => {
                              return (
                                <Outlet key={outlet.id} data={outlet} /> 
                              )
                          })
                          : 
                          <h2>No Outlet Found!</h2>
                      }
                    </div>
                      
                    </Container>
                </div>
                {this.props.loading && <img src={logo} className="App-logo" alt="app-logo"/>}
                {this.props.error && <p>Please enable location on site setting!</p>}
                <MapModal
                    getOutlet={this.props.getOutlet}
                />
                
            </React.Fragment>
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
        setLocation: (val1, val2) => dispatch({type: ActionType.SET_LOCATION, value1: val1, value2: val2}),
        handleModal: (val) => dispatch({type: ActionType.TOGGLE_MODAL, value: val}),
        
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Home);