const { urlencoded } = require("express");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(require("./middlewares/session"));
app.use(require("./routes"));

app.listen(PORT, () => console.log(`Server app and running`));
