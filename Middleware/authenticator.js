const jwt = require("jsonwebtoken");
const env = require("env2")("./.env");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) throw new Error("Token not found");
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.body.userID = decoded.userID;
    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

module.exports = { auth };
