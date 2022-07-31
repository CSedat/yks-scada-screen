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
  var data = fs.readFileSync(`./data/${req.body.urun}.json`);
  var json = JSON.parse(data);
  json.unshift(req.body);
  fs.writeFileSync(`./data/${req.body.urun}.json`, JSON.stringify(json));
  res.send("ok");
  res.end();
});

app.post("/deleteData", function (req, res) {
  console.log(req.body);
  var data = fs.readFileSync(`./data/${req.body.urun}.json`);
  var json = JSON.parse(data);

  for (let i = 0; i < json.length; i++) {
    const element = json[i];
    if (element.id == req.body.id) {
      json.splice(i, 1);
    }
  }
  fs.writeFileSync(`./data/${req.body.urun}.json`, JSON.stringify(json));
  res.send("ok");
  res.end();
});

app.get("/getceviz", function (req, res) {
  res.sendFile("./data/ceviz.json", { root: __dirname });
});
app.get("/getfindik", function (req, res) {
  res.sendFile("./data/findik.json", { root: __dirname });
});
app.get("/gettoz", function (req, res) {
  res.sendFile("./data/toz.json", { root: __dirname });
});
app.get("/getaraurun", function (req, res) {
  res.sendFile("./data/araurun.json", { root: __dirname });
});
