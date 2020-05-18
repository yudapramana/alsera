import React, { useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  withGoogleMap,
  Marker
} from "react-google-maps";

const MapNew = (props) =>  {
  const [center, setCenter] = useState(props.mapCenter);
  const refMap = useRef(null);

  const handleBoundsChanged = () => {
    const mapCenter = refMap.current.getCenter(); //get map center
    setCenter(mapCenter);
    const latPos = mapCenter.lat();
    const lngPos = mapCenter.lng();
    props.getPosition(latPos, lngPos);
    props.handleMapMounted(refMap);
  };


  return (
    <GoogleMap
      ref={refMap}
      defaultZoom={props.zoom}
      defaultCenter={center}
      onBoundsChanged={handleBoundsChanged}
    >
      <Marker position={center} />
    </GoogleMap>
  );
}

export default withGoogleMap(MapNew);



// import React, {Component} from 'react';
// import {
//     withGoogleMap,
//     GoogleMap,
//     Marker,
//   } from "react-google-maps";
  
//   const MapNew = withGoogleMap(props =>
//     <GoogleMap
//       defaultZoom={props.zoom}
//       defaultCenter={props.mapCenter}
//       onBoundsChanged={props.handleBoundsChanged}
//     >
//       <Marker
//         // draggable={true}
//         position={ props.mapCenter }
//         onDragEnd={ props.onMarkerDragEnd }
//       />
//     </GoogleMap>
//   );

//   export default MapNew;