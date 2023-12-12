import React, { useState, useEffect } from "react";
import { searchNearby } from "../services/searchNearby";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";

const NearbyPlaces = (props) => {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [error, setError] = useState(props.error);

  useEffect(() => {
    const data = searchNearby(props.location);
    data
      .then((result) => {
        setNearbyPlaces(result.places);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [props.location]);

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        {error && <Typography sx={{ color: "error.main" }}>{error}</Typography>}
        {props.location && (
          <div>
            <Typography sx={{ m: 0 }}>{props.name}</Typography>
            <Typography sx={{ m: 0 }}>
              Latitude: {props.location.latitude}
            </Typography>
            <Typography sx={{ m: 0 }}>
              Longitude: {props.location.longitude}
            </Typography>
          </div>
        )}
      </Box>
      <Box>
        <Grid>
          {nearbyPlaces?.map((place, index) => (
            <Grid item key={index} xs={12}>
              <Card sx={{ my: 2 }}>
                {/* <CardMedia
                  component="img"
                  height="140"
                  image="public/logo192.png"
                  alt="mosque"
                /> */}
                <CardContent>
                  <Typography variant="h6">{place.displayName.text}</Typography>
                  <Typography>{place.formattedAddress}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default NearbyPlaces;
