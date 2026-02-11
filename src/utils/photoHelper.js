import { GOOGLE_API_KEY, DEFAULT_IMAGE } from '../config/constants';

export const getPhotoUrl = (place) => {
  if (!place.photos?.[0]) {
    return DEFAULT_IMAGE;
  }
  
  const photoName = place.photos[0].name;
  return `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&key=${GOOGLE_API_KEY}`;
};
