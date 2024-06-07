const passport = require("passport");
const userModel = require("../models/user.model");

const localStrategy = require("passport-local").Strategy;

const localAuth = (passport) => {
  console.log("localAuth"); //testing
  passport.use(
    new localStrategy(async (username, password, done) => {
      const user = await userModel.findOne({ email: username });

      console.log(user); //testing
      if (!user) {
        return done(null, false);
      }
      if (user.password != password) {
        return done(null, false);
      }
      return done(null, user);
    })
  );
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);

    return done(null, user);
  });
};

module.exports = localAuth;
