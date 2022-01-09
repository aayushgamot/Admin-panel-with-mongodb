const { application } = require("express");
const express = require("express");
const route = express();
const multer = require("multer");
const categorycontrolar = require("../controlar/categorycontroller");
const { auth, generateToken } = require("../middleware/course");

const fileStoregeEngine = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "app/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

route.get("/category", categorycontrolar.data);

route.get("/categoryview", categorycontrolar.addcontrolar);
route.post("/categoryadd", categorycontrolar.category);

route.get("/editcategoryview/:id", categorycontrolar.editcategory);
route.post("/updateCategory/:id", categorycontrolar.updateCategory);

route.get("/deleteCategory/:id", categorycontrolar.delete);

route.get("/multipaldelete4", categorycontrolar.Delete23);

module.exports = route;
