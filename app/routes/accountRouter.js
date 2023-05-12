const express = require("express");
const accountController = require("../controllers/accountController");

const accountRouter = express.Router();

accountRouter.get("/:guid", accountController.listUser);
accountRouter.post("/", accountController.addUser);
accountRouter.patch("/:guid", accountController.updateUser);
accountRouter.delete("/:guid", accountController.deleteUser);

module.exports = accountRouter;