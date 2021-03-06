const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const { verificaToken, VerificaAdminRole } = require('../middleware/autenticacion');




// const app = express();

///////////

var cookieParser = require('cookie-parser')
var csrf = require('csurf')
var bodyParser = require('body-parser')

// setup route middlewares
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

// create express app
var app = express()

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())

app.get('/form', csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  res.send( { csrfToken: req.csrfToken() })
})

app.post('/process', parseForm, csrfProtection, procesa)

function procesa(req, res) {
  res.send('data is being processed')
}


app.get('/usuario', verificaToken, function (req, res) {
  let from = Number(req.query.from) || 0;
  let to = Number(req.query.to) || 0;
  Usuario.find({ estado: true }, 'nombre email').skip(from).limit(to).exec((err, usuarios) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    Usuario.count({ estado: true }, (err, count) => {
      res.json({ ok: true, usuarios, count });
    });
  });
});

app.post('/usuario', [verificaToken, VerificaAdminRole], function (req, res) {
  let body = req.body;
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });
  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});

app.put('/usuario/:id', [verificaToken, VerificaAdminRole], function (req, res) {
  let id = req.params.id;
  let body = _.pick(req.body,
    ['nombre',
      'email',
      'img',
      'role',
      'estado']
  );
  Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
    if (err) {
      return res.status(400).json({ ok: false, err });
    }
    res.json({ ok: true, usuario: usuarioDB });
  });
});

app.delete('/usuario', [verificaToken, VerificaAdminRole], function (req, res) {
  let id = req.params.id;
  Usuario.findByIdAndRemove(id, (err, usuarioDeleted) => {
    if (err) {
      return res.status(400).json({ ok: false, err });
    }
    if (!usuarioDeleted) {
      return res.status(400).json({ ok: false, message: 'User not found' });
    }
    res.json({ ok: true, usuario: usuarioDeleted });
  });
});

module.exports = app;