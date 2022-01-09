const { application } = require("express");
const express = require("express");
const route = express();
const usercontrolar = require("../controlar/usercontrolar");
const { auth, generateToken } = require("../middleware/course");
const { upload } = require("../services/multer");

route.get("/", usercontrolar.login);

route.get("/register", usercontrolar.register);
route.post("/signup", upload.single("image"), usercontrolar.signup);

route.get("/forgetPassword", usercontrolar.forgetPassword);
route.post("/verifyEmail", usercontrolar.verifyEmail);

route.get("/otp", usercontrolar.otp);
route.post("/verifyOtp", usercontrolar.verifyOtp);

route.get("/newpassword", usercontrolar.newpassword);
route.post("/updatePassword", usercontrolar.updatePassword);

route.post("/loginUser", generateToken, usercontrolar.user);

route.get("/dashboard", auth, usercontrolar.dashboard);

route.get("/viewprofile", auth, usercontrolar.viewprofile);

route.get("/updateprofile", auth, usercontrolar.updateprofile);
route.post(
  "/updateviewprofile",
  auth,
  upload.single("image"),
  usercontrolar.updateviewprofile
);

route.get("/resetPassword", auth, usercontrolar.resetPassword);
route.post("/resetPass", auth, usercontrolar.resetPass);

route.get("/logout", auth, usercontrolar.logout);

module.exports = route;
