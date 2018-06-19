#!/usr/bin/env node

const express = require("express"),
  app = express(),
  MongoClient = require("mongodb").MongoClient,
  bodyParser = require("body-parser"),
  db = require(__dirname + "/config/db"),
  port = 80;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  db.url,
  (err, client) => {
    if (err) return console.log(err);
    require(__dirname + "/app/routes")(app, client.db("chatlify"));

    app.listen(port, () => {
      console.log("We are live on " + port);
    });
  }
);
