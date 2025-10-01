require("dotenv").config();
const { Client } = require("pg");

const InfoTable = `
CREATE TABLE IF NOT EXISTS gameinfo (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(255), image TEXT, genre TEXT, rating INTEGER, year_released INTEGER, developer TEXT, about TEXT);
`;

const DeveloperTable = `
CREATE TABLE IF NOT EXISTS developerinfo (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, developer TEXT);
`;

const GenreTable = `
CREATE TABLE IF NOT EXISTS genreinfo (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, genre TEXT);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(InfoTable);
  await client.query(DeveloperTable);
  await client.query(GenreTable);
  await client.end();
  console.log("Done");
}

main();
