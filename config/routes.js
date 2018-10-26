const axios = require("axios");
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig");
const { authenticate, tokenGeneration } = require("./middlewares");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

async function register(req, res) {
  try {
    const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 10);

    credentials.password = hash;

    const newUserId = await db("users").insert(credentials);
    try {
      const user = await db("users")
        .where({ id: newUserId[0] })
        .first();

      const token = tokenGeneration(user);
      req.headers.authorization = token;
      return res.status(200).send(token);
    } catch (error) {
      return res.status(404).json({ message: "the user does not exist" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "the user could not be registered" });
  }
}

async function login(req, res) {
  try {
    const credentials = req.body;
    const user = await db("users")
      .where({ username: credentials.username })
      .first();

    if (user && bcrypt.compareSync(credentials.password, user.password)) {
      const token = tokenGeneration(user);

      req.headers.authorization = token;
      return res.status(200).send(token);
    } else {
      return res.status(404).json({ message: "Please register." });
    }
  } catch (error) {
    return res.status(500).json({
      message: "an error occurred during the login procedure",
      error: error.message
    });
  }
}

function getJokes(req, res) {
  axios
    .get(
      "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten"
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
