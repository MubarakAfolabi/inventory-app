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
  const games = [];
  const { genre } = req.params;
  storage.getGames().forEach((game) => {
    if (game.genre === genre) {
      games.push(game);
    }
  });
  res.render("gamesList", { title: "Games", storage: games });
};

module.exports = {
  genrePageGet,
  genreGamesGet,
};
