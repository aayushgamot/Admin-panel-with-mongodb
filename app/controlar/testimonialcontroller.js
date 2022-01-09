const testingmonualmodel = require("../modual/testingmonualmodel");
const {
  validationtestimonual,
} = require("../validation/testimonialvalidation");

exports.testing = async (req, res) => {
  const users = await testingmonualmodel.find();
  console.log(users);
  if (users) {
    res.render("testing", {
      values: users,
    });
  }
};

exports.addtesti = async (req, res) => {
  res.render("addtesti", {
    values: req.body,
  });
};

exports.testimonual = async (req, res) => {
  try {
    let { error } = validationtestimonual(req.body);
    if (error) {
      console.log("12", error);
      if (error.details[0].context.key == "name") {
        var err1 = error.details[0].message;
        return res.render("addtesti", {
          error1: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "email") {
        var err1 = error.details[0].message;
        return res.render("addtesti", {
          error2: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "address") {
        var err1 = error.details[0].message;
        return res.render("addtesti", {
          error3: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "number") {
        var err1 = error.details[0].message;
        return res.render("addtesti", {
          error4: err1,
          values: req.body,
        });
      }
      if (error.details[0].context.key == "date") {
        var err1 = error.details[0].message;
        return res.render("addtesti", {
          error5: err1,
          values: req.body,
        });
      }
    } else {
      const cou = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        number: req.body.number,
        date: req.body.date,
        image: req.file.filename,
      };
      console.log(cou);
      const data = new testingmonualmodel(cou);
      data.save().then(() => {
        res.redirect("/testing");
      });
    }
  } catch (ex) {
    console.log(ex);
  }
};

// exports.testimonual = async (req, res) => {
//   console.log(req.body, req.file);
//   try {
//     let { error } = validationtestimonual(req.body);
//     if (error) {
//       console.log(error);
//       if (error.details[0].context.key == "name") {
//         var err1 = error.details[0].message;
//         return res.render("addtesti", {
//           error1: err1,
//           values: req.body,
//         });
//       }
//       if (error.details[0].context.key == "email") {
//         var err1 = error.details[0].message;
//         return res.render("addtesti", {
//           error2: err1,
//           values: req.body,
//         });
//       }
//       if (error.details[0].context.key == "address") {
//         var err1 = error.details[0].message;
//         return res.render("addtesti", {
//           error3: err1,
//           values: req.body,
//         });
//       }
//       if (error.details[0].context.key == "date") {
//         var err1 = error.details[0].message;
//         return res.render("addtesti", {
//           error3: err1,
//           values: req.body,
//         });
//       }
//       if (error.details[0].context.key == "image") {
//         var err1 = error.details[0].message;
//         return res.render("addtesti", {
//           error4: err1,
//           values: req.body,
//         });
//       }
//     } else {
//       const cou = {
//         name: req.body.name,
//         email: req.body.email,
//         address: req.body.address,
//         number: req.body.number,
//         date: req.body.date,
//         image: req.file.filename,
//       };
//       const data = new testingmonualmodel(cou);
//       data.save().then(() => {
//         res.redirect("/testing");
//       });
//     }
//   } catch (ex) {
//     console.log(ex);
//   }
// };

exports.edittesti = async (req, res) => {
  const user = await testingmonualmodel.findById(req.params._id);
  console.log(user);
  if (user) {
    res.render("edittesti", {
      values: user,
    });
  }
};

exports.updatetestimonual = async (req, res) => {
  try {
    await testingmonualmodel.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      number: req.body.number,
      date: req.body.date,
      image: req.file.filename,
    });
    res.redirect("/testing");
  } catch (error) {
    console.error(error);
  }
};

exports.deletetesti = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    const val = await testingmonualmodel.findByIdAndRemove({ _id: id });
    console.log(val);
    res.redirect("/testing");
  } catch (error) {
    console.error(error);
  }
};

exports.multipleDelete = (req, res) => {
  try {
    const id = req.query;
    const count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {
      testingmonualmodel.findByIdAndDelete(Object.keys(id)[i], function (err) {
        if (err) console.error(err);
      });
    }
    res.redirect("/testing");
  } catch (error) {
    console.error(error);
  }
};
