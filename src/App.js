import "./App.css";

import { Button, Typography, TextField, Container, Box } from "@mui/material";
import { useEffect, useState } from "react";
import NearbyPlaces from "./components/NearbyPlaces";
import { getLocation } from "./utils/location";
import AutocompleteComponent from "./components/AutocompleteComponent";

function App() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const handleClick = () => {
    // Toggle the state variable
    setIsComponentVisible(!isComponentVisible);
  };

  useEffect(() => {
    getLocation(setLocation, setError);
  }, []);

  return (
    <>
      <Container>
        <Box padding={5} align="center">
          <Typography variant="h3">Mosque Finder</Typography>
        </Box>
      </Container>

      <Container>
        <Box display="flex" justifyContent="center">
          <TextField label="Enter city" variant="outlined" />
          <Button variant="contained" color="primary" onClick={handleClick}>
            Search
          </Button>
        </Box>
      </Container>

      <Container>
        <Box>
          <AutocompleteComponent />
        </Box>
      </Container>

      <Container>
        <Box>
          {isComponentVisible && (
            <NearbyPlaces location={location} error={error} />
          )}
        </Box>
      </Container>
    </>
  );
}

export default App;
