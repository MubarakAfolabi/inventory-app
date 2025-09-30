const genreClass = require("../db/genre");
const developerClass = require("../db/developers");

function Storage() {
  let gameInfo = {};
  let id = 0;

  const addGame = ({
    name,
    file,
    genre,
    rating,
    yearReleased,
    developer,
    about,
  }) => {
    gameInfo[id] = {
      id,
      imageSrc: file ? "/uploads/" + file.filename : "",
      name,
      genre,
      rating,
      yearReleased,
      developer,
      about,
    };
    genreClass.addGenre({ genre: genre });
    developerClass.addDeveloper({ developer: developer });
    id++;
  };

  const getGames = () => {
    return Object.values(gameInfo);
  };

  const getGame = (id) => {
    return gameInfo[id];
  };

  const updateGame = (
    id,
    { name, file, genre, rating, yearReleased, developer, about }
  ) => {
    gameInfo[id] = {
      id,
      name,
      image: file ? "/uploads/" + file.filename : "",
      genre,
      rating,
      yearReleased,
      developer,
      about,
    };
  };

  const deleteGame = (id) => {
    delete gameInfo[id];
  };

  return { addGame, getGame, getGames, updateGame, deleteGame };
}

const storage = Storage();

// storage.addGame({
//   name: "GTA IV",
//   file:
//   genre: "Action",
//   rating: "4.5/5",
//   yearReleased: 2008,
//   developer: "Rockstar",
//   about: "Lorem Ipsum",
// });

module.exports = storage;
