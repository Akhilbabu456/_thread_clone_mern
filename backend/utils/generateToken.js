const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAg: 15 * 24 * 60 * 1000,
    sameSite: "strict",
  });

  return token;
};

module.exports = generateToken;
