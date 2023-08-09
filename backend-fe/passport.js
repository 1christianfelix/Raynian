const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/UserModel");
const { usernameGeneration } = require("./util/usernameGen");

function configurePassport(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:4000/api/auth/google/callback",
        // passReqToCallback: true,
        scope: ["profile", "email"],
      },
      async (req, accessToken, refreshToken, profile, callback) => {
        const defaultUser = {
          email: profile.emails[0].value,
          username: await usernameGeneration(),
          googleId: profile.id,
        };

        let user = await User.findOneAndUpdate(
          { email: defaultUser.email },
          { $set: { googleId: defaultUser.googleId } },
          { new: true }
        );
        if (user) {
        }
        if (!user) {
          user = await User.create(defaultUser);
        }
        return callback(null, user);
      }
    )
  );

  passport.serializeUser((user, callback) => {
    console.log("serial", user);
    callback(null, user._id);
  });

  passport.deserializeUser(async (_id, callback) => {
    const user = await User.findById({ _id });
    console.log("deserial", _id, user);
    callback(null, user);
  });
}

module.exports = configurePassport;
