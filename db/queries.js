const pool = require("./pool");

async function addInfo(
  name,
  image,
  genre,
  rating,
  yearReleased,
  developer,
  about
) {
  await pool.query(
    "INSERT INTO gameinfo (name, image, genre, rating, year_released, developer, about) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [name, image, genre, rating, yearReleased, developer, about]
  );
  await pool.query(
    "INSERT INTO developerinfo (developer) VALUES ($1) ON CONFLICT (developer) DO NOTHING",
    [developer]
  );
  await pool.query(
    "INSERT INTO genreinfo (genre) VALUES ($1) ON CONFLICT (genre) DO NOTHING",
    [genre]
  );
}

async function getAllInfo() {
  const { rows } = await pool.query("SELECT * FROM gameinfo ORDER BY id");
  return rows;
}

async function getInfo(id) {
  const { rows } = await pool.query("SELECT * FROM gameinfo WHERE id = ($1)", [
    id,
  ]);
  return rows;
}

async function getGenreInfo(genre) {
  const { rows } = await pool.query(
    "SELECT * FROM gameinfo WHERE genre = ($1)",
    [genre]
  );
  return rows;
}

async function addGenre(genre) {
  await pool.query(
    "INSERT INTO genreinfo (genre) VALUES ($1) ON CONFLICT (genre) DO NOTHING",
    [genre]
  );
}

async function getDeveloperInfo(developer) {
  const { rows } = await pool.query(
    "SELECT * FROM gameinfo WHERE developer = ($1)",
    [developer]
  );
  return rows;
}

async function addDeveloper(developer) {
  await pool.query(
    "INSERT INTO developerinfo (developer) VALUES ($1) ON CONFLICT (developer) DO NOTHING",
    [developer]
  );
}

async function getAllDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developerinfo");
  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genreinfo");
  return rows;
}

async function updateInfo(
  id,
  { name, image, genre, rating, yearReleased, developer, about }
) {
  await pool.query(
    "UPDATE gameinfo SET name = $1, image = $2, genre = $3, rating = $4, year_released = $5, developer = $6, about = $7 WHERE id = $8",
    [name, image, genre, rating, yearReleased, developer, about, id]
  );

  await pool.query(
    "INSERT INTO developerinfo (developer) VALUES ($1) ON CONFLICT (developer) DO NOTHING",
    [developer]
  );
  await pool.query(
    "INSERT INTO genreinfo (genre) VALUES ($1) ON CONFLICT (genre) DO NOTHING",
    [genre]
  );
}

async function deleteInfo(id) {
  await pool.query("DELETE FROM gameinfo WHERE id = $1", [id]);
}

module.exports = {
  addInfo,
  getAllInfo,
  getInfo,
  getGenreInfo,
  addGenre,
  getDeveloperInfo,
  addDeveloper,
  getAllDevelopers,
  getAllGenres,
  updateInfo,
  deleteInfo,
};
