const storage = require("../db/storage");

const getIndexPage = (req, res) => {
  res.render("index", { storage: storage.getGames() });
};

module.exports = { getIndexPage };
