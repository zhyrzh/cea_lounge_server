const { Pool } = require("pg");

module.exports = new Pool({
  database: "cea_lounge_db",
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "sjcs2012AdminRhyz",
});
