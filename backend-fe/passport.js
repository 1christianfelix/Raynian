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
      async (accessToken, refreshToken, profile, callback) => {
        console.log(profile);
        const defaultUser = {
          email: profile.emails[0].value,
          username: await usernameGeneration(),
          googleId: profile.id,
        };

        console.log(defaultUser);

        let user = await User.findOneAndUpdate(
          { email: defaultUser.email },
          { $set: { googleId: defaultUser.googleId } },
          { new: true }
        );
        console.log(user);
        if (user) {
          console.log("update");
        }
        if (!user) {
          console.log("creation");
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

  passport.deserializeUser(async (userId, callback) => {
    const user = await User.findById({ userId });
    console.log("deserial", userId, user);
    callback(null, user);
  });
}

module.exports = configurePassport;
