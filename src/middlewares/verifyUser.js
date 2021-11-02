module.exports = async (req, res, next) => {
  req.isLoggedIn = req.session.cea_lounge_user ? true : false;
  next();
};
