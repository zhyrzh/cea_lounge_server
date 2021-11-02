const userRoutes = require("express").Router();
const userControllers = require("../controllers/user");
const { checkEmail } = require("../middlewares/checkEmail");

// POST a user | Create a user | Register a user
userRoutes.post("/", checkEmail, userControllers.createUsesr);

module.exports = userRoutes;
