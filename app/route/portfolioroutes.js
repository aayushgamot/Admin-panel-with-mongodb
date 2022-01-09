const express = require("express");
const router = express();
const portfoliocontroller = require("../controlar/portfoliocontroller");
const { auth } = require("../middleware/course");
const { upload } = require("../services/multer");

router.get("/port", portfoliocontroller.port);

router.get("/addport", portfoliocontroller.addport);
router.post(
  "/addport12",
  auth,
  upload.array("projectimage"),
  portfoliocontroller.addport12
);

router.get("/editport/:id", portfoliocontroller.editport);

router.post(
  "/updateport/:id",
  upload.array("projectimage"),
  portfoliocontroller.updateport
);

router.get("/deleteport/:id", portfoliocontroller.delete);

router.get("/multipaldelete123", portfoliocontroller.Delete12);

module.exports = router;
