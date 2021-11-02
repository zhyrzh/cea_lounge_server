const bcrypt = require("bcrypt");
const authServices = require("../services/auth");

module.exports.login = async (req, res) => {
  const { password } = req.body;
  
  if (!req.id) {
    return res
      .status(400)
      .json({ status: "error", message: "invalid credentials" });
  }

  try {
    const isPasswordMatch = await authServices.checkPassword(password, req.id);
    if (!req.isEmailExisting || !isPasswordMatch) {
      return res
        .status(400)
        .json({ status: "error", message: "invalid credentials" });
    }
    req.session.cea_lounge_user = req.id;
    res.status(200).json({
      loggedIn: true,
    });
  } catch (error) {
    console.log(`Server error ${error}`);
    res.status(403).json({ status: "error" });
  }
};

module.exports.verifyUser = async (req, res) => {
  console.log(req.session.cea_lounge_user);
  if (req.isLoggedIn) {
    res.status(200).json({ isLoggedIn: true });
  } else {
    res.status(400).json({ isLoggedIn: false });
  }
};

module.exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res
        .status(400)
        .json({ isLoggedOut: false, message: `something went wrong: ${err}` });
    } else {
      res.status(200).json({ isLoggedOut: true, message: "user logged out" });
    }
  });
};
