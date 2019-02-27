const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/imagen/:tipo/:img', (req, res) => {
  let tipo = req.params.tipo;
  let img = req.params.img;
  let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
  let noImagePath = path.resolve(__dirname, '../assets/descarga.png');
  if (fs.existsSync(pathImage)) {
    res.sendFile(pathImage);
  } else {
    res.sendFile(noImagePath);
  }
});

module.exports = app;