const jwt = require("jsonwebtoken");
require("dotenv").config();

const authen = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "token  invalid." });
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUser;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(403).json({ error: "Please log in again." });
  }
};

module.exports = authen;
