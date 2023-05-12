const checkEmailPassword = require("../utils/checkEmailPassword");

const controller = {};

controller.authPublic = (req, res) => res.send("Endpoint público");

controller.authAutenticado = (req, res) => {
  const {email, password} = req.body
  try {
    const user = checkEmailPassword(email, password);
    return res.send(`Usuario ${user.name} autenticado`);
  } catch (err) {
    return res.sendStatus(401);
  }
};

controller.authAutorizado = (req, res) => {
  const { email, password } = req.body;
  try {
    const user = checkEmailPassword(email, password);
    if (user.role !== "admin") return res.sendStatus(403);
    return res.send(`Usuario administrador ${user.name}`);
  } catch (err) {
    return res.sendStatus(401);
  }
};

module.exports = controller;
