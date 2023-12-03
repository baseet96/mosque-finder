export const getLocation = (setLocation, setError) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        setError(error.message);
      }
    );
  } else {
    setError("Geolocation is not supported by your browser");
  }
};
