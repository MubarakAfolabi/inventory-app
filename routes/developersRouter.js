const { Router } = require("express");
const developersController = require("../controllers/developersController");
const developersRouter = Router();

developersRouter.get("/", developersController.developerPageGet);
developersRouter.get(
  "/:developer/games",
  developersController.developerGamesGet
);
developersRouter.get("/add", developersController.addDeveloperGet);
developersRouter.post("/add", developersController.addDeveloperPost);

module.exports = developersRouter;
