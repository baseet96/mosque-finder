import './App.css';

import { Button, Typography, TextField, Grid, Paper, Container, Box } from '@mui/material';
import CurrentLocation from './components/CurrentLocation';
import { useState } from 'react';
import NearbyPlaces from './components/NearbyPlaces';

function App() {

  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const handleClick = () => {
    // Toggle the state variable
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <div>
      <Container>
        <Box padding={5} align="center">
        <Typography variant="h3">Mosque Finder</Typography>
        </Box>
      </Container>

      <Container>
        <Box display="flex" justifyContent="center">
          <TextField label="Enter city" variant="outlined"/>
          <Button variant="contained" color="primary" onClick={handleClick}>Search</Button>
        </Box>
      </Container>

      <Container>
        <Box>
          <CurrentLocation/>
        </Box>
      </Container>

      <Container>
        <Box>
          {isComponentVisible && <NearbyPlaces/>}
        </Box>
      </Container>

      

      <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Paper>Item 1</Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper>Item 2</Paper>
      </Grid>
    </Grid>
    </div>
  );
}

export default App;