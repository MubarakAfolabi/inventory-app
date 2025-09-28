const { Router } = require("express");
const genreRouter = Router();
const genreController = require("../controllers/genreController");

genreRouter.get("/", genreController.genrePageGet);
genreRouter.get("/:genre/games", genreController.genreGamesGet);

module.exports = genreRouter;
