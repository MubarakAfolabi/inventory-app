const { Router } = require("express");
const multer = require("multer");
const path = require("node:path");
const gameController = require("../controllers/gameController.js");
const gameRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

gameRouter.get("/", gameController.gamesListGet);
gameRouter.get("/list/:id", gameController.gameInfoGet);
gameRouter.get("/add", gameController.addGameGet);

gameRouter.post("/add", upload.single("avatar"), gameController.addGamePost);

module.exports = gameRouter;
