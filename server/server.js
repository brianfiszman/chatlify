#!/usr/bin/env node

const express = require("express"),
  app = express(),
  MongoClient = require("mongodb").MongoClient,
  bodyParser = require("body-parser"),
  db = require(__dirname + "/config/db");

app.set('port', (process.env.PORT || 5000));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  db.url,
  (err, client) => {
    if (err) return console.log(err);
    require(__dirname + "/app/routes")(app, client.db("chatlify"));

    app.listen(app.get('port'), () => {
      console.log("We are live on ", app.get('port'));
    });
  }
);
