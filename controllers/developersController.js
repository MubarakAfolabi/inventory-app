const developerClass = require("../db/developers");
const storage = require("../db/storage");

const developerPageGet = (req, res) => {
  const developers = [];
  developerClass.getDevelopers().forEach((item) => {
    if (!developers.includes(item.developer)) {
      developers.push(item.developer);
    }
  });
  res.render("developers", { title: "Developers", developers: developers });
};

const developerGamesGet = (req, res) => {
  const games = [];
  let message;
  const { developer } = req.params;
  storage.getGames().forEach((game) => {
    if (game.developer === developer) {
      games.push(game);
    }
  });

  if (games.length === 0) {
    message = `No Games Found Under ${developer}`;
  }
  res.render("gamesList", { title: "Games", storage: games, message: message });
};

const addDeveloperGet = (req, res) => {
  res.render("form", { title: "Add Developer", url: req.originalUrl });
};

const addDeveloperPost = (req, res) => {
  const { developer } = req.body;
  developerClass.addDeveloper({ developer: developer });
  res.redirect("/developers");
};

module.exports = {
  developerPageGet,
  developerGamesGet,
  addDeveloperGet,
  addDeveloperPost,
};
