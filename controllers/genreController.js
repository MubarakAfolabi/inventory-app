const storage = require("../db/storage");
const genreClass = require("../db/genre");

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
  res.render("form", { title: "Add Genre", url: req.originalUrl });
};

const addGenrePost = (req, res) => {
  const { genre } = req.body;
  genreClass.addGenre({ genre: genre });
  res.redirect("/genres");
};

module.exports = {
  genrePageGet,
  genreGamesGet,
  addGenreGet,
  addGenrePost,
};
