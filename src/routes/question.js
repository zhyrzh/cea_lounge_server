const questionRouter = require("express").Router();
const questionControllers = require("../controllers/question");
const verifyUser = require("../middlewares/verifyUser");

// GET all questions
questionRouter.get("/", verifyUser, questionControllers.allQuestions);

// GET question detail
questionRouter.get(
  "/:question_id",
  verifyUser,
  questionControllers.getQuestionDetail
);

// POST a question
questionRouter.post("/", verifyUser, questionControllers.postQuestion);

// POST answer on a question
questionRouter.post(
  "/answer/:question_id",
  verifyUser,
  questionControllers.postAnswer
);

// POST like on a question
questionRouter.post(
  "/:question_id/like",
  verifyUser,
  questionControllers.likeAPost
);

// GET all likes from a post
questionRouter.get(
  "/:question_id/like",
  verifyUser,
  questionControllers.getLikesFromPost
);

module.exports = questionRouter;
