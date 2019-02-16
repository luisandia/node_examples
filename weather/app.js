const site = require('./site/site')
const weather = require('./weather/weather')
const argv = require('./config/yargs').argv;
let comando = argv.d;

let getInfo = async (adress) => {
  try {
    let coors = await site.getLugrLatLng(adress);
    let temp = await weather.getWeather(coors.lat, coors.lng);
    return `Weather ${coors.location}: ${temp}`;
  } catch (e) {
    return `No weather: ${adress}`;
  }
};

getInfo(comando).then(
  mensaje => console.log(mensaje)
).catch(e => console.log(e))

