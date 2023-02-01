 const BASE_URL = "https://www.gps-coordinates.net/my-location";

const customFetch = (url, headers) => {
  return fetch(url, headers).then((res) =>
    res.ok ? res.json() : Promise.reject(res.statusText)
  );
};






