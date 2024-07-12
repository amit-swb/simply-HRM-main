const http = require("http");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const routes = require("./routes/app");
const app = express();
const cors = require("cors");
const corsConfig = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}
app.options("", cors(corsConfig));
const { log } = require("console");
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors(corsConfig));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const MONGO_URL = "mongodb+srv://fonil58878:d3vWj5PLMoFikOir@democrud.dsghyn1.mongodb.net/";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const con = mongoose.connection;

con.on("open", () => {
  console.log("mongo connected...");
});

app.get("/", (req, res) => {
  res.send("app working");
});

app.use("/api", routes);

const PORT = 8080;
// console.log(PORT)

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Server Up And Working on port " + PORT);
});
