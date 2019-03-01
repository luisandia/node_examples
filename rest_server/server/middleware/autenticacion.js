let verificaToken = (req, res, next) => {
  let token = req.get('token');
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err
      });
    }
    req.usuario = decoded.usuario;
    next();
  });
};

let VerificaAdminRole = (req, res, next) => {
  let usuario = req.usuario;

  if (usuario.role === 'ADMIN_ROLE') {
    next();
  }
  return res.json({
    ok: false,
    err: {
      message: 'User is not administrator'
    }
  });
};
module.exports = {
  verificaToken,
  VerificaAdminRole
};
