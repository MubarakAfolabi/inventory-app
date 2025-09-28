const { Router } = require("express");
const developersController = require("../controllers/developersController");
const developersRouter = Router();

developersRouter.get("/", developersController.developerPageGet);
developersRouter.get(
  "/:developer/games",
  developersController.developerGamesGet
);

module.exports = developersRouter;
