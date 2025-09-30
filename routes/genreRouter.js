const { Router } = require("express");
const genreRouter = Router();
const genreController = require("../controllers/genreController");

genreRouter.get("/", genreController.genrePageGet);
genreRouter.get("/:genre/games", genreController.genreGamesGet);
genreRouter.get("/add", genreController.addGenreGet);
genreRouter.post("/add", genreController.addGenrePost);

module.exports = genreRouter;
