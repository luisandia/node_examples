const express = require('express');
const app = express();
const hbs = require('hbs');
require('./hbs/helpers');

const port = process.env.PORT || 3000
// hbs.registerHelper('helper_name', function(...) { ... });
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(__dirname + '/public'));

//express hbs

app.set('view engine', 'hbs');

// helpers



app.get('/', function (req, res) {
  res.render('home', {
    name: 'luis',
    anio: new Date().getFullYear()
  });
});

app.get('/about', function (req, res) {
  res.render('about', {
    name: 'luis',
    anio: new Date().getFullYear()
  });
})
app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});