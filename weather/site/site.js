
const axios = require('axios');

const getLugrLatLng = async (address) => {
  let encoderUrl = encodeURI(address)
  console.log(address);
  console.log(encodeURI)
  let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encoderUrl}&key=AIzaSyAQrdi99J4kzVQNRc0PtDRvX4dLyOkmde0`)
  if (resp.data.status === 'ZERO_RESULTS') {
    throw new Error(`No results  ${address}`);
  }
  let location = resp.data.results[0]
  let coords = location.geometry.location;
  return {
    location: location.formatted_address,
    lat: coords.lat,
    lng: coords.lng
  };
};

module.exports = {
  getLugrLatLng
}