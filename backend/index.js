const { SerialPort } = require("serialport");
const express = require("express");
const app = express();

app.use(express.json({ limit: "50mb" }));

let serial = undefined;
let currentJob = {};

//API Serial---------------------------------------------------------------------------------
app.all("/api/serial/list", (req, res) => {
  console.log("list ports...");
  SerialPort.list().then((e) => {
    console.log("listed...");
    res.status(200);
    res.send(e);
  });

  /*res.status(200);
  res.send({ a: 10, b: 20 });*/
});

app.all("/api/serial/get", (req, res) => {
  SerialPort.list().then((e) => {
    res.status(200);
    res.send(e);
  });
});

app.all("/api/serial/connect", (req, res) => {
  serial = new SerialPort({ path: req.body.path, baudRate: 250000 });
  res.status(200);
  res.send("connected");
});

//API preview---------------------------------------------------------------------------------

app.all("/api/preview/get", (req, res) => {
  let resp = {};
  resp.holes = [];

  /*for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if ((i < 3) | (i > 6) | ((j < 3) | (j > 6)))
        resp.holes.push({ x: i * 2.5, y: j * 2.5, d: 0.8 });
    }
  }*/

  resp = currentJob;

  res.status(200);
  res.send(resp);
});

//API job----------------------------------------------------------------------------------------

app.post("/api/job/upload", (req, res) => {
  let drlData = req.body.drl;
  let svgData = req.body.svg;

  //process drill data
  let drlDataRows = drlData.split("\r\n");
  let drillBits = [];
  let toolNumber = 0;
  let holes = [];
  drlDataRows.forEach((element) => {
    if (element.charAt(0) === ";") return;
    if (element.charAt(0) === "%") return;
    if (element.charAt(0) === "M") return;
    if (element.charAt(0) === "G") return;
    if (element.charAt(0) === "T") {
      toolNumber = Number(element.charAt(1));
      if (element.charAt(2) === "C")
        drillBits[toolNumber - 1] = Number(element.substring(3));
      return;
    }
    if (element.charAt(0) === "X") {
      let cord = element.substring(1).split("Y");
      holes.push({ x: Number(cord[0]), y: -Number(cord[1]), d: drillBits[toolNumber - 1] });
      return;
    }
    console.log(element);
  });
  console.log(drillBits);
  console.log(holes);

  currentJob.holes = holes;

  res.status(200);
  res.send("ok");
});

app.all("/api/*", (req, res) => {
  res.status(404);
  res.send("Invalid api route");
});

app.get("/*", (req, res) => {
  res.send("Fallback page");
});

app.listen(3080, () => console.log("Listening on port " + 3080 + "..."));
