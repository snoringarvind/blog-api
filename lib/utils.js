const { response } = require("express");
const jsonwebtoken = require("jsonwebtoken");
const passport = require("passport");
require("dotenv/config");

exports.issueJWT = (user) => {
  const _id = user._id;
  const expiresIn = "1d";

  const payload = { sub: _id, iat: Date.now() };

  const signedToken = jsonwebtoken.sign(payload, process.env.SECRET, {
    expiresIn: expiresIn,
    algorithm: "HS256",
  });

  return { token: signedToken, expires: expiresIn };
};

exports.isAuth = async (req, res, next) => {
  await passport.authenticate("jwt", { session: false });
  console.log("userrr", req.user);
  next();
};
