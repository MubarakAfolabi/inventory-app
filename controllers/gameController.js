const storage = require("../db/storage");

const gamesListGet = (req, res) => {
  console.log(storage);
  res.render("gamesList", { title: "Games", storage: storage });
};

const gameInfoGet = (req, res) => {
  const { id } = req.params;
  const gameInfo = storage[id];
  res.render("gameInfo.ejs", { title: "Game Info", gameInfo: gameInfo });
};

module.exports = { gamesListGet, gameInfoGet };
