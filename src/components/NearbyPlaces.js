import React, { useState, useEffect } from "react";
import { searchNearby } from "../services/searchNearby";

const NearbyPlaces = (prop) => {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [error, setError] = useState(prop.error);

  useEffect(() => {
    if (prop.location) {
      const data = searchNearby(prop.location);
      data
        .then((result) => {
          setNearbyPlaces(result.places);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [prop.location]);

  return (
    <div>
      <h1>Nearby Places</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {prop.location && (
        <div>
          <h2>Selected Coordinates:</h2>
          <p>Latitude: {prop.location.latitude}</p>
          <p>Longitude: {prop.location.longitude}</p>
        </div>
      )}
      <ul>
        {nearbyPlaces?.map((place) => (
          <li>
            {place.displayName.text}, {place.formattedAddress}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyPlaces;
