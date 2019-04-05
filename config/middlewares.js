const jwt = require("jsonwebtoken");
const jwtKey = require("../_secrets/keys").jwtKey;

function tokenGeneration(user) {
  const payload = { username: user.username };
  const options = { expiresIn: 1000 * 60 * 60 };
  return jwt.sign(payload, jwtKey, options);
}
