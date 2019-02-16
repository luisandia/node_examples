const axios = require('axios');

const getWeather = async (lat, lng) => {

  let res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=bbaac3beeeae95a630ab7ab148dbebd6`);

  return res.data.main.temp;
};

module.exports = {
  getWeather
};