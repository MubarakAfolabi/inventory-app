const { Router } = require("express");
const gameController = require("../controllers/gameController.js");
const gameRouter = Router();

gameRouter.get("/", gameController.gamesListGet);
gameRouter.get("/list/:id", gameController.gameInfoGet);
gameRouter.get("/add", gameController.addGameGet);
gameRouter.post("/add", gameController.addGamePost);

module.exports = gameRouter;
