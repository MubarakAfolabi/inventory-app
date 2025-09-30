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
    console.log(genreClass.getGenres());
    console.log(developerClass.getDevelopers());
    id++;
  };

  const getGames = () => {
    return Object.values(gameInfo);
  };

  const getGame = (id) => {
    return gameInfo[id];
  };

  return { addGame, getGame, getGames };
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
