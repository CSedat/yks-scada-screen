var http = require('http');
var stati = require('node-static');
var fileServer = new stati.Server('./client');
var port = process.env.PORT || 8500;
http.createServer(function (req, res) {
    fileServer.serve(req, res);
    if (req.url !== "/") {
        // console.log('Page redirected to /');
        // res.writeHead(302, {
        //     location: "http://10.35.13.108:8000",
        // });
        // res.end();
    }
}).listen(port);
console.log(`Http server running at http://10.35.13.108:${port}/`);

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const appport = 8501;
const app = express();
const bodyParser = require("body-parser");
const moment = require("moment");
const XLSX = require("xlsx");
const path = require("path");
let PLCconnected = false;

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
    let ips = (
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress || ''
    ).split(',');
    console.log(ips[0].trim().split(':').pop());
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

var nodes7 = require('nodes7');
var conn = new nodes7;
var doneReading = false;
var doneWriting = true;

var variables = {
    Bits: 'DB200,X8.0.40',
    OnlyReadInts: 'DB200,INT0.4',
    WriteInts: 'DB200,INT14.4',
    Status: 'DB200,INT22.31',
    Alarms: 'DB200,X84.0.31',
    Local_Mode: 'DB200,X88.0.3',
    Driver_Speeds: 'DB200,INT90.4',
};

conn.initiateConnection({ port: 102, 
    host: '10.35.17.15', 
    rack: 0, 
    slot: 1, 
    debug: true 
}, connected);

var readplcdata = {};
let writeplcdata = {};

app.post("/writePLCData", function (req, res) {
    writeplcdata = req.body;
    if (doneWriting) {
        conn.writeItems('Bits', [
            writeplcdata.bools.bk1,
            writeplcdata.bools.bk1autostrt,
            writeplcdata.bools.bk1autostp ,
            writeplcdata.bools.bk1manbantstrt,
            writeplcdata.bools.bk1manbantstp ,
            writeplcdata.bools.bk1manklpopen ,
            writeplcdata.bools.bk1manklpclose,

            writeplcdata.bools.bk2 ,
            writeplcdata.bools.bk2autostrt ,
            writeplcdata.bools.bk2autostp ,
            writeplcdata.bools.bk2manbantstrt,
            writeplcdata.bools.bk2manbantstp ,
            writeplcdata.bools.bk2manklpopen ,
            writeplcdata.bools.bk2manklpclose,

            writeplcdata.bools.bk3,
            writeplcdata.bools.bk3autostrt,
            writeplcdata.bools.bk3autostp,
            writeplcdata.bools.bk3manbantstrt,
            writeplcdata.bools.bk3manbantstp,
            writeplcdata.bools.bk3manklpopen,
            writeplcdata.bools.bk3manklpclose,

            writeplcdata.bools.bk4,
            writeplcdata.bools.bk4autostrt,
            writeplcdata.bools.bk4autostp,
            writeplcdata.bools.bk4manbantstrt,
            writeplcdata.bools.bk4manbantstp,
            writeplcdata.bools.bk4manklpopen,
            writeplcdata.bools.bk4manklpclose,

            writeplcdata.bools.d709,
            writeplcdata.bools.d709start,
            writeplcdata.bools.d709stop,

            writeplcdata.bools.bell1,
            writeplcdata.bools.bell2,
            writeplcdata.bools.bell3,
            writeplcdata.bools.bell4,
            writeplcdata.bools.faultreset,
        ], valuesWritten);
    }
    res.send("ok");
    res.end();
});

app.post("/writePLCDataInts", function (req, res) {
    writeplcdata = req.body;
    if (doneWriting) {
        conn.writeItems('WriteInts', [
            writeplcdata.ints.bk1hertz,
            writeplcdata.ints.bk2hertz,
            writeplcdata.ints.bk3hertz,
            writeplcdata.ints.bk4hertz,
        ], valuesWritten);
    }
        
    res.send("ok");
    res.end();
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
    conn.addItems(['Bits', 'OnlyReadInts', 'WriteInts', 'Status', 'Alarms', 'Local_Mode', 'Driver_Speeds']);
    conn.readAllItems(valuesReady);
}

function valuesReady(err, values) {
    if (err) { console.log("PLC Bağlantısı kopuk yada değerler yanlış!!!!"); PLCconnected = false;}else{PLCconnected = true;}
    readplcdata = {
        bools: {
            bk1: values.Bits[0],
            bk1autostrt: values.Bits[1],
            bk1autostp : values.Bits[2],
            bk1manbantstrt: values.Bits[3],
            bk1manbantstp : values.Bits[4],
            bk1manklpopen : values.Bits[5],
            bk1manklpclose: values.Bits[6],
            bk2 : values.Bits[7],
            bk2autostrt : values.Bits[8],
            bk2autostp : values.Bits[9],
            bk2manbantstrt: values.Bits[10],
            bk2manbantstp : values.Bits[11],
            bk2manklpopen : values.Bits[12],
            bk2manklpclose: values.Bits[13],
            bk3: values.Bits[14],
            bk3autostrt: values.Bits[15],
            bk3autostp: values.Bits[16],
            bk3manbantstrt: values.Bits[17],
            bk3manbantstp: values.Bits[18],
            bk3manklpopen: values.Bits[19],
            bk3manklpclose: values.Bits[20],
            bk4: values.Bits[21],
            bk4autostrt: values.Bits[22],
            bk4autostp: values.Bits[23],
            bk4manbantstrt: values.Bits[24],
            bk4manbantstp: values.Bits[25],
            bk4manklpopen: values.Bits[26],
            bk4manklpclose: values.Bits[27],
            bell1: values.Bits[28],
            bell2: values.Bits[29],
            bell3: values.Bits[30],
            bell4: values.Bits[31],
            faultreset: values.Bits[32],
        },
        Ints: {
            araurunseviye: values.OnlyReadInts[0],
            tozseviye: values.OnlyReadInts[1],
            findikseviye: values.OnlyReadInts[2],
            cevizseviye: values.OnlyReadInts[3],
            Bk1Hertz: values.WriteInts[0],
            Bk2Hertz: values.WriteInts[1],
            Bk3Hertz: values.WriteInts[2],
            Bk4Hertz: values.WriteInts[3],
        },
        
        Connected: PLCconnected,
        Status: values.Status,
        Alarms: values.Alarms,
        Local_Mode: values.Local_Mode,
        Driver_Speeds: values.Driver_Speeds,
    };
    doneReading = true;
    // if (doneWriting) { conn.readAllItems(valuesReady); }
}

function valuesWritten(err) {
  if (err) { console.log("PLC Bağlantısı kopuk yada değerler yanlış!!!!"); }
  console.log("Yazıldı.");
  doneWriting = true;
}


