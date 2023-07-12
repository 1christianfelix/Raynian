const passport = require("passport");

async function loginSuccess(req, res) {
  console.log("\n\n\n\n", req);
  const user = req.user || null;
  await user.populate("stats");
  if (req.user) {
    req.session.user = {
      id: user._id,
      username: user.username,
      profilePicture: user.profilePicture,
      stats: user.stats,
      bio: user.bio,
      tasks: user.tasks,
    };
    console.log(req.session);
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
}

function loginFailed(req, res) {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
}

function googleAuth(req, res) {
  passport.authenticate("google", { scope: ["profile", "email"] });
}

function googleCallback(req, res) {
  passport.authenticate("google", {
    successRedirect: `http://localhost:3000/auth/login/success`,
    failureRedirect: `${process.env.CLIENT_URL}/failed`,
  });
}

function logout(req, res) {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
}

module.exports = {
  loginSuccess,
  loginFailed,
  googleAuth,
  googleCallback,
  logout,
};
