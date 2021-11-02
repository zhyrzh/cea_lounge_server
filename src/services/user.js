const pool = require("../db");
const bcrypt = require("bcrypt");

module.exports.registerUser = async (
  firstName,
  lastName,
  course,
  email,
  password
) => {
  const client = await pool.connect();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    client.query("BEGIN");
    const user = await client.query({
      text: `INSERT INTO users (first_name, last_name, course, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      values: [firstName, lastName, course, email, hashedPassword],
    });
    client.query("COMMIT");
    return user.rows[0];
  } catch (error) {
    client.query("ROLLBACK");
    console.log(`Database error ${error}`);
  } finally {
    client.release();
  }
};
