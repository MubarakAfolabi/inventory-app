const storage = require("../db/storage");

const gamesListGet = (req, res) => {
  res.render("gamesList", { title: "Games", storage: storage.getGames() });
};

const gameInfoGet = (req, res) => {
  const { id } = req.params;
  const gameInfo = storage.getGame(id);
  res.render("gameInfo.ejs", { title: "Game Info", gameInfo: gameInfo });
};

module.exports = { gamesListGet, gameInfoGet };
