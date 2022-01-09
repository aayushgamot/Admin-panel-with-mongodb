const mongoose = require("mongoose");

const contactusSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  massage: {
    type: String,
  },
  number: {
    type: String,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model("contactus", contactusSchema);
