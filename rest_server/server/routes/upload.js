const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../models/usuario');
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

    imageUser(id, res, newFileName);
    // res.json({ ok: true, message: 'File uploaded!' });
  });
});


function imageUser(id, res, newFileName) {
  Usuario.findById(id, (err, usuarioDB) => {
    if (err)
      return res.status(500).json({ ok: false, err });
    if (!usuarioDB)
      return res.status(400).json({ ok: false, err, message: 'User not exists' });
    usuarioDB.img = newFileName;

    usuarioDB.save((err, userSaved) => {
      res.json({ ok: true, user: userSaved, img: newFileName, message: 'File uploaded!' });
    });
  });
}
function imageProduct() {

}
module.exports = app;