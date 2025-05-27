import { useRef, useEffect, useState } from "react";
import { TextField, Button, Box, Container } from "@mui/material";
import getCurrentLocation from "../utils/location";
import NearbyPlaces from "./NearbyPlaces";

const AutoComplete = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);

  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const options = {
    // componentRestrictions: { country: ["us", "pk"] },
    fields: ["address_components", "geometry", "name"],
    types: ["establishment", "geocode"],
  };

  const handleSuccess = ({ latitude, longitude }) => {
    const locationString = `Lat: ${latitude}, Lng: ${longitude}`;
    inputRef.current.value = locationString;
    setLocation({ latitude, longitude });
    setName("Current Location");

    // Optionally, trigger the place_changed event manually
    // Trigger a simulated input event to mimic user input
    const event = new Event("place_changed", { bubbles: true });
    inputRef.current.dispatchEvent(event);
  };

  const handleError = (errorMessage) => {
    setError("Error getting current location: " + errorMessage);
    console.error("Error getting current location:", errorMessage);
  };

  const getCurrentLocationHandler = () => {
    getCurrentLocation(handleSuccess, handleError);
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async () => {
      const place = await autoCompleteRef.current.getPlace();
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
      setLocation({ latitude, longitude });
      setName(place.name);
    });
  }, []);
  return (
    <>
      <Container>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <TextField inputRef={inputRef} label="Enter a location" />
          <Button
            onClick={getCurrentLocationHandler}
            variant="contained"
            color="primary"
          >
            Current Location
          </Button>
        </Box>
        {location && (
          <NearbyPlaces name={name} location={location} error={error} />
        )}
      </Container>
    </>
  );
};
export default AutoComplete;
