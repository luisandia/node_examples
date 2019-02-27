const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../models/usuario');
const fs = require('fs');
const path = require('path');
// default options
app.use(fileUpload());

app.put('/upload/:tipo/:id', (req, res) => {
  let tipo = req.params.tipo;
  let id = req.params.id;
  if (Object.keys(req.files).length == 0) {
    return res.status(400).json({ ok: false, err: { message: 'No files were uploaded.' } });
  }
  let tiposValidos = ['products', 'users'];
  let sampleFile = req.files.archivo;
  let extensionArchivo = sampleFile.name.split('.');
  let extension = extensionArchivo[extensionArchivo.length - 1];
  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
  if (tiposValidos.indexOf(tipo) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "type invalid"
      }
    });
  }
  if (!extensionesValidas.indexOf(extension)) {
    return res.status(400).json({
      ok: false,
      err: {
        message: `extension ${extension} invalid`
      }
    });
  }
  let newFileName = `${id}-${new Date().getMilliseconds()}.${extension}`;
  sampleFile.mv(`uploads/${tipo}/${newFileName}`, (err) => {
    if (err)
      return res.status(500).json({ ok: false, err });
    if (tipo === "users")
      imageUser(id, res, newFileName);
    else {
      imageProduct(id, res, newFileName);
    }
    // res.json({ ok: true, message: 'File uploaded!' });
  });
});


function imageUser(id, res, newFileName) {
  Usuario.findById(id, (err, usuarioDB) => {
    if (err) {
      deleteImage(newFileName, 'users');
      return res.status(500).json({ ok: false, err });
    }
    if (!usuarioDB) {
      deleteImage(newFileName, 'users');
      return res.status(400).json({ ok: false, err, message: 'User not exists' });
    }
    deleteImage(usuarioDB.img, 'users');
    usuarioDB.img = newFileName;
    usuarioDB.save((err, userSaved) => {
      res.json({ ok: true, user: userSaved, img: newFileName, message: 'File uploaded!' });
    });
  });
}

/* FIXME: falta crear el modelo de productos*/
function imageProduct(id, res, newFileName) {
  Usuario.findById(id, (err, productDB) => {
    if (err) {
      deleteImage(newFileName, 'products');
      return res.status(500).json({ ok: false, err });
    }
    if (!productDB) {
      deleteImage(newFileName, 'products');
      return res.status(400).json({ ok: false, err, message: 'User not exists' });
    }
    deleteImage(productDB.img, 'products');
    productDB.img = newFileName;
    productDB.save((err, userSaved) => {
      res.json({ ok: true, user: userSaved, img: newFileName, message: 'File uploaded!' });
    });
  });
}
function deleteImage(nombreImagen, tipo) {
  let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
  if (fs.existsSync(pathImage)) {
    fs.unlinkSync(pathImage);
  }
}


module.exports = app;