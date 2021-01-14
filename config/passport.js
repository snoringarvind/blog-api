const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const Viewer = require("../models/Viewer");
require("dotenv/config");

const getJwtfromCookie = (req) => {
  if (req.cookies) {
    console.log("heyaaaaaaaaaaaaaaaa");
    return req.cookies.jwt;
  } else {
    return null;
  }
};

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([getJwtfromCookie]),
  secretOrKey: process.env.SECRET,
  algorithms: ["HS256"],
};

module.exports = (passport) => {
  passport.use(
    //basically we are passing a callback(a function in argument) to jwt.
    //verify and saying when the token is decoded return the payload value

    new JwtStrategy(options, (jwt_payload, done) => {
      Viewer.findById(jwt_payload.sub, (err, result) => {
        console.log("jwt_payload=", jwt_payload);
        console.log("result", result);
        if (err) done(err);
        if (result == null) done(null, false);
        else {
          return done(null, result);
        }
      });
    })
  );
};
