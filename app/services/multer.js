const multer = require("multer");
const path = require("path");

const fileStoregeEngine = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "app/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: fileStoregeEngine });
module.exports = {
  upload,
};
