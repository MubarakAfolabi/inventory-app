require("dotenv").config();
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

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

const genrePageGet = async (req, res) => {
  const genres = await db.getAllGenres();
  res.render("genres", { title: "Genres", genres: genres });
};

const genreGamesGet = async (req, res) => {
  let message;
  const { genre } = req.params;
  const gamesInfo = await db.getGenreInfo(genre);
  if (gamesInfo.length === 0) {
    message = `No Games Found Under ${genre}`;
  }
  res.render("gamesList", {
    title: "Games",
    storage: gamesInfo,
    message: message,
  });
};

const addGenreGet = (req, res) => {
  res.render("genreForm", { title: "Add Genre" });
};

const addGenrePost = [
  validationInfo,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("genreForm", { title: "Add Genre", errors: errors.array() });
    }
    const { password } = req.body;
    if (process.env.PASSWORD === password) {
      const { genre } = req.body;
      await db.addGenre(genre);
      res.redirect("/genres");
    } else {
      res.render("genreForm", {
        title: "Add Genre",
        message: "Password Incorrect",
      });
    }
  },
];

module.exports = {
  genrePageGet,
  genreGamesGet,
  addGenreGet,
  addGenrePost,
};
