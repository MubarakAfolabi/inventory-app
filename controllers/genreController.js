const { body, validationResult } = require("express-validator");
const storage = require("../db/storage");
const genreClass = require("../db/genre");

const lengthErr = "must be between 1 and 15 characters.";

const validationInfo = [
  body("genre")
    .trim()
    .customSanitizer((value) => {
      if (!value) {
        return value;
      }
      return value.charAt(0).toUpperCase() + value.slice(1);
    })
    .isLength({ min: 1, max: 15 })
    .withMessage(`Genre ${lengthErr}`),
];

const genrePageGet = (req, res) => {
  const genres = [];
  genreClass.getGenres().forEach((genreItem) => {
    if (!genres.includes(genreItem.genre)) {
      genres.push(genreItem.genre);
    }
  });
  res.render("genres", { title: "Genre", genres: genres });
};

const genreGamesGet = (req, res) => {
  let message;
  const games = [];
  const { genre } = req.params;
  storage.getGames().forEach((game) => {
    if (game.genre === genre) {
      games.push(game);
    }
  });
  if (games.length === 0) {
    message = `No Games Found Under ${genre}`;
  }
  res.render("gamesList", { title: "Games", storage: games, message: message });
};

const addGenreGet = (req, res) => {
  res.render("genreForm", { title: "Add Genre" });
};

const addGenrePost = [
  validationInfo,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("genreForm", { title: "Add Genre", errors: errors.array() });
    }
    const { genre } = req.body;
    genreClass.addGenre({ genre: genre });
    res.redirect("/genres");
  },
];

module.exports = {
  genrePageGet,
  genreGamesGet,
  addGenreGet,
  addGenrePost,
};
