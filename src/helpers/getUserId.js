const jwt = require("jsonwebtoken");

const getUserId = (req) => {
  const token = req.headers.authorization.split(" ")[1];

  let userId;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403).json({ error: "Invalid token." });
    userId = payload.user_id;
  });

  return userId;
};

module.exports = getUserId;
