const pool = require("../db");
const bcrypt = require("bcrypt");

module.exports.checkPassword = async (password, userId) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query({
      text: "SELECT password FROM users WHERE id = ($1)",
      values: [userId],
    });

    return await bcrypt.compare(password, rows[0]?.password);
  } catch (error) {
    console.log(`Database error kani ${error}`);
    throw error;
  } finally {
    client.release();
  }
};
