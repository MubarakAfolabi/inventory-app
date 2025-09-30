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
gameRouter.post("/list/:id/delete", gameController.deleteGamePost);

gameRouter.get("/list/:id/update", gameController.updateGameGet);
gameRouter.post("/list/:id/update", gameController.updateGamePost);

module.exports = gameRouter;
