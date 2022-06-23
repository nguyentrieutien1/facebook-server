const express = require("express");
const app = express();
var session = require("express-session");
const route = require("./routes/index.route");
require("./db/connect");
require("dotenv").config();
const cors = require("cors");
const table = require("./model/index");
const socket = require("./socket.io/connect.socket");
const path = require("path");
var session = require("express-session");
app.use("/", express.static(__dirname + "/"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
var server = require("http").createServer(app);
const port = process.env.PORT || 1000;
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
route(app);
table.create().then(() => {
  console.log(`create table successfully !`);
});
socket.connect(server);
server.listen(port, function () {
  console.log(`listening on *:${port}`);
});
