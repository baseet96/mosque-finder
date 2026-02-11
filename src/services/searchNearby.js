import { GOOGLE_API_KEY, SEARCH_CONFIG } from '../config/constants';

export const searchNearby = async (location) => {
  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchNearby",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_API_KEY,
          "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.photos,places.rating,places.userRatingCount",
        },
        body: JSON.stringify({
          includedTypes: SEARCH_CONFIG.includedTypes,
          maxResultCount: SEARCH_CONFIG.maxResultCount,
          locationRestriction: {
            circle: {
              center: {
                latitude: location.latitude,
                longitude: location.longitude,
              },
              radius: SEARCH_CONFIG.searchRadius,
            },
          },
        }),
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || "Failed to fetch nearby places");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Search nearby error:", error);
    throw error;
  }
};
