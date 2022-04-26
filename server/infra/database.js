const pgp = require("pg-promise")();
const db = pgp({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: "blog",
});

module.exports = db;
