const storage = require("../db/storage");

const genrePageGet = (req, res) => {
  const genres = [];
  storage.forEach((game) => {
    if (!genres.includes(game.genre)) {
      genres.push(game.genre);
    }
  });
  res.render("genres", { title: "Genre", genres: genres });
};

const genreGamesGet = (req, res) => {
  const games = [];
  const { genre } = req.params;
  storage.forEach((game) => {
    if (game.genre === genre) {
      games.push(game);
    }
  });
  res.render("gamesList", { title: games, storage: games });
};

module.exports = {
  genrePageGet,
  genreGamesGet,
};
