const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  projectcategory: {
    type: String,
  },
  projectname: {
    type: String,
  },
  projecttitle: {
    type: String,
  },
  projecturl: {
    type: String,
  },
  projectdate: {
    type: String,
  },
  projectimage: {
    type: Array,
  },
});

module.exports = mongoose.model("portfolio", portfolioSchema);
