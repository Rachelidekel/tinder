//const API_KEY = "ddbc9bd9f88d48b495bcda387e42674e";
const LOCATION_URL = "https://www.gps-coordinates.net";

const customFetch = (url, headers) => {
  return fetch(url, headers).then((res) =>
    res.ok ? res.json() : Promise.reject(res.statusText)
  );
};


export const getLocation = ({latitude, longitude}) => {
  return customFetch(
    `${LOCATION_URL}/my-location/coordinates?q=${latitude}&q=${longitude}`
  );
};



