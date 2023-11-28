import React, { useState, useEffect } from 'react';

const NearbyPlaces = () => {

  const apiKey = 'AIzaSyDuW0L1Hn8dUyn3tkWSr4LcvrfFRgXlqW0';
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError('Geolocation is not supported by your browser');
      }
    };

    getLocation();
  }, []);


  useEffect(() => {
    if (location) {
      console.log("calling fetchNearbyPlaces")
      fetchNearbyPlaces();
    }
  }, [location]);

  const fetchNearbyPlaces = async () => {
    try {
      setLoading(true);

      const response = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress',
          },
          body: JSON.stringify({
            includedTypes: ['mosque'],
            maxResultCount: 10,
            locationRestriction: {
              circle: {
                center: {
                  latitude: location.latitude,
                  longitude: location.longitude,
                },
                radius: 10000,
              },
            },
          }),
        });

      if (!response.ok) {
        throw new Error('Failed to fetch nearby places');
      }

      

      const data = await response.json();
      console.log(data);

      console.log(data.places);
      setNearbyPlaces(data.places);
      console.log(nearbyPlaces)
      console.log(response.status)
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      setError('Error fetching nearby places. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Nearby Places</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {location && (
        <div>
          <h2>Selected Coordinates:</h2>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
      {loading ? (
  <p>Loading nearby places...</p>
  ) : (
      <ul>
        {nearbyPlaces.map((place) => (
          <li>{place.displayName.text}, {place.formattedAddress}</li>
        ))}
      </ul>
  )}
    </div>
  );
};

export default NearbyPlaces;
