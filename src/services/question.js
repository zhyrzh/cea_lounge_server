const pool = require("../db");

module.exports.getAllQuestions = async () => {
  const client = await pool.connect();
  try {
    const questions = await client.query("SELECT * FROM questions");
    return questions;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

module.exports.insertQuestion = async (title, question, author_id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const res = await client.query({
      text: `SELECT CONCAT(first_name, ' ' ,last_name) AS user_name FROM users WHERE id = $1`,
      values: [author_id],
    });

    const user_name = res.rows[0].user_name;
    const { rows } = await client.query({
      text: `INSERT INTO questions (author_id, title, question, author_name) VALUES ($1, $2, $3, $4) RETURNING id`,
      values: [author_id, title, question, user_name],
    });

    await client.query("COMMIT");
    return rows[0].id;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports.getAQuestion = async (question_id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows: question } = await client.query({
      text: `SELECT * FROM questions WHERE id = $1`,
      values: [question_id],
    });
    const { rows: answers } = await client.query({
      text: `SELECT * FROM question_answers WHERE question_id = $1`,
      values: [question_id],
    });
    const { rows: likes } = await client.query({
      text: `SELECT COUNT(*) AS likes FROM question_likes WHERE question_id = $1 GROUP BY question_id`,
      values: [question_id],
    });
    await client.query("COMMIT");
    return { question, answers, likes: +likes[0].likes };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports.postAnswer = async (userId, questionId, answer) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query({
      text: `INSERT INTO question_answers (user_id, question_id, answer) VALUES ($1, $2, $3) RETURNING id`,
      values: [userId, questionId, answer],
    });
    return rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

module.exports.postALike = async (userId, questionId) => {
  const client = await pool.connect();
  try {
    const { rowCount } = await client.query({
      text: `INSERT INTO question_likes (user_id, question_id) VALUES ($1, $2)`,
      values: [userId, questionId],
    });

    return rowCount;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

module.exports.getAllLikes = async (questionId) => {
  const client = await pool.connect();
  try {
    const { rows: likes } = await client.query({
      text: `SELECT COUNT(*) AS likes FROM question_likes WHERE question_id = $1 GROUP BY question_id`,
      values: [questionId],
    });
    return likes[0].likes;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};
