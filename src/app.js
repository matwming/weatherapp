const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const { geocode, forecast } = require("./utils/geocode");
/**
|--------------------------------------------------
| defined paths for express config
|--------------------------------------------------
*/
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
/**
|--------------------------------------------------
| setup handlebar engine and views location
|--------------------------------------------------
*/
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

/**
|--------------------------------------------------
| set up static directory to serve
|--------------------------------------------------
*/
app.get("", (req, res) => {
 res.render("index", {
  title: "Weather",
  name: "ming wu"
 });
});
app.get("/help", (req, res) => {
 res.render("help", {
  message: "welcome to help page. We provide all kinds of help you need!",
  title: "help",
  name: "ming wu"
 });
});
app.get("/about", (req, res) => {
 res.render("about", {
  name: "ming wu",
  title: "about"
 });
});
app.get("/weather", (req, res) => {
 if (!req.query.address) {
  return res.send({
   error: "You must provide an address"
  });
 }

 geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
  if (error) {
   return res.send({
    error: error
   });
  }
  forecast(latitude, longitude, (error, forecastData) => {
   if (error) {
    return res.send({ error });
   }
   res.send({
    forecast: forecastData,
    location: location,
    address: req.query.address
   });
  });
 });
 //  res.send({
 //   forecast: "it is snowing",
 //   location: "melbourne",
 //   address: req.query.address
 //  });
});

app.get("/products", (req, res) => {
 if (!req.query.search) {
  return res.send({
   error: "You must provide a search term"
  });
 }
 console.log(req.query);
 res.send({
  products: []
 });
});
/**
|--------------------------------------------------
| match anything that is not matched before;
| catch 404
|--------------------------------------------------
*/
app.get("/help/*", (req, res) => {
 res.render("404", {
  title: "404",
  name: "ming wu",
  errorMessage: "help articles are not found"
 });
});
app.get("*", (req, res) => {
 res.render("404", {
  title: "404",
  name: "ming wu",
  errorMessage: "page not found"
 });
});
app.listen(3000, () => {
 `server is listening on 4000`;
});
