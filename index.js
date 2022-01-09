const express = require("express");
const app = express();
const route = require("./app/route/routes");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const path = require("path");
const routes = require("../admin/app/route/categoryroutes");
const contactUsroutes = require("../admin/app/route/contactusroute");
const testimonialroutes = require("../admin/app/route/testimonialroutes");
const portfolioroutes = require("../admin/app/route/portfolioroutes");

const cookie = require("cookie-parser");

app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookie());
app.use("/", route);
app.use("/", routes);
app.use("/", contactUsroutes);
app.use("/", testimonialroutes);
app.use("/", portfolioroutes);

app.use(express.static("app/images"));
mongoose
  .connect("mongodb://localhost/project")
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.log("could not connect to mongodb...", err));

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}...`));
