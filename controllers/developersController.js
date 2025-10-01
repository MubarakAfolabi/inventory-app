const { body, validationResult } = require("express-validator");
const developerClass = require("../db/developers");
const storage = require("../db/storage");
const db = require("../db/queries");

const lengthErr = "must be between 1 and 15 characters.";

const validateInfo = [
  body("developer")
    .trim()
    .customSanitizer((value) => {
      if (!value) {
        return value;
      }
      return value.charAt(0).toUpperCase() + value.slice(1);
    })
    .isLength({ min: 1, max: 15 })
    .withMessage(`Developer ${lengthErr}`),
];

const developerPageGet = async (req, res) => {
  const developers = await db.getAllDevelopers();
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
  res.render("developerForm", { title: "Add Developer" });
};

const addDeveloperPost = [
  validateInfo,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("developerForm", {
        title: "Add Developer",
        errors: errors.array(),
      });
    }
    const { developer } = req.body;
    developerClass.addDeveloper({ developer: developer });
    res.redirect("/developers");
  },
];

module.exports = {
  developerPageGet,
  developerGamesGet,
  addDeveloperGet,
  addDeveloperPost,
};
