import React from "react";

export const MapPoint = ({ text }) => (
  <div>
    <img
      src="https://kliknklin.co//assets/images//markermaps.png"
      className="rounded rounded-circle"
      alt={text}
      title={text}
    />
  </div>
);

export default MapPoint;
