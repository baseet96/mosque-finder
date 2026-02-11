import { useRef, useEffect, useState } from "react";
import { TextField, Button, Box, Container, Stack, Alert } from "@mui/material";
import { MyLocation, Search } from "@mui/icons-material";
import getCurrentLocation from "../utils/location";
import NearbyPlaces from "./NearbyPlaces";

const AutoComplete = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const handleSuccess = ({ latitude, longitude }) => {
    const locationString = `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
    setInputValue(locationString);
    setLocation({ latitude, longitude });
    setName("Current Location");
  };

  const handleError = (errorMessage) => {
    setError("Error getting current location: " + errorMessage);
    console.error("Error getting current location:", errorMessage);
  };

  const getCurrentLocationHandler = () => {
    getCurrentLocation(handleSuccess, handleError);
  };

  useEffect(() => {
    const initAutocomplete = () => {
      if (!window.google?.maps?.places || !inputRef.current) return;

      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          fields: ["address_components", "geometry", "name", "formatted_address"],
          types: ["establishment", "geocode"],
        }
      );
      
      autoCompleteRef.current.addListener("place_changed", () => {
        const place = autoCompleteRef.current.getPlace();
        
        // Check if place has geometry (user selected from dropdown)
        if (!place || !place.geometry) {
          setError("Please select a location from the dropdown suggestions");
          return;
        }
        
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        setLocation({ latitude, longitude });
        setName(place.name || "Selected Location");
        setInputValue(place.formatted_address || place.name || "");
        setError(null); // Clear any previous errors
      });
    };

    if (window.google?.maps?.places) {
      initAutocomplete();
    } else {
      window.addEventListener("load", initAutocomplete);
      return () => window.removeEventListener("load", initAutocomplete);
    }
  }, []);
  return (
    <>
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
            <TextField
              inputRef={inputRef}
              label="Search for a location"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter an address, city, or place"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: "action.active" }} />,
              }}
            />
            <Button
              onClick={getCurrentLocationHandler}
              variant="contained"
              color="primary"
              startIcon={<MyLocation />}
              sx={{
                minWidth: { xs: "100%", sm: "200px" },
                height: "56px",
                whiteSpace: "nowrap",
              }}
            >
              Use My Location
            </Button>
          </Stack>
        </Box>
        {location && (
          <NearbyPlaces name={name} location={location} error={error} />
        )}
      </Container>
    </>
  );
};
export default AutoComplete;
