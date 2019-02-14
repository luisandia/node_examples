const axios = require('axios');
const argv = require('./config/yargs').argv;
const fs = require('fs');
let comando = argv.direccion;

let encoderUrl = encodeURI(comando)

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encoderUrl}&key=AIzaSyAQrdi99J4kzVQNRc0PtDRvX4dLyOkmde0`)
  .then(resp => {
    let location  = resp.data.results[0]
    let coords = location.geometry.location;
    console.log(coords.lat)
    console.log(coords.lng)
    console.log(location.formatted_address);
    // console.log(JSON.stringify(resp.data,undefined,2) );
  }).catch(e => {
    console.log("Error", e);
  });



