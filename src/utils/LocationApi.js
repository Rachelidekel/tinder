export const sucessfulLookup = (position) => {
  const { latitude, longitude } = position.coords;
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=251e94ef6ee4428f9a0be600e0c0b377`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};
