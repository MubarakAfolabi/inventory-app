const { Router } = require("express");
const gameController = require("../controllers/gameController.js");
const gameRouter = Router();

gameRouter.get("/", gameController.gamesListGet);

gameRouter.get("/:id", gameController.gameInfoGet);

module.exports = gameRouter;
