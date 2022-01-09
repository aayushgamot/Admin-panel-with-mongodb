const portfoliomodel = require("../modual/portfoliomodel");
const categorymodel = require("../modual/catrgorymodual");
const { portfoliovalidation } = require("../validation/portfoliovalidation");
const { loggers } = require("winston");

exports.port = async (req, res) => {
  const users = await portfoliomodel.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "name",
        foreignField: "projectcategory",
        as: "admin",
      },
    },
  ]);
  console.log(users);
  if (users) {
    res.render("portfolio", {
      values: users,
    });
  }
};

exports.addport = async (req, res) => {
  try {
    const user = await categorymodel.find();
    console.log(user);
    const port = await portfoliomodel.find();
    if (user) {
      res.render("addport", {
        value: user,
        values: port,
      });
    }
  } catch (err) {
    loggers.error("err", err);
  }
};

exports.addport12 = async (req, res) => {
  try {
    let { error } = portfoliovalidation(req.body);
    if (error) {
      console.log("12", error);
      if (error.details[0].context.key == "projectcategory") {
        var err1 = error.details[0].message;
        return res.render("addport", {
          error1: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "projectname") {
        var err1 = error.details[0].message;
        return res.render("addport", {
          error2: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "projecttitle") {
        var err1 = error.details[0].message;
        return res.render("addport", {
          error3: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "projecturl") {
        var err1 = error.details[0].message;
        return res.render("addport", {
          error4: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "projectdate") {
        var err1 = error.details[0].message;
        return res.render("addport", {
          error5: err1,
          values: req.body,
        });
      }
    } else {
      const moreimg = req.files.map((multipleimg) => multipleimg.filename);

      const coue = {
        projectcategory: req.body.projectcategory,
        projectname: req.body.projectname,
        projecttitle: req.body.projecttitle,
        projecturl: req.body.projecturl,
        projectdate: req.body.projectdate,
        projectimage: moreimg,
      };
      console.log(coue);
      const data = new portfoliomodel(coue);
      data.save().then(() => {
        res.redirect("/port");
      });
    }
  } catch (ex) {
    console.log(ex);
  }
};

exports.editport = async (req, res) => {
  try {
    const user = await categorymodel.find();
    console.log(user);
    const port = await portfoliomodel.findById(req.params.id);
    if (port && user) {
      res.render("editport", {
        value: user,
        values: port,
      });
    }
  } catch (err) {
    loggers.error("err", err);
  }
};

exports.updateport = async (req, res) => {
  try {
    const moreimg = req.files.map((multipleimg) => multipleimg.filename);
    await portfoliomodel.findByIdAndUpdate(req.params.id, {
      projectcategory: req.body.projectcategory,
      projectname: req.body.projectname,
      projecttitle: req.body.projecttitle,
      projecturl: req.body.projecturl,
      projectdate: req.body.projectdate,
      projectimage: moreimg,
    });
    res.redirect("/port");
  } catch (error) {
    console.error(error);
  }
};

exports.delete = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    const val = await portfoliomodel.findByIdAndRemove({ _id: id });
    console.log(val);
    res.redirect("/port");
  } catch (error) {
    console.error(error);
  }
};

exports.Delete12 = (req, res) => {
  try {
    const id = req.query;
    const count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {
      portfoliomodel.findByIdAndDelete(Object.keys(id)[i], function (err) {
        if (err) console.error(err);
      });
    }
    res.redirect("/port");
  } catch (error) {
    console.error(error);
  }
};
