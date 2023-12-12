const getCurrentLocation = (successCallback, errorCallback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        successCallback({ latitude, longitude });
      },
      (error) => {
        errorCallback(error.message);
      }
    );
  } else {
    errorCallback("Geolocation is not supported by your browser");
  }
};
export default getCurrentLocation;
