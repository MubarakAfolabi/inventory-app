const db = require("../db/queries");

const getIndexPage = async (req, res) => {
  const info = await db.getAllInfo();
  res.render("index", { title: "Home", storage: info });
};

module.exports = { getIndexPage };
