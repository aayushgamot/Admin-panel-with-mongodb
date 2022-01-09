const express = require("express");
const router = express();
const contactuscontroller = require("../controlar/contactuscontroller");
const { auth } = require("../middleware/course");

router.get("/contactusview", auth, contactuscontroller.contactusview);

router.get("/contactus", auth, contactuscontroller.contactus);

router.post("/api/dataadd", auth, contactuscontroller.dataadd);

router.get("/editcontactus/:id", auth, contactuscontroller.editcontactus);
router.post("/api/contactus/update/:id", auth, contactuscontroller.editData);

router.get("/deleteContact/:id", contactuscontroller.delete);

router.get("/multipaldelete44", contactuscontroller.Delete22);

module.exports = router;
