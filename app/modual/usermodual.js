const joi = require("joi");
const mongoose = require("mongoose");

const registationSchema = new mongoose.Schema({
  surname: {
    type: String,
  },
  name: {
    type: String,
  },
  number: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
  },
  selectcountry: {
    type: String,
  },
  hoby: {
    type: Array,
  },
  image: {
    type: String,
  },
});
module.exports = mongoose.model("user", registationSchema);
