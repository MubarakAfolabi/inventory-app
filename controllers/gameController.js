const storage = require("../db/storage");

const gamesListGet = (req, res) => {
  res.render("gamesList", { title: "Games", storage: storage.getGames() });
};

const gameInfoGet = (req, res) => {
  const { id } = req.params;
  const gameInfo = storage.getGame(id);
  res.render("gameInfo.ejs", { title: "Game Info", gameInfo: gameInfo });
};

const addGameGet = (req, res) => {
  res.render("form", { title: "Add Game", url: req.originalUrl });
};

const addGamePost = (req, res) => {
  const { name, genre, rating, yearReleased, developer, about } = req.body;
  storage.addGame({
    name: name,
    imageSrc: "/images/mafia2.jpg",
    genre: genre,
    rating: rating,
    yearReleased: yearReleased,
    developer: developer,
    about: about,
  });
  res.redirect("/games");
};

module.exports = { gamesListGet, gameInfoGet, addGameGet, addGamePost };
