require('./config/config');

const express = require('express')
const app = express();
const bodyParser = require('body-parser')



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.get('/usuarios', function (req, res) {
  res.send('Hello world');
});
app.post('/usuarios', function (req, res) {
  let body = req.body;

  res.json({ body });
});
app.put('/usuarios/:id', function (req, res) {

  let id = req.params.id;
  res.send('Hello world');
});
app.delete('/usuarios', function (req, res) {
  res.send('Hello world');
});

app.listen(process.env.PORT, () => {
  console.log('Listen port 3000');
})