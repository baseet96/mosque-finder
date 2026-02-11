export const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const DEFAULT_IMAGE = process.env.PUBLIC_URL + "/logo192.png";

export const SEARCH_CONFIG = {
  maxResultCount: 10,
  searchRadius: 10000, // meters
  includedTypes: ["mosque"],
};

export const AUTOCOMPLETE_OPTIONS = {
  fields: ["address_components", "geometry", "name", "formatted_address"],
  types: ["establishment", "geocode"],
};
