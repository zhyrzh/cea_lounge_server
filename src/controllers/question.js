const questionServices = require("../services/question");

module.exports.allQuestions = async (req, res) => {
  try {
    const questions = await questionServices.getAllQuestions();
    if (questions <= 0) {
      return res
        .status(404)
        .json({ status: "error", message: "No questions yet!" });
    }
    res.status(200).json({ status: "success", data: questions.rows });
  } catch (error) {
    console.error(`Server error ${error}`);
    res.status(500).json({
      status: "server_error",
      message: "Problem with server handling. Request failed",
    });
  }
};

module.exports.getQuestionDetail = async (req, res) => {
  if (!req.isLoggedIn)
    return res.status(401).json({
      status: "error",
      messsage: "You are not logged in",
      isLoggedIn: false,
    });
  const questionId = req.params.question_id;
  try {
    const { question, answers, likes } = await questionServices.getAQuestion(
      questionId
    );

    if (question.length <= 0) {
      return res
        .status(404)
        .json({ status: "error", message: "no question found" });
    }
    res
      .status(200)
      .send({
        status: "success",
        data: { question: question[0], answers, likes },
      });
  } catch (error) {
    console.error(`Server error ${error}`);
    res.status(500).json({
      status: "server_error",
      message: "Problem with server handling. Request failed",
    });
  }
};

module.exports.postQuestion = async (req, res) => {
  if (!req.isLoggedIn)
    return res.status(401).json({
      status: "error",
      messsage: "You are not logged in",
      isLoggedIn: false,
    });

  const { title, question } = req.body;
  try {
    const createdQuestion = await questionServices.insertQuestion(
      title,
      question,
      req.session.cea_lounge_user
    );
    if (!createdQuestion) {
      return res
        .status(400)
        .json({ status: "error", message: "post not created" });
    }
    res.status(201).json({ status: "success", data: createdQuestion });
  } catch (error) {
    console.error(`Server error ${error}`);
    res.status(500).json({
      status: "server_error",
      message: "Problem with server handling. Request failed",
    });
  }
};

module.exports.postAnswer = async (req, res) => {
  if (!req.isLoggedIn)
    return res.status(401).json({
      status: "error",
      messsage: "You are not logged in",
      isLoggedIn: false,
    });
  const questionId = req.params.question_id;
  const { answer } = req.body;
  try {
    const createdAnswer = await questionServices.postAnswer(
      req.session.cea_lounge_user,
      questionId,
      answer
    );

    if (!createdAnswer) {
      return res.status(400).json({
        status: "error",
        message: "answer not created",
      });
    }
    res.status(201).json(createdAnswer);
  } catch (error) {
    console.error(`Server error ${error}`);
    res.status(500).json({
      status: "server_error",
      message: "Problem with server handling. Request failed",
    });
  }
};

module.exports.likeAPost = async (req, res) => {
  const questionId = req.params.question_id;
  try {
    const createdLike = await questionServices.postALike(
      req.session.cea_lounge_user,
      questionId
    );
    if (createdLike <= 0) {
      return res.status(400).json({
        status: "error",
        message: "error liking the post",
      });
    }
    res.status(201).json({ status: "success", data: { liked: true } });
  } catch (error) {
    console.error(`Server error ${error}`);
    res.status(500).json({
      status: "server_error",
      message: "Problem with server handling. Request failed",
    });
  }
};

module.exports.getLikesFromPost = async (req, res) => {
  const questionId = req.params.question_id;
  try {
    const likes = await questionServices.getAllLikes(questionId);
    res.status(200).json(likes);
  } catch (error) {
    console.error(`Server error ${error}`);
    res.status(500).json({
      status: "server_error",
      message: "Problem with server handling. Request failed",
    });
  }
};
