import { useRef, useEffect } from "react";
import { TextField } from "@mui/material";

const AutoComplete = () => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "ng" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"],
  };
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async () => {
      const place = await autoCompleteRef.current.getPlace();
      console.log({ place });
      console.log(place.name);
    });
  }, []);
  return (
    <>
      <TextField inputRef={inputRef} label="Enter a location" />
    </>
  );
};
export default AutoComplete;
