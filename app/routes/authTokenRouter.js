const express = require("express");

const authTokenController = require("../controllers/authTokenController");
const checkBody = require("../midlewares/checkBody");
const validateLoginDto = require("../midlewares/validateLoginDto");

const authTokenRouter = express.Router();

authTokenRouter.post("/login", checkBody, validateLoginDto , authTokenController.authUser);
authTokenRouter.get("/profile", authTokenController.listAuthUser);

module.exports = authTokenRouter;