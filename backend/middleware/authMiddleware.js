const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (!process.env.JWT_SECRET) {
      res.status(500);
      throw new Error("JWT secret is not configured");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const foundUser = await User.findById(decoded?.id);

      if (!foundUser) {
        res.status(401);
        throw new Error("Not authorized, user not found");
      }

      req.user = foundUser;
      return next();
    } catch (error) {
      console.error("Auth failed:", error.message);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  res.status(401);
  throw new Error("Not authorized, no token");
});

module.exports = { protect };
