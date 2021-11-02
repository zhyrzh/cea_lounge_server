const authRouter = require("express").Router();
const authControllers = require("../controllers/auth");
const { checkEmail } = require("../middlewares/checkEmail");
const verifyUser = require("../middlewares/verifyUser");

// POST credentials | LOGIN
authRouter.post("/", checkEmail, authControllers.login);

// GET | check if user has cookie stored
authRouter.get("/", verifyUser, authControllers.verifyUser);

// DELETE | deletes a session and logs out user
authRouter.delete("/", authControllers.logout);

module.exports = authRouter;
