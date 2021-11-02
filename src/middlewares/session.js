const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);
const pool = require("../db");
const sessionSecret = process.env.SESSION_SECRET;

module.exports = session({
  name: "cea_lounge_user_session",
  store: new PgSession({
    pool,
    tableName: "cea_lounge_user",
    createTableIfMissing: true,
    pruneSessionInterval: 1,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365,
  },
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
});
