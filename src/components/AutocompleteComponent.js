import React from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { TextField } from "@mui/material";

const AutocompleteComponent = () => {
  const apiKey = "AIzaSyDuW0L1Hn8dUyn3tkWSr4LcvrfFRgXlqW0";
  const { ref: materialRef } = usePlacesWidget({
    apiKey: apiKey,
    onPlaceSelected: (place) => {
      console.log(place);
    },
    inputAutocompleteValue: "country",
    options: {
      componentRestrictions: { country: "us" },
    },
  });

  return (
    <>
      <TextField
        label="Enter a location"
        variant="outlined"
        inputRef={materialRef}
      />
    </>
  );
};

export default AutocompleteComponent;
