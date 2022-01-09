const user = require("../modual/catrgorymodual");
const { addcontrolar } = require("../validation/categoryvalidation");

exports.data = async (req, res) => {
  const category = await user.find();
  res.render("category", {
    values: category,
  });
};

// exports.adduser = async (req, res) => {
//   try {
//     const users = await this.user.find();
//     if (users) {
//       res.render("category", {
//         values: users,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

//////////////////////////

exports.addcontrolar = (req, res) => {
  res.render("addcontrolar", {
    values: req.body,
  });
};

//////////

/////////////////

exports.category = (req, res) => {
  console.log("1", req.body);
  try {
    let { error } = addcontrolar(req.body);
    console.log(error);
    if (error) {
      if (error.details[0].context.key == "name") {
        var err1 = error.details[0].message;
        return res.render("addcontrolar", {
          error1: err1,
          values: req.body,
        });
      }
    } else {
      const data = {
        name: req.body.name,
      };
      console.log(data);
      const course = new user(data);
      course.save().then(() => {
        res.redirect("/category");
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    let _id = req.params.id;
    await user.findByIdAndUpdate(_id, {
      name: req.body.name,
    });
    res.redirect("/category");
  } catch (error) {
    console.error(error);
  }
};
exports.deletecategory = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    await user.findByIdAndRemove({ _id: id });
    res.redirect("/category");
  } catch (error) {
    console.error(error);
  }
};

exports.editcategory = async (req, res) => {
  let id = req.params.id;
  const values = await user.findById({ _id: id });
  res.render("editcategory", {
    values: values,
  });
};

exports.delete = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    const val = await user.findByIdAndRemove({ _id: id });
    console.log(val);
    res.redirect("/category");
  } catch (error) {
    console.error(error);
  }
};

exports.Delete23 = (req, res) => {
  try {
    const id = req.query;
    const count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {
      user.findByIdAndDelete(Object.keys(id)[i], function (err) {
        if (err) console.error(err);
      });
    }
    res.redirect("/category");
  } catch (error) {
    console.error(error);
  }
};
