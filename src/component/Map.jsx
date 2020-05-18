import React from "react";
import GoogleMapReact from "google-map-react";
import MapPoint from "./MapPoint";
import MapEmoji from "./MapEmoji";
import {connect} from 'react-redux';
import ActionType from "../reducer/globalActionType";

export class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      defaultProps: {
        center: this.props.center || {
          lat: this.props.lat || -6.1757359,
          lng: this.props.lng || 106.824877
        },
        zoom: this.props.zoom || 11,
        styles: this.props.styles || [],
        layerTypes: this.props.layerTypes || []
      }
    };
  }

  _onChange({ center, zoom }) {

    console.log(center);

    this.setState({
      center: center,
      zoom: zoom
    });

    this.props.setMapCenter(center)
  }

  render() {
    return (
      <GoogleMapReact
        onChange={this._onChange}
        bootstrapURLKeys={{
          key: this.props.mapOptions.apiKey
        }}
        defaultCenter={this.props.mapOptions.center}
        defaultZoom={this.props.mapOptions.zoom}
        layerTypes={this.props.mapOptions.layerTypes}
        options={{ styles: this.props.mapOptions.styles }}
      >
        <MapEmoji
          emoji="🎯"
          lat={this.props.mapOptions.center.lat}
          lng={this.props.mapOptions.center.lng}
          text="Map Center"
        />
        <MapEmoji emoji="🎱" lat={41.61} lng={-71.323} />
      </GoogleMapReact>
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
      setMapCenter: (value) => dispatch({type: ActionType.SET_MAP_CENTER, center: value.center}),
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Map);
