const pool = require("../db");

module.exports.checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const client = await pool.connect();
  try {
    const { rowCount, rows } = await client.query({
      text: `SELECT id, email FROM users WHERE email = $1`,
      values: [email],
    });

    req.isEmailExisting = rowCount > 0;
    req.id = rows[0]?.id;

    next();
  } catch (error) {
    console.log(`Database error ${error}`);
    res.status(500).json({ status: "error" });
    throw error;
  } finally {
    client.release();
  }
};
