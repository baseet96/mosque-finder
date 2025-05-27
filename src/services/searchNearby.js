const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export const searchNearby = async (location) => {
  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchNearby",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "places.displayName,places.formattedAddress",
        },
        body: JSON.stringify({
          includedTypes: ["mosque"],
          maxResultCount: 10,
          locationRestriction: {
            circle: {
              center: {
                latitude: location.latitude,
                longitude: location.longitude,
              },
              radius: 10000,
            },
          },
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch nearby places");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // Rethrow the error to be caught by the calling code
  }
};
