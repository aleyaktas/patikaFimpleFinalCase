const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("fimple-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({
      errors: [
        {
          msg: "No token, authorization denied!",
        },
      ],
    });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.username = decoded.username;
    if (req.username !== "kodluyoruz") {
      return res.status(401).json({
        errors: [
          {
            msg: "You are not Admin, authorization denied!",
          },
        ],
      });
    }
    next();
  } catch (err) {
    res.status(401).json({
      errors: [{ msg: "Token is not valid" }],
    });
  }
};
