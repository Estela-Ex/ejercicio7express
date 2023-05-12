const express = require("express");
const authController = require("../controllers/authController")
const authRouter = express.Router();
const checkBody = require("../midlewares/checkBody");

authRouter.get("/public", authController.authPublic)
authRouter.post("/autenticado",checkBody, authController.authAutenticado)
authRouter.post("/autorizado",checkBody, authController.authAutorizado)

module.exports = authRouter;