const express = require("express");
const cors = require("cors");
const fs = require("fs");
const appport = 8001;
const app = express();
const bodyParser = require("body-parser");
const moment = require("moment");
const XLSX = require("xlsx");
const path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(appport, () => {
  console.log(`${appport} api port started`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.set("view engine", "pug");

app.get("/", function (req, res) {
  console.log(req.query);
});

app.post("/saveData", function (req, res) {
  console.log(req.body);
  res.end()
});

app.get("/getData", function (req, res) {
  res.sendFile("./data.json", { root: __dirname });
});
