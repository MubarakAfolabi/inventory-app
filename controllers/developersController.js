const storage = require("../db/storage");

const developerPageGet = (req, res) => {
  const developers = [];
  storage.forEach((game) => {
    if (!developers.includes(game.developer)) {
      developers.push(game.developer);
    }
  });
  res.render("developers", { title: "Developers", developers: developers });
};

const developerGamesGet = (req, res) => {
  const games = [];
  const { developer } = req.params;
  storage.forEach((game) => {
    if (game.developer === developer) {
      games.push(game);
    }
  });
  res.render("gamesList", { title: "Games", storage: games });
};

module.exports = { developerPageGet, developerGamesGet };
