const db = require("../db/queries");

const getIndexPage = async (req, res) => {
  const info = await db.getAllInfo();
  console.log(info);
  res.render("index", { storage: info });
};

module.exports = { getIndexPage };
