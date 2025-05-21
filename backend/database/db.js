const { Client } = require("pg");

const db = new Client({
  host: "localhost",
  user: "postgres",
  password: "sura2438",
  port: 5432,
  database: "students",
});
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to the database");
  }
});
module.exports = db;
