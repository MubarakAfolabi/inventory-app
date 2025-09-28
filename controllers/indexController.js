const storage = require("../db/storage");

const getIndexPage = (req, res) => {
  res.render("index", { storage: storage });
};

module.exports = { getIndexPage };
