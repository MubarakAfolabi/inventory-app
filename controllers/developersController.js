require("dotenv").config();
const { body, validationResult } = require("express-validator");
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

const developerGamesGet = async (req, res) => {
  let message;
  const { developer } = req.params;
  const gamesInfo = await db.getDeveloperInfo(developer);
  if (gamesInfo.length === 0) {
    message = `No Games Found Under ${developer}`;
  }
  res.render("gamesList", {
    title: "Games",
    storage: gamesInfo,
    message: message,
  });
};

const addDeveloperGet = (req, res) => {
  res.render("developerForm", { title: "Add Developer" });
};

const addDeveloperPost = [
  validateInfo,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("developerForm", {
        title: "Add Developer",
        errors: errors.array(),
      });
    }
    const { password } = req.body;
    if (process.env.PASSWORD === password) {
      const { developer } = req.body;
      await db.addDeveloper(developer);
      res.redirect("/developers");
    } else {
      res.render("developerForm", {
        title: "Add Developer",
        message: "Incorrect Password",
      });
    }
  },
];

module.exports = {
  developerPageGet,
  developerGamesGet,
  addDeveloperGet,
  addDeveloperPost,
};
