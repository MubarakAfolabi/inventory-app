const developerPageGet = (req, res) => {
  res.render("developers", { title: "Developers" });
};

module.exports = { developerPageGet };
