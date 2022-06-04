const { SerialPort } = require("serialport");
const express = require("express");
const app = express();

app.use(express.json({ limit: "50mb" }));

let serial = undefined;

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

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if ((i < 3) | (i > 6) | ((j < 3) | (j > 6)))
        resp.holes.push({ x: i * 2.5, y: j * 2.5, d: 0.8 });
    }
  }

  res.status(200);
  res.send(resp);
});

//API job----------------------------------------------------------------------------------------

app.post("/api/job/upload", (req, res) => {
  console.log(req.body);

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
