const { Router } = require("express");
const gameController = require("../controllers/gameController.js");
const gameRouter = Router();

gameRouter.get("/", gameController.gamesPageGet);

module.exports = gameRouter;
