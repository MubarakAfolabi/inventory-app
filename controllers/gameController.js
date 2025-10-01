const storage = require("../db/storage");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const lengthErr = "must be between 1 and 15 characters.";

const validateInfo = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage(`Name ${lengthErr}`),
  body("genre")
    .trim()
    .customSanitizer((value) => {
      if (!value) {
        return value;
      }
      return value.charAt(0).toUpperCase() + value.slice(1);
    })
    .isLength({ min: 1, max: 15 })
    .withMessage(`Genre ${lengthErr}`),
  body("rating")
    .isInt({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),
  body("yearReleased")
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage("Year must be between 1900 and the current year"),
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

// const gamesListGet = (req, res) => {
//   let message;
//   res.render("gamesList", {
//     title: "Games",
//     storage: storage.getGames(),
//     message: message,
//   });
// };

async function infoListGet(req, res) {
  let message;
  const info = await db.getAllInfo();
  res.render("gamesList", {
    title: "Games",
    storage: info,
    message: message,
  });
}

const gameInfoGet = async (req, res) => {
  const { id } = req.params;
  const gameInfo = await db.getInfo(id);
  console.log(gameInfo);
  res.render("gameInfo.ejs", { title: "Game Info", gameInfo: gameInfo[0] });
};

const addGameGet = (req, res) => {
  res.render("addForm", { title: "Add Info" });
};

// const addGamePost = [
//   validateInfo,
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res
//         .status(400)
//         .render("addForm", { title: "Add Info", errors: errors.array() });
//     }

//     const { name, genre, rating, yearReleased, developer, about } = req.body;
//     storage.addGame({
//       name: name,
//       file: req.file,
//       genre: genre,
//       rating: rating,
//       yearReleased: yearReleased,
//       developer: developer,
//       about: about,
//     });
//     res.redirect("/games");
//   },
// ];

const addInfoPost = [
  validateInfo,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("addForm", { title: "Add Info", errors: errors.array() });
    }
    const { name, genre, rating, yearReleased, developer, about } = req.body;
    const image = "/uploads/" + req.file.filename;
    await db.addInfo(
      name,
      image,
      genre,
      rating,
      yearReleased,
      developer,
      about
    );
    res.redirect("/games");
  },
];

const updateGameGet = (req, res) => {
  const { id } = req.params;
  const game = storage.getGame(id);
  res.render("updateForm", {
    title: "Update Info",
    game: game,
  });
};

const updateGamePost = [
  validateInfo,
  (req, res) => {
    const { id } = req.params;
    const game = storage.getGame(id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateForm", {
        title: "Update Info",
        game: game,
        errors: errors.array(),
      });
    }
    const { name, genre, rating, yearReleased, developer, about } = req.body;
    if (req.file) {
      storage.updateGame(id, { file: req.file });
    }
    storage.updateGame(id, {
      id: id,
      name: name,
      genre: genre,
      rating: rating,
      yearReleased: yearReleased,
      developer: developer,
      about: about,
    });
    res.redirect(`/games/list/${id}`);
  },
];

const deleteGamePost = (req, res) => {
  const { id } = req.params;
  storage.deleteGame(id);
  res.redirect("/games");
};

module.exports = {
  infoListGet,
  gameInfoGet,
  addGameGet,
  addInfoPost,
  updateGameGet,
  updateGamePost,
  deleteGamePost,
};
