const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  if (!req.headers.authorization) return res.sendStatus(403);
  const token = req.headers.authorization.replace("Bearer ", "");
  if (!token) {
    res.status(401).send("You need to login");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    res.status(403).send("Bad token");
  }
}
function admin(req, res, next) {
  if (req.user.role == "admin") {
    next();
  } else {
    return res
      .status(403)
      .json("You are not permitted to access this resource");
  }
}
module.exports = { auth, admin };
