const genreClass = require("../db/genre");
const developerClass = require("../db/developers");

function Storage() {
  let gameInfo = {};
  let id = 0;

  const addGame = ({
    name,
    imageSrc,
    genre,
    rating,
    yearReleased,
    developer,
    about,
  }) => {
    gameInfo[id] = {
      id,
      imageSrc,
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

storage.addGame({
  name: "GTA IV",
  imageSrc: "/images/gta4.jpg",
  genre: "Action",
  rating: "4.5/5",
  yearReleased: 2008,
  developer: "Rockstar",
  about: "Lorem Ipsum",
});

module.exports = storage;
