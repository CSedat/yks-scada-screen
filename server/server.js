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

var nodes7 = require('nodes7'); // This is the package name, if the repository is cloned you may need to require 'nodeS7' with uppercase S
var conn = new nodes7;
var doneReading = false;
var doneWriting = true;

var variables = {
    Bits: 'DB200,X0.0.21',  // Array of 8 bits in a data block
    Ints: 'DB200,INT4.5',  // Array of 8 bits in a data block
};

conn.initiateConnection({ port: 102, 
    host: '192.168.1.21', 
    rack: 0, 
    slot: 1, 
    debug: true 
}, connected);

var readplcdata = {};
let writeplcdata = {};

app.post("/writePLCData", function (req, res) {
    writeplcdata = req.body;
    console.log(doneWriting)
    if (doneWriting) {
        console.log('Sex')
        conn.writeItems('Bits', [
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
    res.send("ok");
    res.end();
    // console.log(writeplcdata)
});

app.get('/getPLCData', function (req, res) {
    conn.readAllItems(valuesReady);
    res.send(readplcdata);
});

function connected(err) {
    if (typeof(err) !== "undefined") {
      console.log(err);
    //   process.exit();
    }
    conn.setTranslationCB(function(tag) { return variables[tag]; }); // This sets the "translation" to allow us to work with object names
    conn.addItems(['Bits', 'Ints']);
    conn.readAllItems(valuesReady);
}

function valuesReady(anythingBad, values) {
    if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
    // console.log(values);
    readplcdata = {
        bools: {
            bk1: values.Bits[0],
            bk2: values.Bits[1],
            bk3: values.Bits[2],
            bk4: values.Bits[3],
            bell1: values.Bits[4],
            bell2: values.Bits[5],
            bell3: values.Bits[6],
            bell4: values.Bits[7],
            spare1: values.Bits[8],
            spare2: values.Bits[9],
            spare3: values.Bits[10],
            spare4: values.Bits[11],
            spare5: values.Bits[12],
            spare6: values.Bits[13],
            spare7: values.Bits[14],
            spare8: values.Bits[15],
            spare9: values.Bits[16],
            spare10: values.Bits[17],
            spare11: values.Bits[18],
            spare12: values.Bits[19],
        },
        Ints: {
            araurunseviye: values.Ints[0],
            tozseviye: values.Ints[1],
            findikseviye: values.Ints[2],
            cevizseviye: values.Ints[3],
            int5: values.Ints[4],
        }

    };
    doneReading = true;
    // if (doneWriting) { conn.readAllItems(valuesReady); }
}

function valuesWritten(anythingBad) {
  if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
  console.log("Done writing.");
  doneWriting = true;
}


