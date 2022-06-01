const spdy = require("spdy");
const express = require("express");
const fs = require("fs");
const compression = require("compression");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const zlib = require ("zlib");
const app = express();
const path = require ("path");

app.use(compression());
app.use(express.static(path.join(__dirname,"public")));

app.get("/", function(req,res){
  res.send("pong");
});

app.get("/*", function(req,res){
  res.sendFile(path.join(__dirname, "public", "index.html"));
});



// app.get("/", async function (req, res) {
//   try {
//     res.writeHead(200);
//     res.end(await readFile("index.html"));
//   } catch (error) {
//     res.status(500).send(error.toString());
//   }
// });
spdy
  .createServer(
    {
      key: fs.readFileSync("./server.key"),
      cert: fs.readFileSync("./server.crt"),
    },
    app
  )
  .listen(8000, function (err) {
    if (err) {
      throw new Error(err);
    }
    console.log("Listening on port https://localhost:8000");
  });


