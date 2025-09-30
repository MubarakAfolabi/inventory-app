const storage = require("../db/storage");

const gamesListGet = (req, res) => {
  let message;
  res.render("gamesList", {
    title: "Games",
    storage: storage.getGames(),
    message: message,
  });
};

const gameInfoGet = (req, res) => {
  const { id } = req.params;
  const gameInfo = storage.getGame(id);
  console.log(gameInfo);
  res.render("gameInfo.ejs", { title: "Game Info", gameInfo: gameInfo });
};

const addGameGet = (req, res) => {
  res.render("form", { title: "Add Game", url: req.originalUrl });
};

const addGamePost = (req, res) => {
  console.log(req.file);
  const { name, genre, rating, yearReleased, developer, about } = req.body;
  storage.addGame({
    name: name,
    file: req.file,
    genre: genre,
    rating: rating,
    yearReleased: yearReleased,
    developer: developer,
    about: about,
  });
  console.log(storage.getGames());
  res.redirect("/games");
};

const updateGameGet = (req, res) => {
  const { id } = req.params;
  const game = storage.getGame(id);
  res.render("form", {
    title: "Update Game",
    url: req.originalUrl,
    game: game,
  });
};

const updateGamePost = (req, res) => {
  const { id } = req.params;
  const { name, genre, rating, yearReleased, developer, about } = req.body;
  if (req.file) {
    storage.updateGame(id, { file: req.file });
  }
  storage.updateGame(id, {
    id: id,
    name: name,
    genre: genre,
    rating: rating,
    yearReleased: yearReleased,
    developer: developer,
    about: about,
  });
  console.log(storage.getGame(id));
  res.redirect("/games");
};

const deleteGamePost = (req, res) => {
  const { id } = req.params;
  storage.deleteGame(id);
  res.redirect("/games");
};

module.exports = {
  gamesListGet,
  gameInfoGet,
  addGameGet,
  addGamePost,
  updateGameGet,
  updateGamePost,
  deleteGamePost,
};
