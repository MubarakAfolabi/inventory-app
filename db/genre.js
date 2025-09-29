function Genre() {
  const genreObj = {};
  let id = 0;

  const addGenre = ({ genre }) => {
    genreObj[id] = { id, genre };
    id++;
  };

  const getGenres = () => {
    return Object.values(genreObj);
  };

  const getGenre = (id) => {
    return genreObj[id];
  };

  return { addGenre, getGenres, getGenre };
}

const genre = Genre();

module.exports = genre;
