const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/UserModel");
const Stats = require("./models/StatsModel");
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
          pfpRandomizer = Math.floor(Math.random() * 3) + 1;
          switch (pfpRandomizer) {
            case 1:
              user.profilePicture =
                "https://img.freepik.com/free-vector/cute-panda-sipping-boba-milk-tea-cartoon-icon-illustration-animal-food-icon-concept-isolated-flat-cartoon-style_138676-2173.jpg";
              break;
            case 2:
              user.profilePicture =
                "https://i.pinimg.com/736x/ef/26/df/ef26df0ce4f41d74cb48a4f139504619.jpg";
              break;
            case 3:
              user.profilePicture =
                "https://img.freepik.com/free-vector/cute-dinosaur-playing-guitar-music-cartoon-vector-icon-illustration-animal-technology-icon-isolated_138676-4729.jpg";
              break;
            default:
              user.profilePicture =
                "https://img.freepik.com/free-vector/cute-dinosaur-playing-guitar-music-cartoon-vector-icon-illustration-animal-technology-icon-isolated_138676-4729.jpg";
              break;
          }
          const stats = new Stats({ user: user._id });
          await stats.save();
          user.stats = stats._id;
          await user.save();
        }
        return callback(null, user);
      }
    )
  );

  passport.serializeUser((user, callback) => {
    // console.log("serial", user);
    callback(null, user._id);
  });

  passport.deserializeUser(async (_id, callback) => {
    const user = await User.findById({ _id });
    // console.log("deserial", _id, user);
    callback(null, user);
  });
}

module.exports = configurePassport;
