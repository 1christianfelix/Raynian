const router = require("express").Router();
const oAuthController = require("../controllers/oAuthController");

router.get("/login/success", oAuthController.loginSuccess);

router.get("/login/failed", oAuthController.loginFailed);

router.get("/google", oAuthController.googleAuth);

router.get("/google/callback", oAuthController.googleCallback);

router.get("/logout", oAuthController.logout);

module.exports = router;
