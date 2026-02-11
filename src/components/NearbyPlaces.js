import React, { useState, useEffect } from "react";
import { searchNearby } from "../services/searchNearby";
import { Typography, Box, Grid, CircularProgress, Alert } from "@mui/material";
import PlaceCard from "./PlaceCard";

const NearbyPlaces = ({ location, name, error: parentError }) => {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [error, setError] = useState(parentError);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location) return;

    const fetchPlaces = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await searchNearby(location);
        setNearbyPlaces(result.places || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [location]);

  return (
    <Box sx={{ mt: 3 }}>
      {/* Location Info */}
      {location && (
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </Typography>
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Results */}
      {!loading && nearbyPlaces.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Found {nearbyPlaces.length} nearby mosque{nearbyPlaces.length !== 1 ? 's' : ''}
          </Typography>
          <Grid container spacing={2}>
            {nearbyPlaces.map((place, index) => (
              <PlaceCard key={place.id || index} place={place} />
            ))}
          </Grid>
        </>
      )}

      {/* No Results */}
      {!loading && !error && nearbyPlaces.length === 0 && location && (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          No mosques found in this area. Try searching a different location.
        </Typography>
      )}
    </Box>
  );
};

export default NearbyPlaces;
