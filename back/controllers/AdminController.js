const AdminController = {};
const { User } = require("../models/index");

AdminController.asignarAdministrador = (req, res) => {
  User.update({ isAdmin: true }, { where: req.body })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => res.send(err));
};

AdminController.quitarAdministrador = (req, res) => {
  User.update({ isAdmin: false }, { where: req.body })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => res.send(err));
};

AdminController.borrarUsuario = (req, res) => {
  User.findOne({ where: req.body })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => res.send(err));
};

module.exports = AdminController;