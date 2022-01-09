const express = require("express");
const router = express();
const testimonialcontroller = require("../controlar/testimonialcontroller");
const { auth } = require("../middleware/course");
const { upload } = require("../services/multer");

router.get("/testing", testimonialcontroller.testing);

router.get("/addtesti", testimonialcontroller.addtesti);
router.post(
  "/testimonual",
  auth,
  upload.single("image"),
  testimonialcontroller.testimonual
);

router.get("/edittesti/:_id", testimonialcontroller.edittesti);
router.post(
  "/edit/:id",
  upload.single("image"),
  testimonialcontroller.updatetestimonual
);

router.get("/deletetesti/:id", testimonialcontroller.deletetesti);

router.get("/multipaldeletetesti", testimonialcontroller.multipleDelete);

module.exports = router;
