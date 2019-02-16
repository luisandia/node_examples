const site = require('./site/site')
const weather = require('./weather/weather')
const argv = require('./config/yargs').argv;
const fs = require('fs');
let comando = argv.d;


let getInfo = async (comando) => {
  let coors = await site.getLugrLatLng(comando);
  let temp = await weather.getWeather(coors.lat, coors.lng);
  return `Weather ${coors.location}: ${temp}`;
};

getInfo(comando).then(
  mensaje=>console.log(mensaje)
).catch(e=>console.log(e))

