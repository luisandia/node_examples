const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

//express hbs

app.set('view engine', 'hbs');
app.get('/', function (req, res) {
  res.render('home', {
    name: 'luis',
    anio: new Date().getFullYear()
  });
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});