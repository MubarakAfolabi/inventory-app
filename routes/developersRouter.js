const { Router } = require("express");
const developersController = require("../controllers/developersController");
const developersRouter = Router();

developersRouter.get("/", developersController.developerPageGet);

module.exports = developersRouter;
