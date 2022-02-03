#!/usr/bin/env node
import { MongoClient } from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import db from "./config/db";
const io = require("socket.io")();

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const client = new MongoClient(db.url, { useNewUrlParser: true, useUnifiedTopology: true });
  
client.connect((err) => {
  if (err) return console.log(err);
  require(__dirname + "/app/routes")(app, io, client.db("chatlify"));

  const server = app.listen(app.get("port"), () => {
    console.log("We are live on ", app.get("port"));
  });

  io.attach(server);

  io.on("connection", () => {
    console.log("HELLO");
  });
}
);
