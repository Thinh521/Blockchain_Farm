const jwt = require("jsonwebtoken");
const errorCodes = require("../constants/errorCodes");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      code: "401-1",
      message: "Missing access token",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          code: "401-3",
          message: "Access token expired", 
        });
      }

      return res.status(401).json({
        code: "401-2",
        message: "Invalid access token",
      });
    }

    req.user = user;
    next();
  });
};

module.exports = { authMiddleware };
