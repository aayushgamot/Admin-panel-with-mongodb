const user = require("../modual/usermodual");
const {
  ragister,
  passwordValidate,
  loginValidate,
  newPasswordValidate,
  updateviewprofiles,
  resetpValidate,
} = require("../validation/uservalidation");
const bcrypt = require("bcrypt");
const salt = 10;
const logger = require("../loggar/logger");
const { OTPsend } = require("../services/mail");

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
logger.info(otp);

exports.login = (req, res) => {
  res.render("login", {
    values: req.body,
  });
};

exports.register = (req, res) => {
  res.render("ragistation", {
    values: req.body,
  });
};

exports.signup = async (req, res) => {
  console.log("1", req.body);
  try {
    let { error } = ragister(req.body);
    console.log(error);
    if (error) {
      if (error.details[0].context.key == "surname") {
        var err1 = error.details[0].message;
        return res.render("ragistation", {
          error1: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "name") {
        var err1 = error.details[0].message;
        return res.render("ragistation", {
          error2: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "number") {
        var err1 = error.details[0].message;
        return res.render("ragistation", {
          error3: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "email") {
        var err1 = error.details[0].message;
        return res.render("ragistation", {
          error4: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "password") {
        var err1 = error.details[0].message;
        return res.render("ragistation", {
          error5: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "passwordone") {
        var err1 = error.details[0].message;
        return res.render("ragistation", {
          error6: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "gender") {
        var err1 = error.details[0].message;
        return res.render("ragistation", {
          error7: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "selectcountry") {
        var err1 = error.details[0].message;
        return res.render("ragistation", {
          error8: err1,
          values: req.body,
        });
      }

      if (error.details[0].context.key == "hoby") {
        var err1 = error.details[0].message;
        return res.render("ragistation", {
          error9: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "image") {
        var err1 = error.details[0].message;
        return res.render("ragistation", {
          error10: err1,
          values: req.body,
        });
      }
    } else {
      const result = await user.findOne({ email: req.body.email });
      if (result) {
        res.render("ragistation", {
          values: req.body,
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        console.log(req.body.password);
        const data = {
          surname: req.body.surname,
          name: req.body.name,
          number: req.body.number,
          email: req.body.email,
          password: req.body.password,
          gender: req.body.gender,
          selectcountry: req.body.selectcountry,
          hoby: req.body.hoby,
          image: req.file.filename,
        };
        console.log(data);
        const course = new user(data);
        course.save().then(() => {
          res.redirect("/");
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.forgetPassword = (req, res) => {
  res.render("forgetpassword", {
    values: req.body,
  });
};

exports.verifyEmail = async (req, res, next) => {
  try {
    let { error } = passwordValidate(req.body);
    console.log(error);
    if (error) {
      if (error.details[0].context.key == "email") {
        var err1 = error.details[0].message;
        return res.render("forgetPassword", {
          error1: err1,
        });
      }
    }
    logger.info(req.body.email);

    user.findOne({ email: req.body.email }, async (err, response) => {
      console.log(response);
      if (!response) {
        var err1 = "Please enter valid Email ";
        return res.render("forgetPassword", {
          error: err1,
        });
      } else {
        OTPsend(req.body.email, otp);
        const updateOTP = { otp: otp };
        user.updateOne(
          { email: req.body.email },
          updateOTP,
          async (err, response) => {
            logger.info(response);
          }
        );
        res.render("otp", {
          email: req.body.email,
        });
      }
    });
  } catch (err) {
    console.log(err);
    logger.error("err", err);
    next(new GeneralError("reset password failed"));
  }
};

exports.otp = (req, res) => {
  res.render("otp");
};

exports.verifyOtp = async (req, res, next) => {
  try {
    logger.info(req.body.otp);
    if (otp == req.body.otp) {
      res.redirect("/newPassword");
    } else {
      var err1 = "Please enter correst OTP";
      return res.render("otp", {
        email: req.body.email,
      });
    }
  } catch (err) {
    logger.error("err", err);
    next(new GeneralError("reset password failed"));
  }
};

exports.newpassword = (req, res) => {
  res.render("newpassword", {
    values: req.body,
  });
};
exports.updatePassword = async (req, res, next) => {
  try {
    let { error } = newPasswordValidate(req.body);
    if (error) {
      if (error.details[0].context.key == "password") {
        var err1 = error.details[0].message;
        return res.render("newPassword", {
          error1: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "confirm_password") {
        var err1 = error.details[0].message;
        return res.render("newPassword", {
          error2: err1,
          values: req.body,
        });
      }
    }

    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    const updatePassword1 = { password: encryptedPassword };
    user.updateOne({ otp: otp }, updatePassword1, async (err, response) => {
      logger.info(response);
      if (err) throw err;

      res.redirect("/");
    });
  } catch (err) {
    logger.error("err", err);
    next(new GeneralError("user registration failed"));
  }
};

///////

exports.user = async (req, res, next) => {
  console.log(req.body);
  try {
    let { error } = loginValidate(req.body);
    console.log(error);
    if (error) {
      if (error.details[0].context.key == "email") {
        var err1 = error.details[0].message;
        return res.render("login", {
          error1: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "password") {
        var err1 = error.details[0].message;
        return res.render("login", {
          error2: err1,
          values: req.body,
        });
      }
    }
    user.findOne({ email: req.body.email }, async (err, response) => {
      if (response === null) {
        var err1 = "User not found";
        return res.render("login", {
          error1: err1,
          values: req.body,
        });
      } else {
        console.log(error);
        const comparision = await bcrypt.compare(
          req.body.password,
          response.password
        );
        logger.info(comparision);
        if (comparision) {
          res.render("dashboard");
        } else {
          console.log(error);
          var err1 = "Email and password does not match";

          return res.render("login", {
            error2: err1,
            values: req.body,
          });
        }
      }
    });
  } catch (err) {
    console.log(error);
    logger.error("err", err);
    next(new GeneralError("user login failed"));
  }
};

////////

exports.dashboard = (req, res) => {
  console.log(error);
  res.render("dashboard", {});
};

///////

exports.viewprofile = async (req, res) => {
  const Email = req.user.email;
  console.log(Email);
  try {
    const users = await user.findOne({ email: Email });
    if (users) {
      res.render("viewprofile", {
        values: users,
      });
    }
  } catch (err) {
    console.log(error);
  }
};

///////

exports.updateprofile = async (req, res) => {
  const Email = req.user.email;
  console.log(Email);
  try {
    const users = await user.findOne({ email: Email });
    if (users) {
      res.render("updateprofile", {
        values: users,
      });
    }
  } catch (err) {
    console.log(error);
  }
};

////////////

exports.updateviewprofile = async (req, res) => {
  try {
    console.log(" 123 ", req.file);
    let { error } = updateviewprofiles(req.body);
    if (error) {
      console.log(error);
      if (error.details[0].context.key == "surname") {
        var err1 = error.details[0].message;
        return res.render("updateprofile", {
          error1: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "name") {
        var err1 = error.details[0].message;
        return res.render("updateprofile", {
          error2: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "number") {
        var err1 = error.details[0].message;
        return res.render("updateprofile", {
          error3: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "email") {
        var err1 = error.details[0].message;
        return res.render("updateprofile", {
          error4: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "gender") {
        var err1 = error.details[0].message;
        return res.render("updateprofile", {
          error5: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "selectcountry") {
        var err1 = error.details[0].message;
        return res.render("updateprofile", {
          error6: err1,
          values: req.body,
        });
      }

      if (error.details[0].context.key == "hoby") {
        var err1 = error.details[0].message;
        return res.render("updateprofile", {
          error7: err1,
          values: req.body,
        });
      }
    } else {
      console.log("hjg");
      const result = await user.findOne({ email: req.body.email });
      console.log(result);
      if (!result) {
        res.render("viewprofile", {
          values: req.body,
        });
      } else {
        const data = {
          surname: req.body.surname,
          name: req.body.name,
          number: req.body.number,
          email: req.body.email,
          gender: req.body.gender,
          selectcountry: req.body.selectcountry,
          hoby: req.body.hoby,
        };
        if (req.file) {
          data.image = req.file.originalname;
        }
        console.log(data);
        user.updateOne({ email: req.user.email }, data, (err, response) => {
          logger.info(response);
          if (err) throw err;
          res.redirect("/viewprofile");
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.resetpassword = (req, res) => {
  res.render("resetpassword", {
    values: req.body,
  });
};

exports.resetPassword = (req, res) => {
  res.render("resetPassword", {
    values: req.body,
  });
};

exports.resetPass = async (req, res, next) => {
  try {
    let { error } = resetpValidate(req.body);
    if (error) {
      console.log(error);
      if (error.details[0].context.key == "current_password") {
        var err1 = error.details[0].message;
        return res.render("resetPassword", {
          values: req.body,
          error1: err1,
        });
      }
      if (error.details[0].context.key == "password") {
        var err1 = error.details[0].message;
        return res.render("resetPassword", {
          values: req.body,
          error2: err1,
        });
      }
      if (error.details[0].context.key == "confirm_password") {
        var err1 = error.details[0].message;
        return res.render("resetPassword", {
          values: req.body,
          error3: err1,
        });
      }
    }
    const email = req.user.email;
    const user1 = await user.findOne({ email: email });
    if (user1) {
      const comparision = await bcrypt.compare(
        req.body.current_password,
        user1.password
      );
      if (comparision) {
        const encryptedPassword = await bcrypt.hash(req.body.password, salt);
        const updatePassword = { password: encryptedPassword };
        const updateuser = await user.updateOne(
          { email: email },
          updatePassword
        );
        if (updateuser) {
          return res.render("resetPassword", {
            error: "Your Password has been Reset",
            values: req.body,
          });
        } else {
          return res.render("resetPassword", {
            error: "Your Password has not been Reset",
            values: req.body,
          });
        }
      } else {
        return res.render("resetPassword", {
          error: "Current Password is incorrect",
          values: req.body,
        });
      }
    }
  } catch (err) {
    logger.error("err", err);
    return res.render("resetPassword", {
      error: "user registration failed",
    });
  }
};

/////////////////////////

///////////////////////////

exports.logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.clearCookie("id");
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
};
