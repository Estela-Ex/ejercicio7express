const express = require("express");
const authSessionController = require("../controllers/authSessionController");
const authSessionRouter = express.Router();
const checkBody = require('../midlewares/checkBody')

authSessionRouter.post("/login",checkBody, authSessionController.authUser);
authSessionRouter.get("/profile", authSessionController.listUser);

module.exports = authSessionRouter;