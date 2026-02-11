import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { getPhotoUrl } from "../utils/photoHelper";

const PlaceCard = ({ place }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="180"
          image={getPhotoUrl(place)}
          alt={place.displayName?.text || "Place"}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            {place.displayName?.text}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {place.formattedAddress}
          </Typography>
          {place.rating && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              ⭐ {place.rating} 
              {place.userRatingCount && ` (${place.userRatingCount})`}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PlaceCard;
