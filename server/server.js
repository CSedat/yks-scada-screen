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


var readplcdata = [];
var writeplcdata = {
    bools: {
        bk1: false,
        bk2: false,
        bk3: false,
        bk4: false,
        bell1: false,
        bell2: false,
        bell3: false,
        bell4: false,
        spare1: false,
        spare2: false,
        spare3: false,
        spare4: false,
        spare5: false,
        spare6: false,
        spare7: false,
        spare8: false,
        spare9: false,
        spare10: false,
        spare11: false,
        spare12: false,
    },
    ints:{

    }
};

var nodes7 = require('nodes7');
var conn = new nodes7;
var doneReading = false;
var doneWriting = false;

app.post("/writePLCData", function (req, res) {
    writeplcdata = req.body;
    res.send("ok");
    res.end();
    // console.log(writeplcdata)
});

var variables = {
    Array1: 'DB6,X0.0.20',
};

conn.initiateConnection({
    port: 102,
    host: '192.168.30.15',
    rack: 0,
    slot: 1,
    timeout: 30000,
    debug: true
}, connected);


function connected(err) {
    if (typeof (err) !== "undefined") {
        console.log(err);
    }
    conn.setTranslationCB(function (tag) {
        return variables[tag];
    });
    conn.addItems(['Array1']);
    conn.readAllItems(valuesReady);
    conn.writeItems(['Array1'], [
        writeplcdata.bools.bk1,
        writeplcdata.bools.bk2,
        writeplcdata.bools.bk3,
        writeplcdata.bools.bk4,
        writeplcdata.bools.bell1,
        writeplcdata.bools.bell2,
        writeplcdata.bools.bell3,
        writeplcdata.bools.bell4,
        writeplcdata.bools.spare1,
        writeplcdata.bools.spare2,
        writeplcdata.bools.spare3,
        writeplcdata.bools.spare4,
        writeplcdata.bools.spare5,
        writeplcdata.bools.spare6,
        writeplcdata.bools.spare7,
        writeplcdata.bools.spare8,
        writeplcdata.bools.spare9,
        writeplcdata.bools.spare10,
        writeplcdata.bools.spare11,
        writeplcdata.bools.spare12,
    ], valuesWritten);
}



function valuesReady(err, values) {
    if (err) { console.log("OKUNAN DEĞERLERDE HATA VAR"); }
    conn.readAllItems(valuesReady);
    readplcdata.array = values.Array1;
    // console.log(readplcdata.array);
}

function valuesWritten(err) {
    if (err) { console.log("YAZILAN DEĞERLERDE HATA VAR"); }
    console.log("Yazıldı.");
}
app.get('/api/getPLCData', function (req, res) {
    res.send(plcdata);
});
