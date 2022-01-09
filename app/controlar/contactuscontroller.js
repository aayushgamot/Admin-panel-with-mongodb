const contactusmodel = require("../modual/contactusmodel");
const {
  validationcontactus,
  // validation12,
} = require("../validation/contactusvalidation");

// exports.editcontactus = async (req, res) => {
//   console.log(req.params.id);
//   const user = await contactusmodel.findById(req.params.id);
//   console.log(user);
//   if (user) {
//     res.render("editcontactus", {
//       values: user,
//     });
//   }
// };

// exports.editData = async (req, res) => {
//   console.log(req.body);
//   try {
//     let { error } = validationcat12(req.body);
//     console.log(error);
//     if (error) {
//       if (error.details[0].context.key == "name") {
//         var err1 = error.details[0].message;
//         return res.render("editcontactus", {
//           error1: err1,
//           values: req.body,
//         });
//       }
//       if (error.details[0].context.key == "email") {
//         var err1 = error.details[0].message;
//         return res.render("editcontactus", {
//           error2: err1,
//           values: req.body,
//         });
//       }
//       if (error.details[0].context.key == "massage") {
//         var err1 = error.details[0].message;
//         return res.render("editcontactus", {
//           error3: err1,
//           values: req.body,
//         });
//       }
//       if (error.details[0].context.key == "phonenumber") {
//         var err1 = error.details[0].message;
//         return res.render("editcontactus", {
//           error4: err1,
//           values: req.body,
//         });
//       }
//       if (error.details[0].context.key == "date") {
//         var err1 = error.details[0].message;
//         return res.render("editcontactus", {
//           error5: err1,
//           values: req.body,
//         });
//       }
//     } else {
//       const result = await contactusmodel.findByIdAndUpdate(req.params.id, {
//         name: req.body.name,
//         email: req.body.email,
//         massage: req.body.massage,
//         phonenumber: req.body.phonenumber,
//         date: req.body.date,
//       });
//       if (result) {
//         res.redirect("/contactus");
//       }
//     }
//   } catch (ex) {
//     console.log(ex);
//   }
// };

// exports.deleteData = async (req, res) => {
//   console.log(req.body);

//   const result = await contactusmodel.findByIdAndDelete(req.params.id);
//   if (result) {
//     res.redirect("/contactus");
//   }
// };

exports.contactusview = async (req, res) => {
  const users = await contactusmodel.find();
  if (users) {
    res.render("contactusview", {
      values: users,
    });
  }
};
exports.contactus = (req, res) => {
  res.render("contactus", {
    values: req.body,
  });
};

exports.dataadd = async (req, res) => {
  try {
    let { error } = validationcontactus(req.body);
    if (error) {
      console.log(error);
      if (error.details[0].context.key == "name") {
        var err1 = error.details[0].message;
        return res.render("contactus", {
          error1: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "email") {
        var err1 = error.details[0].message;
        return res.render("contactus", {
          error2: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "massage") {
        var err1 = error.details[0].message;
        return res.render("contactus", {
          error3: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "number") {
        var err1 = error.details[0].message;
        return res.render("contactus", {
          error4: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "date") {
        var err1 = error.details[0].message;
        return res.render("contactus", {
          error5: err1,
          values: req.body,
        });
      }
    } else {
      console.log("23");
      const cou = {
        name: req.body.name,
        email: req.body.email,
        massage: req.body.massage,
        number: req.body.number,
        date: req.body.date,
      };
      console.log(cou);
      const data = new contactusmodel(cou);
      data.save().then(() => {
        res.redirect("/contactusview");
      });
    }
  } catch (ex) {
    console.log(ex);
  }
};

exports.editcontactus = async (req, res) => {
  console.log(req.params.id);
  const user = await contactusmodel.findById(req.params.id);
  console.log(user);
  if (user) {
    res.render("editdata", {
      values: user,
    });
  }
};

exports.editData = async (req, res) => {
  try {
    console.log(req.body);
    let _id = req.params.id;
    await contactusmodel.findByIdAndUpdate(_id, {
      name: req.body.name,
      email: req.body.email,
      massage: req.body.massage,
      number: req.body.number,
      date: req.body.date,
    });
    res.redirect("/contactusview");
  } catch (error) {
    console.error(error);
  }
};

exports.delete = async (req, res) => {
  try {
    console.log("delete");
    let id = req.params.id;
    console.log(id);
    const val = await contactusmodel.findByIdAndRemove({ _id: id });
    console.log(val);
    res.redirect("/contactusview");
  } catch (error) {
    console.error(error);
  }
};

exports.Delete22 = (req, res) => {
  try {
    const id = req.query;
    const count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {
      contactusmodel.findByIdAndDelete(Object.keys(id)[i], function (err) {
        if (err) console.error(err);
      });
    }
    res.redirect("/contactusview");
  } catch (error) {
    console.error(error);
  }
};
