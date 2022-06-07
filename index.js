const express = require("express");
const app = express();
var session = require("express-session");
const route = require("./routes/index.route");
require("./db/connect");
require("dotenv").config();
const cors = require("cors");
const table = require("./model/index");
const socket = require("./socket.io/connect.socket");
var server = require("http").createServer(app);
const port = process.env.PORT || 1000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "somesecret",
    cookie: { maxAge: 600000 },
  })
);

route(app);
table.create().then(() => {
  console.log(`create table successfully !`);
});
socket.connect(server);
server.listen(port, function () {
  console.log(`listening on *:${port}`);
});
