import React, { useState, useEffect } from 'react';

function CurrentLocation() {
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
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div>
      {location ? (
        <p>
          Your current location is: {location.latitude}, {location.longitude}
        </p>
      ) : (
        <p>{error || 'Fetching location...'}</p>
      )}
    </div>
  );
};

export default CurrentLocation;