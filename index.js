// const spdy = require("spdy");
// const express = require("express");
// const fs = require("fs");
// const compression = require("compression");
// const { promisify } = require("util");
// const readFile = promisify(fs.readFile);
// const zlib = require ("zlib");
// const app = express();
// const path = require ("path");

// app.use(compression());
// app.use(express.static(path.join(__dirname,"public")));

// app.get("/", function(req,res){
//   res.send("pong");
// });

// app.get("/*", function(req,res){
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });



// app.get("/", async function (req, res) {
//   try {
//     res.writeHead(200);
//     res.end(await readFile("index.html"));
//   } catch (error) {
//     res.status(500).send(error.toString());
//   }
// });
// spdy
//   .createServer(
//     {
//       key: fs.readFileSync("./server.key"),
//       cert: fs.readFileSync("./server.crt"),
//     },
//     app
//   )
//   const port = process.env.PORT || 3000;
//   app.listen(8000, function (err) {
//     if (err) {
//       throw new Error(err);
//     }
//     console.log("Listening on port https://localhost:" +port);
//   });


const spdy = require("spdy");
const express = require("express");
const fs = require("fs");
const compression = require("compression");
const { promisify } = require("util");
const zlib = require('zlib');
const readFile = promisify(fs.readFile);
const app = express();
app.use(compression());
app.use(express.static("public"));
// app.get("/", async function (req, res) {
//     try {
//         if (res.push) {
//             [
//                 "/js/foo.js",
//                 "/js/bar.js",
//                 "/images/europe.jpg"
//             ].forEach(async function (file) {
//                 res.push(file, {}).end(await readFile(`public${file}`))
//             })
//         }
//         res.writeHead(200)
//         res.end(await readFile("index.html"))
//     } catch (error) {
//         res.status(500).send(error.toString())
//     }
// })
app.get("/", async function (req, res) {
  let index = res.end(await readFile("index.html"));
  try {
    res.writeHead(200, {'Content-Type': 'text/html', 'Content-Encoding': 'gzip'});
    res.end(await readFile("index.html"));
    zlib.gzip(index, function (_, result) {  // The callback will give you the 
      res.end(result); 
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
spdy
  .createServer(
    {
      key: fs.readFileSync("./server.key"),
      cert: fs.readFileSync("./server.crt"),
    },
    app
  )
  const port = process.env.PORT || 3000;
  app.listen(port, function (err) {
    if (err) {
      throw new Error(err);
    }
    console.log("Listening on port http://localhost:"+port);
  });





