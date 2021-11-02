const userServices = require("../services/user");

module.exports.createUsesr = async (req, res) => {
  if (req.isEmailExisting) {
    return res.status(400).json({ status: "error", message: "invalid email" });
  }
  const { firstName, lastName, course, email, password } = req.body;
  try {
    const result = await userServices.registerUser(
      firstName,
      lastName,
      course,
      email,
      password
    );
    res.status(201).json(result);
  } catch (error) {
    console.log(`Database error ${error.stack}`);
    res.status(500).json({ status: "error", message: "Server error!" });
  }
};
