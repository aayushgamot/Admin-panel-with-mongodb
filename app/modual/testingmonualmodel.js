const mongoose = require("mongoose");

const testimonualSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  number: {
    type: String,
  },
  date: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("testimonual", testimonualSchema);
