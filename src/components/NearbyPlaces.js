import React, { useState, useEffect } from "react";
import { searchNearby } from "../services/searchNearby";

const NearbyPlaces = (props) => {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [error, setError] = useState(props.error);

  useEffect(() => {
    if (props.location) {
      const data = searchNearby(props.location);
      data
        .then((result) => {
          setNearbyPlaces(result.places);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [props.location]);

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {props.location && (
        <div>
          <p>Latitude: {props.location.latitude}</p>
          <p>Longitude: {props.location.longitude}</p>
        </div>
      )}
      <ul>
        {nearbyPlaces?.map((place) => (
          <li>
            {place.displayName.text}, {place.formattedAddress}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NearbyPlaces;
