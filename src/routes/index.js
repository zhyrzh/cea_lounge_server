const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Cea Lounge API v1");
});

router.use("/api/v1/auth", require("./auth"));
router.use("/api/v1/user", require("./user"));
router.use("/api/v1/question", require("./question"));

module.exports = router;
