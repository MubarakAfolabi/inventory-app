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
  await pool.query("INSERT INTO developerinfo (developer) VALUES ($1)", [
    developer,
  ]);
  await pool.query("INSERT INTO genreinfo (genre) VALUES ($1)", [genre]);
}

async function getAllInfo() {
  const { rows } = await pool.query("SELECT * FROM gameinfo");
  return rows;
}

async function getAllDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developerinfo");
  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM gameinfo");
  return rows;
}

module.exports = {
  addInfo,
  getAllInfo,
  getAllDevelopers,
  getAllGenres,
};
